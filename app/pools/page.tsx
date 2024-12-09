"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Trophy } from 'lucide-react'
import QRCode from 'react-qr-code';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Footer } from "@/components/footer"
import { execHaloCmdWeb, HaloGateway } from '@arx-research/libhalo/api/web'
import { isMobile } from 'react-device-detect';
import { Slider } from "@/components/ui/slider";
import { Interface } from '@ethersproject/abi';
import { serialize } from "@ethersproject/transactions";
import { keccak256 } from "@ethersproject/keccak256";
import { hexlify } from "@ethersproject/bytes";
import { useAtom } from 'jotai';
import { walletAddressAtom } from '@/lib/atoms';
import { createPublicClient, http } from 'viem';


async function getTransaction(address: `0x${string}`, eventName: string, amount: number) {
    // Network Name: Fhenix Nitrogen
    // New RPC URL: https://api.nitrogen.fhenix.zone
    // Chain ID: 8008148
    // Currency Symbol: FHE
    // Block Explorer URL: https://explorer.nitrogen.fhenix.zone
    const abi = [
        "function stakeFake(address _address, string memory eventName, uint256 amount) public"
    ];
    const iface = new Interface(abi);
    const encodedData = iface.encodeFunctionData("stakeFake", [address, eventName, amount]);


    const client = createPublicClient({
        transport: http('https://api.nitrogen.fhenix.zone'),
    });
    const nonce = await client.getTransactionCount({ address: address });

    const transaction = {
        // Hardcoding our contract address
        to: '0xDdF8524928eF00d646443682c5283E22430137a9',
        value: BigInt("0"),
        gasLimit: BigInt(2883746),
        maxFeePerGas: BigInt('21000000000'),
        maxPriorityFeePerGas: BigInt('2000000000'),
        data: encodedData,
        nonce: nonce,
        type: 2,
        chainId: 8008148,
    };
    return transaction;
}

function getDigest(transaction: any) {
    const serializedTransaction = serialize(transaction);
    const transactionHash = keccak256(serializedTransaction);
    const digest = hexlify(transactionHash).substring(2);
    return digest;
}

async function sendTransaction(transaction: any, v: any, r: any, s: any,) {
    console.log("SENDING TX0", transaction, r, s, v)
    let txHashRet = ""
    const signedTransaction = serialize(transaction, { r, s, v });
    const client = createPublicClient({
        transport: http('https://api.nitrogen.fhenix.zone'),
    });
    console.log("SENDING SIGNED TX ", signedTransaction)
    const resp = await client.sendRawTransaction({
        serializedTransaction: signedTransaction as `0x${string}`
    })
        .then((txHash: any) => {
            console.log('Transaction hash:', txHash);
            txHashRet = txHash
        })
        .catch((error: any) => {
            console.error('Error sending transaction:', error);
        });
    return txHashRet;
}



