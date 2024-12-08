"use client"

import Image from "next/image"
import Link from "next/link"
import QRCode from 'react-qr-code';
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Button } from "@/components/ui/button"
import { useEffect, useState } from 'react'
import { execHaloCmdWeb, HaloGateway } from '@arx-research/libhalo/api/web'
import { useAtom } from 'jotai';
import { walletAddressAtom } from '@/lib/atoms';


// Duplicate code - look to extract
function useDeviceType() {
    // Hacky way to determine if user is on mobile or desktop
    // Will fail if window is sized down on desktop
    const [isMobile, setIsMobile] = useState(false);
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);

        handleResize(); // Set initial value
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isMobile;
}

export default function ConnectWristband() {
    const isMobile = useDeviceType();
    const [walletAddress, setWalletAddress] = useAtom(walletAddressAtom);
    const [statusText, setStatusText] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);
    // qrcodes will only be used on desktop
    const [qrc, setQrc] = useState("");

    async function connectFake() {
        const fakeAddress = "0x123"
        // For web testing
        setWalletAddress(fakeAddress);
        setStatusText("");
        setLoggedIn(true);
    }

    async function connectDesktop() {
        const cmd = {
            name: 'get_pkeys',
        };

        let gate = new HaloGateway('wss://s1.halo-gateway.arx.org', {
            createWebSocket: (url) => new W3CWebSocket(url) as unknown as WebSocket
        });
        let pairInfo = await gate.startPairing();
        setQrc(pairInfo.execURL);
        console.log('Waiting for smartphone to connect...');
        try {
            await gate.waitConnected();
        } catch (e) {
            console.error('caught error when waitConnected()');
            console.log(e);
        }
        try {
            let res = await gate.execHaloCmd(cmd);
            const walletAddress = res.etherAddresses[1];
            setWalletAddress(walletAddress);
            setStatusText("");
            setQrc("");
            setLoggedIn(true);
        } catch (e) {
            console.log('caught error when execHaloCmd');
        }
    }

    async function connectMobile() {
        // Note - this will ONLY work on mobile
        // Need separate function for desktop compatability
        const cmd = {
            name: 'get_pkeys',
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
            // the command has succeeded, display the result to the user
            const walletAddress = res.etherAddresses[1];
            setWalletAddress(walletAddress);
            setStatusText("");
            setLoggedIn(true);
            // Redirect to profile page after successful scan
            // window.location.href = '/profile';
        } catch (e) {
            // the command has failed, display error to the user
            setStatusText('Scanning failed, click on the button again to retry. Details: ' + String(e));
        }
    }

    async function connectToWristband() {
        if (isMobile) {
            await connectMobile();
        } else {
            await connectDesktop();
        }
    }

    return (
        <main className="min-h-screen bg-[#E5F2F2] flex flex-col items-center justify-start p-4">
            <div className="w-full max-w-md text-center mb-12">
                <h1 className="text-2xl md:text-4xl font-serif tracking-wider">ZUQUESTS</h1>
            </div>

            <div className="w-full max-w-md space-y-12">
                <div className="relative h-80 w-full">
                    <Image
                        src="/bracelet.png"
                        alt="Black wristband with green accents"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Connect Wristband
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl max-w-sm mx-auto">
                        Tap on Get Started and Connect Your Wristband
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                    {loggedIn ? (
                        <Link href="/profile">
                            <Button
                                className="bg-[#3D8F8F] hover:bg-[#2D7A7A] text-white px-8 py-6 rounded-full w-full max-w-xs text-lg"
                            >

                                Go to Profile
                            </Button>
                        </Link>

                    ) : (
                        <Button
                            className="bg-[#3D8F8F] hover:bg-[#2D7A7A] text-white px-8 py-6 rounded-full w-full max-w-xs text-lg"
                            onClick={connectToWristband}
                        >
                            Get Started
                        </Button>
                    )}

                    {qrc && (
                        <QRCode value={qrc} />
                    )}

                </div>
                <div>{statusText}</div>

            </div>
        </main>
    )
}

