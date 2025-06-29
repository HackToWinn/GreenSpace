// components/Navbar.tsx
import Image from "next/image";
import { FloatingNav } from "@/components/ui/floating-navbar"; // Sesuaikan path jika berbeda

export default function Navbar() {
  // const navItems = [
  //   {
  //     name: "Home",
  //     link: "/",
  //   },
  //   {
  //     name: "About",
  //     link: "/about",
  //   },
  //   {
  //     name: "Features",
  //     link: "/features",
  //   },
  //   {
  //     name: "Contact",
  //     link: "/contact",
  //   },
  // ];

  return (
    <nav className="absolute top-0 left-0 right-0 z-50 w-full flex justify-between items-center p-4">
      <div className="flex items-center gap-x-1">
        <Image src={"/icons/favicon.png"} alt="GreenSpace Logo" width={32} height={32} className="w-8 md:w-10" />
        <h1 className="font-bold text-md md:text-xl">GreenSpace</h1>
      </div>
      {/* Todo: Add links */}
      <FloatingNav navItems={[]} />
    </nav>
  );
}