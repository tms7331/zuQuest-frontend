import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#E5F2F2] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md text-center mb-12">
        <h1 className="text-2xl md:text-4xl font-serif tracking-wider">ZUQUESTS</h1>
      </div>

      <div className="w-full max-w-md space-y-8">
        <div className="relative h-64 md:h-80">
          <Image
            src="/LandingPagePhone.png?height=400&width=400"
            alt="Illustration of a person with a phone"
            fill
            className="object-contain"
            priority
          />
        </div>

        <div className="flex justify-center gap-2 py-4">
          <div className="w-8 h-2 rounded-full bg-[#3D8F8F]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
          <div className="w-2 h-2 rounded-full bg-gray-300"></div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Join a Quest
          </h2>
          <p className="text-gray-500 text-lg md:text-xl max-w-sm mx-auto">
            Explore challenges that match your interest and goals.  Pick a quest, complete it, and grow!
          </p>
        </div>

        <div className="flex justify-between items-center pt-8 w-full px-4">
          <Button
            variant="ghost"
            className="text-[#3D8F8F] hover:text-[#2D7A7A] hover:bg-[#E5F2F2]"
            asChild
          >
            <Link href="/loginwristband">Skip</Link>
          </Button>
          <Button
            className="bg-[#3D8F8F] hover:bg-[#2D7A7A] text-white px-8 py-2 rounded-full"
            asChild
          >
            <Link href="/entry1fund">Next</Link>
          </Button>
        </div>
      </div>
    </main>
  )
}


