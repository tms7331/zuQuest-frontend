'use client'

import Image from "next/image"
import { Check, Home, Search, Trophy, Users } from 'lucide-react'
import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Dialog, DialogContent } from "@/components/ui/dialog"

export default function Page() {
    const [showThankYou, setShowThankYou] = useState(true)

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="flex items-center justify-between p-4 bg-white">
                <button className="p-2">
                    <div className="w-6 h-0.5 bg-gray-900 mb-1"></div>
                    <div className="w-6 h-0.5 bg-gray-900"></div>
                </button>
                <h1 className="text-2xl font-serif">ZUQUESTS</h1>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 rounded-full">
                        <Trophy className="w-4 h-4 text-[#3D8F8F]" />
                        <span className="text-[#3D8F8F]">48</span>
                    </div>
                    <Image
                        src="/placeholder.svg"
                        alt="Profile"
                        width={40}
                        height={40}
                        className="rounded-full"
                    />
                </div>
            </header>

            {/* Main Content */}
            <main className="p-4 space-y-4">
                <Card className="overflow-hidden">
                    <div className="relative">
                        <Image
                            src="/placeholder.svg"
                            alt="City skyline"
                            width={400}
                            height={200}
                            className="w-full"
                        />
                        <div className="absolute top-4 left-4">
                            <span className="px-4 py-1 text-sm font-medium bg-[#E5F2F2] text-[#3D8F8F] rounded-full">
                                REVIEW
                            </span>
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <div className="flex items-center gap-1 px-3 py-1 bg-[#3D8F8F] text-white rounded-full">
                                <Trophy className="w-4 h-4" />
                                <span>12</span>
                            </div>
                            <span className="px-3 py-1 text-sm font-medium bg-[#E5F2F2] text-[#3D8F8F] rounded-full">
                                +1 day
                            </span>
                        </div>
                    </div>
                </Card>

                <div className="grid grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                        <Card key={i} className="p-4 space-y-2">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-1 px-3 py-1 bg-[#3D8F8F] text-white rounded-full">
                                    <Trophy className="w-4 h-4" />
                                    <span>12</span>
                                </div>
                                <span className="text-[#3D8F8F]">+1h</span>
                            </div>
                            <h3 className="font-semibold">Join Group Yoga</h3>
                            <p className="text-sm text-gray-600">
                                Mentor two beginners (or intermediate
                            </p>
                        </Card>
                    ))}
                </div>
            </main>

            {/* Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 bg-white border-t">
                <div className="flex justify-around p-4">
                    <button className="flex flex-col items-center gap-1">
                        <Home className="w-6 h-6" />
                        <span className="text-xs">Start</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                        <Search className="w-6 h-6" />
                        <span className="text-xs">Quests</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                        <Users className="w-6 h-6" />
                        <span className="text-xs">Pools</span>
                    </button>
                    <button className="flex flex-col items-center gap-1">
                        <Trophy className="w-6 h-6" />
                        <span className="text-xs">Rewards</span>
                    </button>
                </div>
            </nav>

            {/* Thank You Dialog */}
            <Dialog open={showThankYou} onOpenChange={setShowThankYou}>
                <DialogContent className="sm:max-w-md">
                    <div className="flex flex-col items-center gap-6 py-10">
                        <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#3D8F8F]">
                            <Check className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-medium text-[#3D8F8F]">Thank You</h2>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}

