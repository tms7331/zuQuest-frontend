import Link from "next/link"
import { Home, Search, Repeat, Award } from 'lucide-react'

export function Footer() {
    return (
        <footer className="bg-white border-t sticky bottom-0 left-0 right-0">
            <nav className="flex justify-around p-4">
                <Link href="/" className="flex flex-col items-center text-[#3D8F8F]">
                    <Home className="w-6 h-6" />
                    <span className="text-sm">Start</span>
                </Link>
                <Link href="/quests" className="flex flex-col items-center text-[#3D8F8F]">
                    <Search className="w-6 h-6" />
                    <span className="text-sm">Quests</span>
                </Link>
                <Link href="/pools" className="flex flex-col items-center text-[#3D8F8F]">
                    <Repeat className="w-6 h-6" />
                    <span className="text-sm">Pools</span>
                </Link>
                <Link href="/quests" className="flex flex-col items-center text-[#3D8F8F]">
                    <Award className="w-6 h-6" />
                    <span className="text-sm">Rewards</span>
                </Link>
            </nav>
        </footer>
    )
}