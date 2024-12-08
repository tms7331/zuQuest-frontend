"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useState } from 'react'
import { execHaloCmdWeb } from '@arx-research/libhalo/api/web'
import { useAtom } from 'jotai';
import { walletAddressAtom } from '@/lib/atoms';

export default function ConnectWristband() {
    const [walletAddress, setWalletAddress] = useAtom(walletAddressAtom);
    const [statusText, setStatusText] = useState('');
    const [loggedIn, setLoggedIn] = useState(false);


    async function connectFake() {
        const fakeAddress = "0x123"
        // For web testing
        setWalletAddress(fakeAddress);
        setStatusText("");
        setLoggedIn(true);
    }


    async function connectToWristband() {
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
                </div>
                <div>{statusText}</div>

            </div>
        </main>
    )
}

