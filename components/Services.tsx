"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Globe, Cpu, Lightbulb, Cloud } from "lucide-react";
import Image from "next/image";

const services = [
  {
    id: "01",
    title: "Web Development",
    subtitle: "MODERN & SCALABLE",
    description: "We build high-performance, responsive websites and web applications tailored to your business needs. Our team uses the latest technologies like Next.js, React, and Node.js to ensure speed, security, and scalability.",
    icon: <Globe className="w-12 h-12" />,
    color: "from-blue-500/20 to-cyan-500/20",
    accent: "text-blue-400",
    image: "/Web-development.png" // Using existing assets for placeholder
  },
  {
    id: "02",
    title: "Software Development",
    subtitle: "CUSTOM SOLUTIONS",
    description: "From ERP systems to custom automation tools, we develop robust software that solves complex business challenges. Our solutions are designed to optimize your internal workflows and drive operational efficiency.",
    icon: <Cpu className="w-12 h-12" />,
    color: "from-purple-500/20 to-pink-500/20",
    accent: "text-purple-400",
    image: "/sofrwareDevelopment.jpeg"
  },
  {
    id: "03",
    title: "IT Consulting",
    subtitle: "STRATEGIC GUIDANCE",
    description: "Navigate the digital landscape with confidence. Our consulting experts provide strategic roadmaps for technology adoption, infrastructure optimization, and long-term digital transformation to keep you ahead of the curve.",
    icon: <Lightbulb className="w-12 h-12" />,
    color: "from-amber-500/20 to-orange-500/20",
    accent: "text-amber-400",
    image: "/It-consult.jpeg"
  },
  {
    id: "04",
    title: "Cloud Solutions",
    subtitle: "SECURE & ACCESSIBLE",
    description: "Future-proof your business with our cloud expertise. We handle everything from cloud migration and serverless architecture to managed hosting, ensuring your data is secure, scalable, and always accessible.",
    icon: <Cloud className="w-12 h-12" />,
    color: "from-cyan-500/20 to-teal-500/20",
    accent: "text-cyan-400",
    image: "/cloude.jpeg"
  },
];

export default function Services() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeService = services[selectedIndex];

  return (
    <section id="services" className="py-2 bg-transparent relative overflow-hidden min-h-screen flex items-center">
      {/* Dynamic Background Glow */}
      <AnimatePresence mode="wait">
        <motion.div
           key={selectedIndex}
           initial={{ opacity: 0, scale: 0.8 }}
           animate={{ opacity: 1, scale: 1 }}
           exit={{ opacity: 0, scale: 1.1 }}
           transition={{ duration: 1 }}
           className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r ${activeService.color} rounded-full blur-[140px] -z-10`}
        />
      </AnimatePresence>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-24">
          
          {/* Left Side: Service Details (Top on Mobile) */}
          <div className="w-full lg:w-1/2 text-center lg:text-left min-h-[480px] lg:min-h-[550px] flex flex-col justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="max-w-xl mx-auto lg:mx-0"
              >
                <motion.div
                   initial={{ scale: 0.5, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 mb-6 sm:mb-8 ${activeService.accent}`}
                >
                  <Sparkles size={16} />
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] uppercase">{activeService.subtitle}</span>
                </motion.div>

                <h2 className="text-3xl sm:text-6xl font-black text-white mb-4 sm:mb-6 leading-tight uppercase">
                  {activeService.title}
                </h2>

                <p className="text-gray-400 text-sm sm:text-lg mb-8 sm:mb-10 leading-relaxed">
                  {activeService.description}
                </p>

        
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Side: Visual Representation (Bottom on Mobile) */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedIndex}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="relative w-full max-w-[450px] aspect-square group"
              >
                <div className="absolute inset-0 rounded-[32px] sm:rounded-[48px] border-2 border-white/10 p-2 sm:p-4">
                  <div className="w-full h-full rounded-[24px] sm:rounded-[38px] overflow-hidden relative border border-white/5 bg-[#0a0a0c]">
                    <Image
                       src={activeService.image}
                       alt={activeService.title}
                       fill
                       className="object-cover group-hover:scale-110 transition-transform duration-1000"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#020617]/20 to-[#020617]" />
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom Switcher: Compact Nav Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-6 pt-4 pb-6 sm:pb-0 px-4 sm:px-0">
          {services.map((service, index) => (
            <motion.button
              key={service.id}
              onClick={() => setSelectedIndex(index)}
              onMouseEnter={() => setSelectedIndex(index)}
              onTouchStart={() => setSelectedIndex(index)}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              className={`group relative p-3 sm:p-6 rounded-xl sm:rounded-2xl border transition-all duration-300 flex flex-col items-center gap-2 sm:gap-3 min-w-[100px] sm:min-w-[250px] flex-shrink-0 ${
                selectedIndex === index
                  ? "bg-white/10 border-primary border shadow-[0_0_20px_rgba(251,221,8,0.2)]"
                  : "bg-white/5 border-white/10 grayscale hover:grayscale-0 hover:border-white/30"
              }`}
            >
              <div className={`transition-colors duration-300 ${selectedIndex === index ? "text-primary" : "text-gray-400 group-hover:text-white"}`}>
                <div className="scale-75 sm:scale-110">
                  {service.icon}
                </div>
              </div>
              <span className={`text-[8px] sm:text-xs font-bold tracking-[0.15em] sm:tracking-widest ${selectedIndex === index ? "text-white" : "text-gray-500 group-hover:text-gray-300"}`}>
                {service.title.toUpperCase()}
              </span>
              
              {selectedIndex === index && (
                <motion.div
                  layoutId="activeServiceTab"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 sm:w-12 h-1 bg-primary rounded-full shadow-[0_0_10px_#fbdd08]"
                />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}
