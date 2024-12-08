import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Check } from 'lucide-react'
import Link from "next/link"

export default function WristbandFound() {
    return (
        <main className="min-h-screen bg-[#E5F2F2] relative overflow-hidden">
            {/* Wave Background */}
            <div className="absolute inset-x-0 bottom-0">
                <div className="h-40 bg-[#E5F2F2]">
                    <svg
                        viewBox="0 0 1440 320"
                        className="w-full h-full"
                        preserveAspectRatio="none"
                    >
                        <path
                            fill="#ffffff"
                            fillOpacity="1"
                            d="M0,96L80,106.7C160,117,320,139,480,133.3C640,128,800,96,960,90.7C1120,85,1280,107,1360,117.3L1440,128L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
                        ></path>
                    </svg>
                </div>
            </div>

            <div className="relative z-10 flex flex-col items-center px-6 pt-12">
                {/* Header */}
                <h1 className="text-2xl md:text-4xl font-serif tracking-wider mb-8">ZUQUESTS</h1>

                {/* Check Icon */}
                <div className="w-24 h-24 rounded-full bg-[#3D8F8F] flex items-center justify-center mb-8">
                    <Check className="w-12 h-12 text-white" />
                </div>

                <div className="relative h-80 w-full">
                    <Image
                        src="/bracelet.png"
                        alt="Black wristband with green accents"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>

                {/* Content */}
                <div className="text-center space-y-4 mb-8">
                    <h2 className="text-4xl font-bold">Wristband Found</h2>
                    <p className="text-gray-500 text-lg">
                        Tap on Get Started and Connect Your Wristband
                    </p>
                </div>

                <Link href="/importlinkedin">
                    <Button
                        className="bg-black hover:bg-black/90 text-white rounded-full px-8 py-6 text-lg"
                        size="lg"
                    >
                        Create Your Profile
                    </Button>
                </Link>
            </div>
        </main>
    )
}

