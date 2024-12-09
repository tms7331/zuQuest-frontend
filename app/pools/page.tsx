"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trophy, Home, Search, Repeat, Award } from 'lucide-react'
import QRCode from 'react-qr-code';
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { w3cwebsocket as W3CWebSocket } from 'websocket';
import { Footer } from "@/components/footer"
import { execHaloCmdWeb, HaloGateway } from '@arx-research/libhalo/api/web'
import { supabase } from '@/lib/supabaseClient';
import { isMobile } from 'react-device-detect';


type Pool = {
    tag: string;
    count: number;
}

const fetchPools = async () => {
    const { data, error } = await supabase.from('pools').select('*');
    if (error) {
        console.error('Error fetching pools:', error);
        throw new Error('Failed to fetch pools');
    }
    return data;
};


const updatePool = async (tag: string, updates: Pool) => {
    const { data, error } = await supabase
        .from('pools')
        .update(updates)
        .eq('tag', tag);
    if (error) {
        console.error('Error updating pool:', error);
        throw new Error('Failed to update profile');
    }
    return data;
};


export default function Page() {

    const [poolsMap, setPoolsMap] = useState<Record<string, number>>({});
    const [error, setError] = useState<string | null>(null);

    const [statusText, setStatusText] = useState('');
    // qrcodes will only be used on desktop
    const [qrc, setQrc] = useState("");

    async function connectDesktop(tag: string) {
        const cmd = {
            name: 'sign',
            keyNo: 1,
            message: "0123"
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
            await updatePool(tag, { tag: tag, count: poolsMap[tag] + 1 });
            setPoolsMap({ ...poolsMap, [tag]: poolsMap[tag] + 1 });
            setQrc("");
        } catch (e) {
            console.log('caught error when execHaloCmd');
        }
    }

    async function connectMobile(tag: string) {
        // Note - this will ONLY work on mobile
        // Need separate function for desktop compatability
        const cmd = {
            name: 'sign',
            keyNo: 1,
            message: "4567"
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
            await updatePool(tag, { tag: tag, count: poolsMap[tag] + 1 });
            setPoolsMap({ ...poolsMap, [tag]: poolsMap[tag] + 1 });
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


    useEffect(() => {
        const callFetchPools = async () => {
            try {
                const pools = await fetchPools();
                console.log("GOT POOLS", pools)
                // {tag: 'sport', count: 2}
                if (pools) {
                    const poolsMap = pools.reduce((acc, pool) => {
                        acc[pool.tag] = pool.count;
                        return acc;
                    }, {} as Record<string, number>);
                    console.log("POOLS MAP", poolsMap);

                    setPoolsMap(poolsMap);
                } else {
                    setError('Failed to fetch pools');
                }
            } catch (err) {
                setError('Error fetching data');
            }
        };

        callFetchPools();
    }, []);

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
                        Stake into what you like to see more, the rewards are going to be split based on the number of quests completed in your chosen area
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

                <div className="space-y-6">
                    {/* Sport Section */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-[#3D8F8F]">Sport</h3>
                            <div className="text-[#3D8F8F] mb-2">Interest Points: {poolsMap['sport']}</div>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Go for a Run</h4>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Join Padel</h4>
                                </div>
                            </div>
                            <Button className="w-full bg-[#3D8F8F] hover:bg-[#2D7A7A]"
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
                            <div className="text-[#3D8F8F] mb-2">Interest Points: {poolsMap['travel']}</div>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Island Tour</h4>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Go for a Run</h4>
                                </div>
                            </div>
                            <Button className="w-full bg-[#3D8F8F] hover:bg-[#2D7A7A]"
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
                    </div>

                </div>
                <Footer />
            </div>
        </main>
    )
}

