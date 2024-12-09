"use client"

import Image from "next/image"
import { useEffect } from "react"
import { Trophy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { questList } from "@/lib/questList"
import { supabase } from '@/lib/supabaseClient';
import { useAtom } from "jotai"
import { walletAddressAtom } from "@/lib/atoms"

const getProfile = async (address: string) => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('address', address)
        .single(); // Fetch only a single record
    if (error) {
        console.error('Error fetching profile:', error);
        throw new Error('Failed to fetch profile');
    }
    return data;
};






export default function Page() {
    const [walletAddress, setWalletAddress] = useAtom(walletAddressAtom);

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const profileData = await getProfile(walletAddress);
                console.log("Got profile data...")
                console.log(profileData);
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        };
        loadProfileData();
    }, []);


    return (
        <main className="min-h-screen bg-[#E5F2F2] flex flex-col items-center justify-start p-4">
            <div className="w-full max-w-md space-y-12">
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

                <div>
                    {/* Featured Quest Card */}
                    <Card className="overflow-hidden">
                        <div className="relative">
                            <Image
                                src="/CitySkyline.png"
                                alt="City skyline"
                                width={600}
                                height={300}
                                className="w-full object-cover"
                            />
                            <div className="absolute top-4 right-4 flex gap-2">
                                <Badge className="bg-[#3D8F8F]">
                                    <Trophy className="w-4 h-4 mr-1" />
                                    12
                                </Badge>
                                <Badge className="bg-[#A5D8D8] text-black">+1 day</Badge>
                            </div>
                        </div>
                        <div className="p-4 space-y-4">
                            <h2 className="text-2xl font-bold">Mentor 2 Participants in Coding</h2>
                            <p className="text-gray-600">
                                Mentor two beginners (or intermediate learners) in coding. Help them understand...
                            </p>
                            <div className="flex gap-4">
                                <Button className="flex-1 bg-[#3D8F8F] hover:bg-[#2D7A7A]">Accept</Button>
                                <Button variant="outline" className="flex-1">
                                    Reject
                                </Button>
                            </div>
                        </div>
                    </Card>

                    {/* Categories */}
                    <div className="flex gap-2 overflow-x-auto pb-2">
                        <Badge variant="secondary" className="bg-[#3D8F8F] text-white">
                            All (49)
                        </Badge>
                        <Badge variant="secondary" className="bg-white">Sport</Badge>
                        <Badge variant="secondary" className="bg-white">Music</Badge>
                        <Badge variant="secondary" className="bg-white">Design</Badge>
                        <Badge variant="secondary" className="bg-white">Comm</Badge>
                    </div>

                    {/* Quest Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {questList.map((quest, index) => (
                            <Card key={index} className="overflow-hidden">
                                <div className="p-4 space-y-2">
                                    <h3 className="font-bold">{quest.title}</h3>
                                    <p className="text-sm text-gray-600">
                                        {quest.description}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <Badge className="bg-[#3D8F8F]">
                                            <Trophy className="w-4 h-4 mr-1" />
                                            {quest.points}
                                        </Badge>
                                        <Badge variant="secondary" className="bg-white">
                                            +{quest.duration}h
                                        </Badge>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <Footer />
                </div>
            </div >
        </main>
    )
}


