'use client'

import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"

export default function CompleteProfile() {



    return (
        <main className="min-h-screen bg-[#E5F2F2]">
            <div className="container max-w-md mx-auto p-4">
                <div className="flex justify-between items-center mb-8">
                    <Button variant="ghost" size="icon" className="rounded-full">
                        <X className="h-6 w-6 text-[#3D8F8F]" />
                    </Button>
                    <h1 className="text-2xl font-serif tracking-wider">ZUQUESTS</h1>
                    <div className="w-10" /> {/* Spacer for alignment */}
                </div>

                <h2 className="text-4xl font-medium text-[#3D8F8F] mb-12">Complete Your Profile</h2>

                <Card className="bg-white/80 backdrop-blur border-0 shadow-sm mb-4">
                    <CardContent className="p-4">
                        <div className="flex items-center gap-2">
                            <svg
                                viewBox="0 0 24 24"
                                className="w-6 h-6 text-[#3D8F8F]"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                            >
                                <path d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                <path d="M9 12l2 2 4-4" />
                            </svg>
                            <span className="text-sm font-mono text-gray-600">0x442BA2a9ax828191...33</span>
                        </div>
                    </CardContent>
                </Card>

                <Button
                    className="w-full bg-[#3D8F8F] hover:bg-[#2D7A7A] text-white mb-8 h-14 text-lg"
                >
                    Import Safely from LinkedIn
                </Button>

                <form className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="nickname">Nickname*</Label>
                        <Input
                            id="nickname"
                            required
                            className="h-14 bg-white/80 backdrop-blur border-0"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation*</Label>
                        <Input
                            id="occupation"
                            required
                            className="h-14 bg-white/80 backdrop-blur border-0"
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Available:</Label>
                        <Select>
                            <SelectTrigger className="h-14 bg-white/80 backdrop-blur border-0">
                                <SelectValue placeholder="Pick Your Availability" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="full-time">Full Time</SelectItem>
                                <SelectItem value="part-time">Part Time</SelectItem>
                                <SelectItem value="contract">Contract</SelectItem>
                                <SelectItem value="freelance">Freelance</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="interests">Interests</Label>
                        <div className="relative">
                            <Input
                                id="interests"
                                className="h-14 bg-white/80 backdrop-blur border-0 pl-12"
                            />
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 5h16M4 12h16M4 19h16" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="skills">Skills</Label>
                        <div className="relative">
                            <Input
                                id="skills"
                                className="h-14 bg-white/80 backdrop-blur border-0 pl-12"
                            />
                            <svg
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 5h16M4 12h16M4 19h16" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>


                    <Link href="/importdone">
                        <Button
                            type="submit"
                            className="w-full bg-gray-400 hover:bg-gray-500 text-white h-14 mt-12"
                        >
                            Save and Continue
                        </Button>
                    </Link>
                </form>
            </div>
        </main>
    )
}

