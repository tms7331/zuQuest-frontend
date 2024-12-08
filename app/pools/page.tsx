import Image from "next/image"
import Link from "next/link"
import { Trophy, Home, Search, Repeat, Award } from 'lucide-react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Footer } from "@/components/footer"

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-b from-[#E5F2F2] to-white">
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

            <main className="flex-grow px-4 py-6 space-y-6 overflow-y-auto">
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
                            <div className="text-[#3D8F8F] mb-2">Latest</div>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Go for a Run</h4>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Join Padel</h4>
                                </div>
                            </div>
                            <Button className="w-full bg-[#3D8F8F] hover:bg-[#2D7A7A]">
                                Stake
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Travel Section */}
                    <Card>
                        <CardContent className="p-6 space-y-4">
                            <h3 className="text-2xl font-bold text-[#3D8F8F]">Travel</h3>
                            <div className="text-[#3D8F8F] mb-2">Latest</div>
                            <div className="flex gap-4 overflow-x-auto pb-2">
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Island Tour</h4>
                                </div>
                                <div className="bg-white rounded-xl p-4 shadow-sm min-w-[150px]">
                                    <h4 className="font-bold">Go for a Run</h4>
                                </div>
                            </div>
                            <Button className="w-full bg-[#3D8F8F] hover:bg-[#2D7A7A]">
                                Stake
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </main>
            <Footer />
        </div>
    )
}

