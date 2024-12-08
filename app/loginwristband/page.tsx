import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ConnectWristband() {
    return (
        <main className="min-h-screen bg-[#E5F2F2] flex flex-col items-center justify-start p-4">
            <div className="w-full max-w-md text-center mb-12">
                <h1 className="text-2xl md:text-4xl font-serif tracking-wider">ZUQUESTS</h1>
            </div>

            <div className="w-full max-w-md space-y-12">
                <div className="relative h-80 w-full">
                    <Image
                        src="/wristband.jpg"
                        alt="Black wristband with green accents"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                <div className="text-center space-y-4">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                        Connect Wirstband
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl max-w-sm mx-auto">
                        Tap on Get Started and Connect Your Wirstband
                    </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                    <Button
                        className="bg-[#3D8F8F] hover:bg-[#2D7A7A] text-white px-8 py-6 rounded-full w-full max-w-xs text-lg"
                        asChild
                    >
                        <Link href="/logincreateprofile">Get Started</Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}

