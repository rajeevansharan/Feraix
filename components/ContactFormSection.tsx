"use client";

import { useState } from "react";
import { MapPin, Mail, Phone, Clock, Send, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/constants/animations";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    company: "",
    service: "",
    otherService: "",
    message: "",
    privacy: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
    if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email address";
    }
    if (!formData.service || formData.service === "Select a service...") {
      newErrors.service = "Please select a service";
    }
    if (formData.service === "Other" && !formData.otherService.trim()) {
      newErrors.otherService = "Please specify the service";
    }
    if (!formData.message.trim()) newErrors.message = "Message is required";
    if (!formData.privacy) newErrors.privacy = "Agreement is required";
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      setIsSubmitting(true);
      
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const data = await response.json();

        if (response.ok) {
          setIsSuccess(true);
          setFormData({
            firstName: "",
            lastName: "",
            email: "",
            company: "",
            service: "",
            otherService: "",
            message: "",
            privacy: false
          });
          // Auto-hide success message after 5 seconds
          setTimeout(() => setIsSuccess(false), 5000);
        } else {
          // Handle server-side errors
          setErrors({ submit: data.error || "Failed to send message. Please try again." });
        }
      } catch (err) {
        setErrors({ submit: "A network error occurred. Please check your connection." });
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <section id="contact-form" className="py-12 sm:py-24 bg-background selection:bg-primary selection:text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6">
        <motion.div 
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.1 }}
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-16"
        >
          
          {/* Contact Information */}
          <motion.div variants={fadeInUp} className="lg:col-span-5 h-full">
            <div className="p-6 sm:p-10 rounded-[24px] sm:rounded-[40px] bg-[#0B0F1A] border border-white/5 space-y-8 sm:space-y-10 h-full">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-10">Contact Information</h2>
              
              <motion.div variants={staggerContainer} className="space-y-8">
                {[
                  { icon: MapPin, title: "Office Location", content: "Feraix Global Technologies, Building 4, Dubai Internet City, PO Box 12345, Dubai, UAE" },
                  { icon: Mail, title: "Email Us", content: "General: hello@feraix.com Support: support@feraix.com" },
                  { icon: Phone, title: "Call Us", content: "Main: +971 4 123 4567 Sales: +971 4 123 4568" },
                  { icon: Clock, title: "Business Hours", content: "Monday - Friday: 9:00 AM - 6:00 PM (GST) Saturday - Sunday: Closed" }
                ].map((item, index) => (
                  <motion.div key={index} variants={fadeInUp} className="flex gap-6 group">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center border border-primary/20 shrink-0 group-hover:bg-primary transition-colors duration-500">
                      <item.icon className="w-6 h-6 text-primary group-hover:text-black transition-colors" />
                    </div>
                    <div>
                      <h3 className="text-white font-bold mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                      <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-line max-w-xs">
                        {item.content}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>

              <div className="pt-10 border-t border-white/5">
                <h3 className="text-white font-bold mb-6">Connect With Us</h3>
                <motion.div variants={staggerContainer} className="flex items-center gap-4">
                  {[
                    { sr: "LinkedIn", svg: "M19 0H5a5 5 0 0 0-5 5v14a5 5 0 0 0 5 5h14a5 5 0 0 0 5-5V5a5 5 0 0 0-5-5zM8 19H5V8h3v11zM6.5 6.732c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zM20 19h-3v-5.604c0-3.368-4-3.113-4 0V19h-3V8h3v1.765c1.396-2.586 7-2.777 7 2.476V19z" },
                    { sr: "X", svg: "M18.244 2H21.5l-7.5 8.57L22 22h-6.828l-5.35-6.91L3.5 22H.243l8.02-9.16L2 2h6.828l4.84 6.29L18.244 2zm-2.4 18h1.9L8.16 4h-2l9.684 16z" },
                    { sr: "Instagram", svg: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.919-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" }
                  ].map((social, idx) => (
                    <motion.div key={idx} variants={fadeInUp}>
                      <Link
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-primary hover:border-primary transition-all"
                      >
                        <span className="sr-only">{social.sr}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5 flex-shrink-0" fill="currentColor">
                          <path d={social.svg}/>
                        </svg>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="lg:col-span-7">
            <div className="p-6 sm:p-10 lg:p-12 rounded-[24px] sm:rounded-[40px] bg-[#0B0F1A] border border-white/5 h-full relative overflow-hidden">
              <AnimatePresence>
                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 z-50 bg-[#0B0F1A] flex flex-col items-center justify-center text-center p-8"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-6 border border-primary/20">
                      <CheckCircle2 size={40} className="text-primary" />
                    </div>
                    <h3 className="text-3xl font-bold text-white mb-4">Message Sent!</h3>
                    <p className="text-gray-400 max-w-sm">Thank you for reaching out. Our team will get back to you shortly.</p>
                    <button 
                      onClick={() => setIsSuccess(false)}
                      className="mt-8 text-primary font-bold hover:underline"
                    >
                      Send another message
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">Send a Message</h2>
              <p className="text-gray-500 text-sm mb-10">Fill out the form below and our team will get back to you within 24 hours.</p>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <motion.div variants={staggerContainer} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">First Name *</label>
                      <input 
                        type="text" 
                        placeholder="John" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className={`w-full bg-white/5 border ${errors.firstName ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors`} 
                      />
                      {errors.firstName && <p className="text-[10px] text-red-500 pl-1">{errors.firstName}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Last Name *</label>
                      <input 
                        type="text" 
                        placeholder="Doe" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className={`w-full bg-white/5 border ${errors.lastName ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors`} 
                      />
                      {errors.lastName && <p className="text-[10px] text-red-500 pl-1">{errors.lastName}</p>}
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Work Email *</label>
                      <input 
                        type="email" 
                        placeholder="john@company.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className={`w-full bg-white/5 border ${errors.email ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors`} 
                      />
                      {errors.email && <p className="text-[10px] text-red-500 pl-1">{errors.email}</p>}
                    </motion.div>
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Company Name</label>
                      <input 
                        type="text" 
                        placeholder="Your Company" 
                        value={formData.company}
                        onChange={(e) => setFormData({...formData, company: e.target.value})}
                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors" 
                      />
                    </motion.div>
                  </div>

                  <div className="grid grid-cols-1 gap-6">
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Service of Interest *</label>
                      <select 
                        value={formData.service}
                        onChange={(e) => setFormData({...formData, service: e.target.value})}
                        className={`w-full bg-[#0B0F1A] border ${errors.service ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-gray-400 text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer`}
                      >
                        <option>Select a service...</option>
                        <option>Web Development</option>
                        <option>Mobile Apps</option>
                        <option>AI Solutions</option>
                        <option>Cloud Infrastructure</option>
                        <option>Other</option>
                      </select>
                      {errors.service && <p className="text-[10px] text-red-500 pl-1">{errors.service}</p>}
                    </motion.div>

                    <AnimatePresence>
                      {formData.service === "Other" && (
                        <motion.div 
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="space-y-2 overflow-hidden"
                        >
                          <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Specify Service *</label>
                          <input 
                            type="text" 
                            placeholder="Please specify your service needs" 
                            value={formData.otherService}
                            onChange={(e) => setFormData({...formData, otherService: e.target.value})}
                            className={`w-full bg-white/5 border ${errors.otherService ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors`} 
                          />
                          {errors.otherService && <p className="text-[10px] text-red-500 pl-1">{errors.otherService}</p>}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div variants={fadeInUp} className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase tracking-widest pl-1">Your Message *</label>
                    <textarea 
                      rows={4} 
                      placeholder="Tell us about your project or inquiry..." 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className={`w-full bg-white/5 border ${errors.message ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-colors resize-none`}
                    ></textarea>
                    {errors.message && <p className="text-[10px] text-red-500 pl-1">{errors.message}</p>}
                  </motion.div>

                  <motion.div variants={fadeInUp} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <input 
                        type="checkbox" 
                        id="privacy" 
                        checked={formData.privacy}
                        onChange={(e) => setFormData({...formData, privacy: e.target.checked})}
                        className={`mt-1 w-4 h-4 rounded border ${errors.privacy ? 'border-red-500/50' : 'border-white/10'} bg-white/5 text-primary focus:ring-primary/50`} 
                      />
                      <label htmlFor="privacy" className="text-xs text-gray-500">I agree to the <Link href="#" className="text-primary hover:underline transition-all">Privacy Policy</Link> and consent to Feraix processing my personal data.</label>
                    </div>
                    {errors.privacy && <p className="text-[10px] text-red-500 pl-1">{errors.privacy}</p>}
                  </motion.div>

                  <AnimatePresence>
                    {errors.submit && (
                      <motion.p 
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-xs text-red-500 pl-1 font-semibold"
                      >
                        {errors.submit}
                      </motion.p>
                    )}
                  </AnimatePresence>

                  <motion.button 
                    variants={fadeInUp}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    disabled={isSubmitting}
                    type="submit" 
                    className={`w-fit flex items-center gap-3 font-bold rounded-full px-10 py-4 transition-all shadow-[0_0_15px_rgba(59,130,246,0.3)] 
                      ${isSubmitting ? 'bg-primary/50 text-black/50 cursor-not-allowed' : 'bg-primary text-black'}`}
                  >
                    {isSubmitting ? (
                      <>
                        Processing...
                        <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>

        </motion.div>
      </div>
    </section>
  );
}
