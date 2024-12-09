"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import { Trophy } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Footer } from "@/components/footer"
import { questList } from "@/lib/questList"
import { supabase } from '@/lib/supabaseClient';
import { useAtom } from "jotai"
import { walletAddressAtom } from "@/lib/atoms"

interface Task {
    'Task Title': string;
    'Task Description': string;
    'Category': string;
    'Points': string;
    'Duration (hours)': string;
    participants?: string;
    requiredSkills?: string;
}

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
    const [tasks, setTasks] = useState<Task[]>([]);

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

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const tasksData = localStorage.getItem('tasks');
                console.log('Retrieved tasks raw:', tasksData);
                
                if (!tasksData) {
                    console.log('No tasks in localStorage, using questList');
                    setTasks(questList);
                    return;
                }

                // Parse JSON and ensure it's an array
                const parsedData = JSON.parse(tasksData);
                console.log('Retrieved tasks parsed:', parsedData);
                console.log('Retrieved tasks type:', typeof parsedData);
                console.log('Is retrieved tasks array:', Array.isArray(parsedData));
                
                const tasksArray = Array.isArray(parsedData) ? parsedData : [parsedData];
                console.log('Final tasks array:', tasksArray);
                setTasks(tasksArray);
            } catch (error) {
                console.error('Error fetching tasks:', error);
                setTasks(questList);
            }
        };
    
        fetchTasks();
    }, []);


    return (
        <main className="min-h-screen bg-[#E5F2F2] flex flex-col items-center justify-start p-4">
            <div className="w-full max-w-md space-y-4">
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

                <div className="-mt-4">
                    {/* Featured Quest Card */}
                    <Card className="overflow-hidden mb-6">
                        <div className="relative">
                            <Image
                                src="/CitySkyline.png"
                                alt="City skyline"
                                width={600}
                                height={300}
                                className="w-full object-cover"
                            />
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
                        {tasks.map((task, index) => (
                            <Card key={index} className="overflow-hidden">
                                <div className="p-4 space-y-2">
                                    <h3 className="font-bold">{task['Task Title']}</h3>
                                    <p className="text-sm text-gray-600">
                                        {task['Task Description']}
                                    </p>
                                    <div className="flex justify-between items-center">
                                        <Badge className="bg-[#3D8F8F]">
                                            <Trophy className="w-4 h-4 mr-1" />
                                            {task['Points']}
                                        </Badge>
                                        <Badge variant="secondary" className="bg-white">
                                            +{task['Duration (hours)']}h
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


