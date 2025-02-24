import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Page() {
    return (
        <main className="min-h-screen bg-[#E5F2F2] flex flex-col items-center justify-center p-4">
            <div className="w-full max-w-md text-center mb-12">
                <h1 className="text-2xl md:text-4xl font-serif tracking-wider">ZUQUESTS</h1>
            </div>

            <div className="w-full max-w-md space-y-8">
                <div className="relative h-64 md:h-80">
                    <Image
                        src="/BandParty.png?height=400&width=400"
                        alt="Illustration of two people performing on stage"
                        fill
                        className="object-contain"
                        priority
                    />
                </div>


                {/* Pagination Dots */}
                <div className="flex justify-center gap-2 py-4">
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-8 h-2 rounded-full bg-[#3D8F8F]"></div>
                </div>

                {/* Text Content */}
                <div className="text-center space-y-4 px-4">
                    <h2 className="text-4xl font-bold text-gray-900">
                        Have Fun!
                    </h2>
                    <p className="text-gray-500 text-lg md:text-xl max-w-sm mx-auto">
                        Connect, learn, celebrate, and get to better know yourself and each other!
                    </p>
                </div>

                {/* Bottom Buttons */}
                <div className="w-full max-w-md flex justify-between items-center pt-8 pb-4">
                    <Button
                        variant="ghost"
                        className="text-[#3D8F8F] hover:text-[#2D7A7A] hover:bg-transparent"
                        asChild
                    >
                        <Link href="/loginwristband">Skip</Link>
                    </Button>
                    <Button
                        className="bg-[#3D8F8F] hover:bg-[#2D7A7A] text-white px-8 py-2 rounded-full"
                        asChild
                    >
                        <Link href="/loginwristband">Sign In</Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}

