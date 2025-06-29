import Container from "@/components/Container";
import FeatureSection from "@/components/FeatureSection";
import { GridBackgroundDemo } from "@/components/GridBackground";
import Navbar from "@/components/Navbar";
import { BackgroundBeams } from "@/components/BackgroundBeams";
import Image from "next/image";
import Link from "next/link";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="w-full font-[family-name:var(--font-jakarta-sans)]">
      <Navbar />
      <GridBackgroundDemo />
      <div className="relative">
        <Container>
          <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-8 lg:gap-12">
            <div className="w-full lg:w-1/2 order-2 lg:order-1 z-10">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-gray-900 font-bold mb-4 text-center lg:text-left">
                What is GreenSpace?
              </h1>
              <p className="text-xs sm:text-sm lg:text-xl text-center text-gray-600 lg:text-left leading-relaxed">
                GreenSpace is a mobile application designed to help you live more sustainably
                by connecting you with nature through technology. With features like AI-powered environment identification, eco-friendly tips,
                and habit tracking, GreenSpace empowers individuals to make small changes that lead to a greener, healthier planet.
              </p>
            </div>
            <div className="w-full lg:w-1/2 order-1 lg:order-2 flex justify-center z-10">
              <div className="max-w-sm sm:max-w-md lg:max-w-full">
                <Image
                  src={'/images/mockup2.png'}
                  alt="Mockup"
                  width={1200}
                  height={1200}
                  className="w-full h-auto "
                />
              </div>
            </div>
          </div>
          <BackgroundBeams className="z-0" />
        </Container>
      </div>
      <Container>
        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-18 py-6 sm:py-8 lg:py-4 flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 lg:gap-x-5 bg-gradient-to-r from-violet-500 to-indigo-700 rounded-2xl sm:rounded-3xl lg:rounded-4xl">
          <div className="w-full lg:w-1/2 order-1 lg:order-1 flex justify-center lg:justify-start">
            <div className="max-w-xs sm:max-w-sm lg:max-w-full">
              <Image
                src={'/icons/internet-computer-icp-logo.png'}
                alt="Internet Computer Logo"
                width={300}
                height={400}
                className="w-full h-auto max-w-[200px] sm:max-w-[250px] lg:max-w-[300px]"
              />
            </div>
          </div>
          <div className="w-full lg:w-auto order-2 lg:order-2 text-center lg:text-left">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl text-gray-100 font-bold mb-3 sm:mb-4">
              Powered by Internet Computer
            </h2>
            <p className="text-xs sm:text-sm lg:text-xl text-gray-100 mb-4 sm:mb-6 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              GreenSpace is built on the Internet Computer blockchain, a decentralized platform for building decentralized applications.
            </p>
            <Link href="https://internetcomputer.org/" target="_blank">
              <button className="bg-white font-semibold text-indigo-700 px-4 sm:px-6 py-2 sm:py-3 rounded-full mt-2 sm:mt-4 hover:bg-indigo-700 hover:text-white hover:cursor-pointer transition duration-300 ease-in-out text-sm sm:text-base">
                Learn More
              </button>
            </Link>
          </div>
        </div>
      </Container>
      <Container>
        <FeatureSection />
      </Container>
      <Footer />
    </div>
  );
}
