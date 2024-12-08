'use client'

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { X, Upload } from 'lucide-react'
import Image from "next/image"
import { useState } from "react"

export default function QuestCompletion() {
    const [photoUrl, setPhotoUrl] = useState<string | null>(null)

    return (
        <div className="min-h-screen bg-[#E5F2F2] p-4">
            <Card className="mx-auto max-w-md p-6 space-y-8">
                <div className="flex items-center space-x-4">
                    <div className="bg-[#E5F2F2] rounded-full p-2">
                        <X className="w-6 h-6 text-[#3D8F8F]" />
                    </div>
                    <h1 className="text-2xl font-serif tracking-wider">ZUQUEST</h1>
                </div>

                <div className="space-y-6">
                    <h2 className="text-4xl font-medium text-[#3D8F8F]">Complete Your Quest</h2>

                    <div className="space-y-2">
                        <h3 className="text-2xl font-medium text-[#3D8F8F]">
                            Mentor 2 Participants in Coding
                        </h3>
                        <p className="text-lg text-[#3D8F8F]">
                            Guide two participants through basic coding challenges and provide feedback.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xl text-gray-700">What did you do?</label>
                        <Textarea
                            className="min-h-[200px] resize-none border-2"
                            placeholder="Describe your experience..."
                        />
                    </div>

                    <Button
                        variant="outline"
                        className="w-full h-14 border-2 border-[#3D8F8F] text-[#3D8F8F] hover:bg-[#3D8F8F] hover:text-white"
                    >
                        <Upload className="mr-2" />
                        Upload a Photo
                    </Button>

                    <div className="flex justify-between pt-4">
                        <Button
                            variant="ghost"
                            className="text-[#3D8F8F] hover:text-[#2D7A7A] hover:bg-transparent"
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#3D8F8F] hover:bg-[#2D7A7A] text-white px-8"
                        >
                            Submit
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}

