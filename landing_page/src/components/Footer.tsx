import Image from "next/image"

export default function Footer() {
  return (
    <footer className="w-full p-4">
      <div className="py-4 flex flex-col sm:flex-row justify-between items-center gap-y-4 border-t border-gray-200">
        <div className="flex items-center gap-x-1">
          <Image src={"/icons/favicon.png"} alt="GreenSpace Logo" width={32} height={32} className="w-8 md:w-10" />
          <h1 className="font-bold text-md md:text-xl">GreenSpace</h1>
        </div>
        <p className="text-xs md:text-md text-gray-600">© 2025 HackToWin. All rights reserved.</p>
      </div>
    </footer>
  )
}