'use client'

import { useState, useEffect, useRef } from "react";
import Link from "next/link"
import QRCode from 'react-qr-code';
import { useRouter } from "next/navigation";
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent } from "@/components/ui/card"
import { useAtom } from 'jotai';
import { walletAddressAtom } from '@/lib/atoms';
import { ReclaimProofRequest } from '@reclaimprotocol/js-sdk';
import { supabase } from '@/lib/supabaseClient';
import { isMobile } from 'react-device-detect';

type Profile = {
    address: string;
    nickname?: string;
    occupation?: string;
    availability?: string;
    interests?: string;
    skills?: string;
    wants_to_learn?: string;
};


const addProfile = async (profile: Profile) => {
    const { data, error } = await supabase.from('profiles').insert([profile]);
    if (error) {
        console.error('Error inserting profile:', error);
        throw new Error('Failed to add profile');
    }
    return data;
};

const updateProfile = async (address: string, updates: Profile) => {
    const { data, error } = await supabase
        .from('profiles')
        .update(updates)
        .eq('address', address);
    if (error) {
        console.error('Error updating profile:', error);
        throw new Error('Failed to update profile');
    }
    return data;
};

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


export default function CompleteProfile() {
    const router = useRouter();

    const [walletAddress, setWalletAddress] = useAtom(walletAddressAtom);
    // const walletAddress = "0x456";
    const [reclaimRequestUrl, setReclaimRequestUrl] = useState('');
    const [newUser, setNewUser] = useState(true);

    useEffect(() => {
        const loadProfileData = async () => {
            try {
                const profileData = await getProfile(walletAddress);
                if (profileData) {
                    setNewUser(false);
                    setFormData({
                        nickname: profileData.nickname || '',
                        occupation: profileData.occupation || '',
                        availability: profileData.availability || '',
                        interests: profileData.interests || '',
                        skills: profileData.skills || '',
                        wants_to_learn: profileData.wants_to_learn || ''
                    });
                }
            } catch (error) {
                console.error('Error loading profile:', error);
            }
        };
        loadProfileData();
    }, [walletAddress]);


    const [formData, setFormData] = useState({
        nickname: '',
        occupation: '',
        availability: '',
        interests: '',
        skills: '',
        wants_to_learn: ''
    });

    const interestsRef = useRef<HTMLTextAreaElement>(null);
    const skillsRef = useRef<HTMLTextAreaElement>(null);

    const resizeTextarea = (textarea: HTMLTextAreaElement) => {
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    };

    useEffect(() => {
        if (interestsRef.current) resizeTextarea(interestsRef.current);
        if (skillsRef.current) resizeTextarea(skillsRef.current);
    }, [formData.interests, formData.skills]);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        if (newUser) {
            addProfile({ ...formData, address: walletAddress });
        } else {
            updateProfile(walletAddress, { ...formData, address: walletAddress });
        }
        router.push('/quests');
    };

    const getVerificationReq = async () => {
        const APP_ID = process.env.NEXT_PUBLIC_RECLAIM_APP_ID;
        const APP_SECRET = process.env.NEXT_PUBLIC_RECLAIM_APP_SECRET;
        const PROVIDER_ID = process.env.NEXT_PUBLIC_RECLAIM_PROVIDER_ID;
        const reclaimProofRequest = await ReclaimProofRequest.init(APP_ID!, APP_SECRET!, PROVIDER_ID!);

        // Generate the verification request URL
        const reclaimRequestUrl = await reclaimProofRequest.getRequestUrl();
        setReclaimRequestUrl(reclaimRequestUrl);
        // Start listening for proof submissions
        await reclaimProofRequest.startSession({
            // Called when the user successfully completes the verification
            onSuccess: (proofs) => {
                if (proofs) {
                    if (typeof proofs === 'string') {
                        // This will not be called?
                        console.log('SDK Message:', proofs);
                    } else if (typeof proofs !== 'string') {
                        const skills = proofs?.publicData?.skills;
                        setReclaimRequestUrl('');

                        if (skills) {
                            console.log("Got linkedin data", skills);
                            setFormData(prev => {
                                const newData = { ...prev, skills: skills };
                                return newData;
                            });

                            // Handle resizing
                            setTimeout(() => {
                                const textareas = document.querySelectorAll('textarea');
                                textareas.forEach(textarea => {
                                    textarea.style.height = 'auto';
                                    textarea.style.height = textarea.scrollHeight + 'px';
                                });
                            }, 0);

                        }
                    }
                }
            },
            onError: (error) => {
                console.error('Verification failed', error);
            },
        });
    };

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
                            <span className="text-sm font-mono text-gray-600">{walletAddress}</span>
                        </div>
                    </CardContent>
                </Card>

                <Button
                    className="w-full bg-[#3D8F8F] hover:bg-[#2D7A7A] text-white mb-8 h-14 text-lg"
                    onClick={getVerificationReq}
                >
                    Import Skills from LinkedIn
                </Button>

                {reclaimRequestUrl && (
                    <div style={{ margin: '20px 0' }}>
                        {!isMobile ? (
                            <>
                                <p>Scan this QR code to verify your LinkedIn account</p>
                                <QRCode value={reclaimRequestUrl} />
                            </>
                        ) : (
                            <>
                                <p>Open this link to verify your LinkedIn account</p>
                                <Link href={reclaimRequestUrl} className="text-blue-500 hover:text-blue-700 underline break-all">
                                    LinkedIn Verification Service
                                </Link>
                            </>
                        )}
                    </div>
                )}

                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-2">
                        <Label htmlFor="nickname">Nickname*</Label>
                        <Input
                            id="nickname"
                            required
                            className="h-14 bg-white/80 backdrop-blur border-0"
                            value={formData.nickname}
                            onChange={(e) => setFormData({ ...formData, nickname: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="occupation">Occupation*</Label>
                        <Input
                            id="occupation"
                            required
                            className="h-14 bg-white/80 backdrop-blur border-0"
                            value={formData.occupation}
                            onChange={(e) => setFormData({ ...formData, occupation: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Available:</Label>
                        <Select value={formData.availability} onValueChange={(value) => setFormData({ ...formData, availability: value })}>
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
                            <textarea
                                id="interests"
                                className="w-full min-h-[56px] pl-12 pr-4 py-2 bg-white/80 backdrop-blur border-0 rounded-md resize-none overflow-hidden"
                                value={formData.interests}
                                onChange={(e) => {
                                    setFormData({ ...formData, interests: e.target.value });
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                style={{ height: '56px' }}
                            />
                            <svg
                                className="absolute left-4 top-4 w-5 h-5 text-gray-400"
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
                            <textarea
                                id="skills"
                                className="w-full min-h-[56px] pl-12 pr-4 py-2 bg-white/80 backdrop-blur border-0 rounded-md resize-none overflow-hidden"
                                value={formData.skills}
                                onChange={(e) => {
                                    setFormData({ ...formData, skills: e.target.value });
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                style={{ height: '56px' }}
                            />
                            <svg
                                className="absolute left-4 top-4 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 5h16M4 12h16M4 19h16" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="wants_to_learn">What Do You Want to Learn?</Label>
                        <div className="relative">
                            <textarea
                                id="wants_to_learn"
                                className="w-full min-h-[56px] pl-12 pr-4 py-2 bg-white/80 backdrop-blur border-0 rounded-md resize-none overflow-hidden"
                                value={formData.wants_to_learn}
                                onChange={(e) => {
                                    setFormData({ ...formData, wants_to_learn: e.target.value });
                                    e.target.style.height = 'auto';
                                    e.target.style.height = e.target.scrollHeight + 'px';
                                }}
                                style={{ height: '56px' }}
                            />
                            <svg
                                className="absolute left-4 top-4 w-5 h-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path d="M4 5h16M4 12h16M4 19h16" strokeWidth="2" strokeLinecap="round" />
                            </svg>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gray-800 hover:bg-black text-white h-14 mt-12"
                    >
                        Save and Continue
                    </Button>
                </form>
            </div>
        </main>
    )
}

