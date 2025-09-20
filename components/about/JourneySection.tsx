// "use client";

// import Image from "next/image";

// export default function JourneySection() {
//   return (
//     <section className="w-full py-16 px-6 sm:px-12 md:px-20 bg-[#C2B280]/10">
//       <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
//         {/* Left: Text Content */}
//         <div className="space-y-6 animate-slideUp">
//           <h2 className="text-3xl sm:text-4xl font-bold text-[#8B0000] relative inline-block">
//             My Journey
//             <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[#4B5320] rounded-full"></span>
//           </h2>

//           <p className="text-lg sm:text-xl text-[#000000] leading-relaxed">
//             My journey into software engineering started with a curiosity for how
//             systems work behind the scenes. Over the past 5 years, I’ve built impactful
//             solutions across data engineering, AI, and full-stack development.
//           </p>

//           <ul className="list-disc list-inside space-y-2 text-[#000000]">
//             <li className="animate-fadeIn delay-100">Designed and deployed <span className="font-semibold text-[#4B5320]">data pipelines</span> for analytics and ETL workflows.</li>
//             <li className="animate-fadeIn delay-200">Built <span className="font-semibold text-[#4B5320]">AI-powered applications</span> for predictive modeling and automation.</li>
//             <li className="animate-fadeIn delay-300">Developed and scaled <span className="font-semibold text-[#4B5320]">high-performance backend systems</span>.</li>
//             <li className="animate-fadeIn delay-400">Deployed <span className="font-semibold text-[#4B5320]">cloud-native platforms</span> on AWS and Kubernetes.</li>
//           </ul>
//         </div>

//         {/* Right: Illustration */}
//         <div className="flex justify-center items-center relative">
//           <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
//             <Image
//               src="/ani.svg"
//               alt="Journey Illustration"
//               fill
//               className="object-contain drop-shadow-xl animate-float"
//               priority
//             />
//           </div>
//         </div>
//       </div>

//       {/* Floating Animation */}
//       <style jsx>{`
//         @keyframes float {
//           0% { transform: translateY(0px); }
//           50% { transform: translateY(-12px); }
//           100% { transform: translateY(0px); }
//         }
//         .animate-float {
//           animation: float 4s ease-in-out infinite;
//         }
//       `}</style>
//     </section>
//   );
// }



"use client";

import Lottie from "lottie-react";
import journeyAnimation from "@/public/animations/developer1.json"// place your JSON file here

export default function JourneySection() {
  return (
    <section className="w-full py-16 px-6 sm:px-12 md:px-20 bg-[#C2B280]/10">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left: Text Content */}
        <div className="space-y-6 animate-slideUp">
          <h2 className="text-3xl sm:text-4xl font-bold text-[#8B0000] relative inline-block">
            My Journey
            <span className="absolute -bottom-2 left-0 w-16 h-1 bg-[#4B5320] rounded-full"></span>
          </h2>

          <p className="text-lg sm:text-xl text-[#000000] leading-relaxed">
            My journey into software engineering started with a curiosity for how
            systems work behind the scenes. Over the past 5 years, I’ve built impactful
            solutions across data engineering, AI, and full-stack development.
          </p>

          <ul className="list-disc list-inside space-y-2 text-[#000000]">
            <li className="animate-fadeIn delay-100">
              Designed and deployed{" "}
              <span className="font-semibold text-[#4B5320]">data pipelines</span> 
              for analytics and ETL workflows.
            </li>
            <li className="animate-fadeIn delay-200">
              Built{" "}
              <span className="font-semibold text-[#4B5320]">AI-powered applications</span> 
              for predictive modeling and automation.
            </li>
            <li className="animate-fadeIn delay-300">
              Developed and scaled{" "}
              <span className="font-semibold text-[#4B5320]">high-performance backend systems</span>.
            </li>
            <li className="animate-fadeIn delay-400">
              Deployed{" "}
              <span className="font-semibold text-[#4B5320]">cloud-native platforms</span> 
              on AWS and Kubernetes.
            </li>
          </ul>
        </div>

        {/* Right: Lottie Illustration */}
        <div className="flex justify-center items-center relative">
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96">
            <Lottie 
              animationData={journeyAnimation} 
              loop={true} 
              className="w-full h-full drop-shadow-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