export default function Page() {

    const [walletAddress, setWalletAddress] = useAtom(walletAddressAtom);

    const [poolsMap, setPoolsMap] = useState<Record<string, number>>({});
    const [error, setError] = useState<string | null>(null);

    const [statusText, setStatusText] = useState('');
    // qrcodes will only be used on desktop
    const [qrc, setQrc] = useState("");
    const [txHash, setTxHash] = useState("");

    const [sliderValueSport, setSliderValueSport] = useState([50])
    const [sliderValueTravel, setSliderValueTravel] = useState([50])
    const [stakedSport, setStakedSport] = useState(0)
    const [stakedTravel, setStakedTravel] = useState(0)
    const [myBalance, setMyBalance] = useState(100)

    async function connectDesktop(tag: string) {
        const address = walletAddress ? walletAddress : "0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97";
        const transaction = await getTransaction(address as `0x${string}`, tag, sliderValueSport[0]);
        const digest = getDigest(transaction);

        const cmd = {
            name: 'sign',
            keyNo: 1,
            // message: "0123"
            digest: digest
        };

        const gate = new HaloGateway('wss://s1.halo-gateway.arx.org', {
            createWebSocket: (url) => new W3CWebSocket(url) as unknown as WebSocket
        });
        const pairInfo = await gate.startPairing();
        setQrc(pairInfo.execURL);
        console.log('Waiting for smartphone to connect...');
        try {
            await gate.waitConnected();
        } catch (e) {
            console.error('caught error when waitConnected()');
            console.log(e);
        }

        try {
            const res = await gate.execHaloCmd(cmd);
            console.log(res)

            // TODO - actually send transaction here, and display txHash
            const v = res.signature.raw.v;
            const r = "0x" + res.signature.raw.r;
            const s = "0x" + res.signature.raw.s;
            console.log("SENDING TX", transaction, v, r, s)
            const txHash = await sendTransaction(transaction, v, r, s);
            console.log("txHash", txHash)
            setTxHash(txHash)

            if (tag === 'sport') {
                setStakedSport(sliderValueSport[0])
                setMyBalance((prevBalance) => prevBalance - sliderValueSport[0]);
            } else if (tag === 'travel') {
                setStakedTravel(sliderValueTravel[0])
                setMyBalance(myBalance - sliderValueTravel[0])
            }
            setQrc("");
        } catch (e) {
            console.log('caught error when execHaloCmd');
        }
    }


    async function connectMobile(tag: string) {
        // Note - this will ONLY work on mobile
        // Need separate function for desktop compatability
        const address = walletAddress ? walletAddress : "0x4838B106FCe9647Bdf1E7877BF73cE8B0BAD5f97";
        const transaction = await getTransaction(address as `0x${string}`, tag, sliderValueSport[0]);

        const digest = getDigest(transaction);
        const cmd = {
            name: 'sign',
            keyNo: 1,
            // message: "4567"
            digest: digest
        };

        try {
            const res = await execHaloCmdWeb(cmd, {
                statusCallback: (cause) => {
                    if (cause === "init") {
                        setStatusText("Please tap the tag to the back of your smartphone and hold it...");
                    } else if (cause === "retry") {
                        setStatusText("Something went wrong, please try to tap the tag again...");
                    } else if (cause === "scanned") {
                        setStatusText("Tag scanned successfully, post-processing the result...");
                    } else {
                        setStatusText(cause);
                    }
                }
            });

            const v = res.signature.raw.v;
            const r = "0x" + res.signature.raw.r;
            const s = "0x" + res.signature.raw.s;
            const txHash = await sendTransaction(transaction, v, r, s);
            console.log("txHash", txHash)
            setTxHash(txHash)

            if (tag === 'sport') {
                console.log("USING VALUE", sliderValueSport[0])
                setStakedSport(sliderValueSport[0])
                setMyBalance((prevBalance) => prevBalance - sliderValueSport[0]);
            } else if (tag === 'travel') {
                setStakedTravel(sliderValueTravel[0])
                setMyBalance(myBalance - sliderValueTravel[0])
            }
            setStatusText("");
        } catch (e) {
            // the command has failed, display error to the user
            setStatusText('Scanning failed, click on the button again to retry. Details: ' + String(e));
        }
    }

    async function connectToWristband(tag: string) {
        if (isMobile) {
            await connectMobile(tag);
        } else {
            await connectDesktop(tag);
        }
    }

    return (
        <main className="min-h-screen bg-[#E5F2F2] flex flex-col items-center justify-start p-4">
            <div className="w-full max-w-md space-y-12">
                <header className="flex items-center justify-between p-4 bg-white">
                    <button className="p-2">
                        <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                        <div className="w-6 h-0.5 bg-gray-600 mb-1"></div>
                        <div className="w-6 h-0.5 bg-gray-600"></div>
                    </button>
                    <h1 className="text-2xl font-bold">ZUQUESTS</h1>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center bg-white rounded-full px-3 py-1 shadow">
                            <Trophy className="w-5 h-5 text-[#3D8F8F] mr-1" />
                            <span className="font-semibold">48</span>
                        </div>
                        <Image
                            src="/Profile.png"
                            alt="Profile"
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                    </div>
                </header>

                <div className="space-y-4">
                    <h2 className="text-4xl font-bold text-[#3D8F8F]">Fund Your Visions</h2>
                    <p className="text-xl leading-relaxed">
                        Stake into what you'd like to see more of, the rewards will be split based on the number of quests completed in your chosen areas
                    </p>
                </div>

                <Card className="bg-[#3D8F8F] text-white">
                    <CardContent className="p-6 flex justify-between items-center">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">All Pools</h3>
                            <div className="text-xl">UP TO 34% Yield</div>
                        </div>
                        <div className="text-2xl font-bold">{'>'}3K $ZTC</div>
                    </CardContent>
                </Card>

                <Card className="bg-white">
                    <CardContent className="p-6 flex justify-between items-center">
                        <h3 className="text-2xl font-bold text-[#3D8F8F]">My Balance</h3>
                        <div className="text-2xl font-bold text-[#3D8F8F]">{myBalance} $ZTC</div>
                    </CardContent>
                </Card>


                <div className="space-y-6">
                    {/* Sport Section */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-[#3D8F8F]">Sport</h3>
                            <div className="text-[#3D8F8F] mb-2">My Stake: {stakedSport}</div>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Go for a Run</h4>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Join Padel</h4>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Slider
                                    value={sliderValueSport}
                                    onValueChange={setSliderValueSport}
                                    max={100}
                                    step={1}
                                    className="w-full"
                                />
                                <div className="text-sm text-[#3D8F8F] text-center">
                                    Stake Amount: {sliderValueSport[0]}
                                </div>
                            </div>
                            <Button
                                className="w-full bg-[#3D8F8F] hover:bg-[#2D7A7A]"
                                onClick={() => connectToWristband('sport')}
                            >
                                Stake
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Travel Section */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-[#3D8F8F]">Travel</h3>
                            <div className="text-[#3D8F8F] mb-2">My Stake: {stakedTravel}</div>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Island Tour</h4>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Go for a Run</h4>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Slider
                                    value={sliderValueTravel}
                                    onValueChange={setSliderValueTravel}
                                    max={100}
                                    step={1}
                                    className="w-full"
                                />
                                <div className="text-sm text-[#3D8F8F] text-center">
                                    Stake Amount: {sliderValueTravel[0]}
                                </div>
                            </div>
                            <Button
                                className="w-full bg-[#3D8F8F] hover:bg-[#2D7A7A]"
                                onClick={() => connectToWristband('travel')}
                            >
                                Stake
                            </Button>
                        </CardContent>
                    </Card>

                    <div>
                        {qrc && (
                            <QRCode value={qrc} />
                        )}
                        {txHash && (
                            <div>
                                <h3>Transaction Hash:</h3>
                                <Link href={`https://explorer.nitrogen.fhenix.zone/tx/${txHash}`}>
                                    <p>{txHash}</p>
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
                <Footer />
            </div>
        </main>
    )
}

