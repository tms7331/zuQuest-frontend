import Image from "next/image"
import { Trophy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function QuestDetail() {
    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <Card className="w-full max-w-xl">
                <CardHeader className="space-y-6">
                    <div className="flex items-center gap-3">
                        <div className="bg-[#E5F2F2] rounded-full p-2">
                            <svg
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-[#3D8F8F]"
                            >
                                <path d="M18 6 6 18" />
                                <path d="m6 6 12 12" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-semibold tracking-tight">ZUQUEST</h1>
                    </div>
                    <div className="relative w-full aspect-[2/1] rounded-lg overflow-hidden">
                        <Image
                            src="/CitySkyline.png?height=300&width=600"
                            alt="City skyline illustration"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute top-4 right-4 flex items-center gap-2">
                            <div className="bg-[#3D8F8F] text-white rounded-lg px-3 py-1.5 flex items-center gap-2">
                                <Trophy className="w-4 h-4" />
                                <span>12</span>
                            </div>
                        </div>
                        <div className="absolute top-4 right-24">
                            <Badge variant="secondary" className="bg-[#E5F2F2] text-[#3D8F8F] hover:bg-[#E5F2F2]">
                                +1 day
                            </Badge>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Badge className="bg-[#E5F2F2] text-[#3D8F8F] hover:bg-[#E5F2F2]">EDUCATION</Badge>
                    <div className="space-y-4">
                        <h2 className="text-2xl font-semibold text-[#3D8F8F]">Mentor 2 Participants in Coding</h2>
                        <p className="text-gray-600 text-lg">
                            Guide two participants through basic coding challenges and provide feedback.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="text-xl font-semibold text-[#3D8F8F]">Instructions:</h3>
                        <ol className="space-y-4 list-decimal list-inside text-gray-600">
                            <li>Find two participants in the telegram group</li>
                            <li>Teach and mentor them for at least 8 hours in the week</li>
                            <li>Send a picture for proof</li>
                        </ol>
                    </div>
                </CardContent>
                <CardFooter className="flex gap-4">
                    <Button variant="outline" className="flex-1 text-[#3D8F8F] border-[#3D8F8F]">
                        Reject
                    </Button>
                    <Button className="flex-1 bg-[#3D8F8F] hover:bg-[#2D7A7A]">
                        Accept Quest
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}

