import Image from "next/image";

export default function FeatureSection() {
  return (
    <>
      <div className="text-center mb-8 sm:mb-12 lg:mb-16">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 font-bold mb-3 sm:mb-4 lg:mb-6">
          Discover Our Features
        </h1>
        <p className="text-xs sm:text-sm lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
          Explore powerful tools designed to help you live sustainably
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
        <div className="bg-[#0F2612] rounded-3xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-0 flex flex-col gap-y-3 sm:gap-y-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-bold">
            Decentralized AI for Reporting
          </h2>
          <p className="text-xs sm:text-sm lg:text-md text-gray-200 mb-3 sm:mb-4 leading-relaxed">
            Powered by Decentralized AI, GreenSpace enables users to report environmental issues with photos, which are instantly analyzed along with real-time location to provide insights and predict potential risks.
          </p>
          <div className="flex justify-end">
            <Image
              src={'/images/feature_img1.png'}
              alt="Feature Image 1"
              width={600}
              height={600}
              className="w-full max-w-[420px] sm:max-w-[550px] lg:max-w-[600px] h-auto object-cover"
            />
          </div>
        </div>

        <div className="bg-[#0F2612] rounded-3xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-0 flex flex-col gap-y-3 sm:gap-y-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-bold">
            Report&apos;s Hub
          </h2>
          <p className="text-xs sm:text-sm lg:text-md text-gray-200 mb-3 sm:mb-4 leading-relaxed">
            A real-time, community-driven hub that collects, summarizes, and visualizes decentralized environmental reports. Users can view updates, add comments, and track local impact using live location-based insights.
          </p>
          <div className="flex justify-end">
            <Image
              src={'/images/feature_img2.png'}
              alt="Feature Image 2"
              width={1200}
              height={1200}
              className="w-full max-w-[420px] sm:max-w-[550px] lg:max-w-[600px] h-auto object-cover"
            />
          </div>
        </div>

        <div className="bg-[#0F2612] rounded-3xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-0 flex flex-col gap-y-3 sm:gap-y-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-bold">
            Trends Metrics for Analytics
          </h2>
          <p className="text-xs sm:text-sm lg:text-md text-gray-200 mb-3 sm:mb-4 leading-relaxed">
            Monitor real-time environmental trends powered by decentralized user reports. This dashboard visualizes daily, weekly, and monthly metrics such as air and water pollution, enabling smarter decisions through transparent and community-driven data.
          </p>
          <div className="flex justify-end">
            <Image
              src={'/images/feature_img3.png'}
              alt="Feature Image 3"
              width={600}
              height={600}
              className="w-full max-w-[420px] sm:max-w-[550px] lg:max-w-[600px] h-auto object-cover"
            />
          </div>
        </div>

        <div className="bg-[#0F2612] rounded-3xl px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-0 flex flex-col gap-y-3 sm:gap-y-4">
          <h2 className="text-lg sm:text-xl lg:text-2xl text-gray-100 font-bold">
            Rewards
          </h2>
          <p className="text-xs sm:text-sm lg:text-md text-gray-200 mb-3 sm:mb-4 leading-relaxed">
            Earn crypto rewards like ICP by completing daily eco-actions. Connect your Web3 wallet to track balance, redeem exclusive items, and celebrate your environmental impact.
          </p>
          <div className="flex justify-end">
            <Image
              src={'/images/feature_img4.png'}
              alt="Feature Image 4"
              width={600}
              height={600}
              className="w-full max-w-[420px] sm:max-w-[550px] lg:max-w-[600px] h-auto object-cover"
            />
          </div>
        </div>
      </div>
    </>
  )
}