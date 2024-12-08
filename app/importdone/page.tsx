'use client'

import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

export default function CompleteProfile() {
    return (
        <main className="min-h-screen bg-[#E5F2F2] p-4">
            <div className="max-w-md mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <Button variant="ghost" size="icon" asChild>
                        <Link href="/">
                            <X className="h-8 w-8 text-[#3D8F8F]" />
                        </Link>
                    </Button>
                    <h1 className="text-2xl font-serif tracking-wider">ZUQUESTS</h1>
                    <div className="w-8" /> {/* Spacer for alignment */}
                </div>

                {/* Title */}
                <h2 className="text-4xl font-medium text-[#3D8F8F]">
                    Complete Your Profile
                </h2>

                {/* Wallet Address Card */}
                <Card className="p-4 bg-[#E5F2F2] border-[#3D8F8F] border-2">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#3D8F8F] rounded-full">
                            <svg
                                className="w-5 h-5 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                />
                            </svg>
                        </div>
                        <span className="text-gray-600 font-mono">
                            0x442BA2a9ax828191...33
                        </span>
                    </div>
                </Card>

                {/* LinkedIn Import Button */}
                <Button
                    className="w-full py-6 text-xl bg-[#3D8F8F] hover:bg-[#2D7A7A]"
                >
                    Import Safely from LinkedIn
                </Button>

                {/* Form Fields */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Nickname*</label>
                        <Input
                            placeholder="Enter nickname"
                            defaultValue="John"
                            className="bg-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Occupation*</label>
                        <Input
                            placeholder="Enter occupation"
                            defaultValue="Solidity Developer"
                            className="bg-white"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium">Available:</label>
                        <Input
                            placeholder="Enter availability"
                            defaultValue="a few hours a week (1/12 to 9/12)"
                            className="bg-white"
                        />
                    </div>

                    {/* Interests Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            Interests
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {['Sports', 'Music'].map((interest) => (
                                <Badge
                                    key={interest}
                                    variant="secondary"
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                                >
                                    {interest}
                                    <X className="w-4 h-4 ml-2 text-[#3D8F8F]" />
                                </Badge>
                            ))}
                        </div>
                    </div>

                    {/* Skills Section */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium flex items-center gap-2">
                            <svg
                                className="w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            Skills
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {['Development', 'Tokenomics', 'Design', 'QA'].map((skill) => (
                                <Badge
                                    key={skill}
                                    variant="secondary"
                                    className="px-4 py-2 bg-gray-100 hover:bg-gray-200"
                                >
                                    {skill}
                                    <X className="w-4 h-4 ml-2 text-[#3D8F8F]" />
                                </Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <Link href="/quests">
                    <Button
                        className="w-full py-6 text-xl bg-black hover:bg-gray-800"
                    >
                        Save and Continue
                    </Button>
                </Link>
            </div>
        </main>
    )
}

