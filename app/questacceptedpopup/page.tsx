'use client'

import { Check, Home, Search, Trophy } from 'lucide-react'
import Image from "next/image"
import Link from "next/link"

export default function QuestAccepted() {
    return (
        <div className="min-h-screen bg-[#E5F2F2]">
            {/* Header */}
            <header className="flex items-center justify-between p-4">
                <button className="text-2xl">☰</button>
                <h1 className="text-2xl font-serif">ZUQUESTS</h1>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1">
                        <Trophy className="h-5 w-5 text-[#3D8F8F]" />
                        <span className="text-lg">48</span>
                    </div>
                    <div className="h-10 w-10 overflow-hidden rounded-full bg-gray-200">
                        <Image
                            src="/placeholder.svg?height=40&width=40"
                            alt="Profile"
                            width={40}
                            height={40}
                        />
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="p-4">
                {/* Quest Card */}
                <div className="relative rounded-3xl bg-white p-4 shadow-lg">
                    <div className="mb-40">
                        <span className="inline-block rounded-full bg-[#E5F2F2] px-4 py-1 text-[#3D8F8F]">
                            ONGOING
                        </span>
                        <div className="absolute right-4 top-4 flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-[#3D8F8F] px-3 py-1 text-white">
                                <Trophy className="h-4 w-4" />
                                <span>12</span>
                            </div>
                            <span className="rounded-full bg-[#E5F2F2] px-3 py-1 text-[#3D8F8F]">
                                +1 day
                            </span>
                        </div>
                    </div>

                    {/* Quest Accepted Overlay */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center rounded-3xl bg-white">
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23E5F2F2' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z'%3E%3C/path%3E%3C/svg%3E\")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "cover",
                                opacity: 0.5
                            }}
                        />
                        <div
                            className="absolute inset-0"
                            style={{
                                background: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23E5F2F2' fill-opacity='1' d='M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,224C672,213,768,171,864,149.3C960,128,1056,128,1152,149.3C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E\")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center bottom",
                                backgroundSize: "cover",
                                opacity: 0.5
                            }}
                        />
                        <div className="relative z-10 flex flex-col items-center gap-4">
                            <div className="rounded-full bg-[#3D8F8F] p-6">
                                <Check className="h-12 w-12 text-white" />
                            </div>
                            <h2 className="text-2xl font-medium text-[#3D8F8F]">Quest Accepted</h2>
                        </div>
                    </div>
                </div>
            </main>

            {/* Navigation */}
            <nav className="fixed bottom-0 left-0 right-0 flex justify-around border-t bg-white p-4">
                <Link href="/" className="flex flex-col items-center gap-1 text-[#3D8F8F]">
                    <Home className="h-6 w-6" />
                    <span className="text-xs">Start</span>
                </Link>
                <Link href="/quests" className="flex flex-col items-center gap-1 text-[#3D8F8F]">
                    <Search className="h-6 w-6" />
                    <span className="text-xs">Quests</span>
                </Link>
                <Link href="/pools" className="flex flex-col items-center gap-1 text-[#3D8F8F]">
                    <div className="h-6 w-6 rounded-full border-2 border-current" />
                    <span className="text-xs">Pools</span>
                </Link>
                <Link href="/rewards" className="flex flex-col items-center gap-1 text-[#3D8F8F]">
                    <Trophy className="h-6 w-6" />
                    <span className="text-xs">Rewards</span>
                </Link>
            </nav>
        </div>
    )
}

