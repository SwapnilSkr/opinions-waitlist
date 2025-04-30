"use client";

import AppBg from "@/components/AppBg";
import Image from "next/image";
import AppIcon from "@/public/appIcon.png";
import NumberPadSvg from "@/components/NumberPadSvg";
import ArrowSvg from "@/components/ArrowSvg";
import TickSvg from "@/components/TickSvg";
import Glow from "@/public/glow.png"
import { useState, FormEvent, useEffect } from "react";

export default function Home() {
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);
  
  // Handle loading with additional delay for transition
  useEffect(() => {
    // Set a timer to hide the loading screen after a reasonable time
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      // Add 1-second delay after loading completes before showing content
      const contentTimer = setTimeout(() => {
        setShowContent(true);
      }, 1000);
      
      return () => clearTimeout(contentTimer);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!mobileNumber.trim()) return;
    
    setSubmitting(true);
    
    const formData = new FormData();
    formData.append("mobile", mobileNumber);
    formData.append("access_key", "dc07a7dc-a1f6-400f-89a2-8673ecb9ae82");
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      });
      
      const data = await response.json();
      
      if (data.success) {
        setSubmitted(true);
        setMobileNumber("");
      } else {
        console.error("Error:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  const handleButtonClick = () => {
    if (mobileNumber.trim()) {
      document.getElementById('waitlistForm')?.dispatchEvent(
        new Event('submit', { cancelable: true, bubbles: true })
      );
    }
  };

  return (
    <div className="bg-[#000504] min-h-screen max-h-screen max-w-[100vw] overflow-hidden relative">
      {/* Loading overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-[#000504] z-[9999] flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <AppBg />
      <div className={`flex flex-col items-center justify-center py-[200px] relative transition-opacity duration-700 ${showContent ? 'opacity-100' : 'opacity-0'}`}>
        <Image 
          src={Glow} 
          alt="glow" 
          className="absolute top-0 left-0 w-full h-full object-cover" 
          priority
        />
        <div className="relative z-10">
          <Image src={AppIcon} alt="app icon" className="w-[160px] h-[160px] object-contain" />
        </div>
        <div className="relative w-full flex flex-col items-center">
          <h1 className="font-gilroy text-[36px] md:text-[84px] font-bold"
            style={{
              background: "linear-gradient(180deg, #FFF 0%, #D0FFF7 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            Your voice
          </h1>
          <h1 className="font-gilroy text-[36px] md:text-[84px] font-bold absolute md:top-[60px] top-[40px]"
            style={{
              background: "linear-gradient(180deg, #D0FFF7 0%, #6CFFE6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text"
            }}
          >
            is a currency
          </h1>
        </div>
        <form id="waitlistForm" onSubmit={handleSubmit} className="mt-[75px] waitlist-container font-jakarta max-w-[300px] md:max-w-[600px] w-full relative z-50">
          <div className="flex items-center justify-between w-full">
            <div className="input-container bg-[rgba(255, 255, 255, 0.01)] rounded-[0.5px] text-[16px] md:text-[20px] flex items-center relative w-[50%] md:w-[63%]">
              <div className="absolute left-3">
                <NumberPadSvg/>
              </div>
              <input 
                type="text" 
                name="mobile"
                id="mobileNumber"
                placeholder="mobile number" 
                className="bg-transparent text-white outline-none px-12 py-3 w-full cursor-text border border-[rgba(255, 255, 255, 0.80)]"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                disabled={submitting || submitted}
              />
            </div>
            <button 
              type="button" 
              onClick={handleButtonClick}
              className={`ml-4 bg-white text-black text-[16px] md:text-[20px] px-2 md:px-6 py-3 flex rounded-[1px] w-[45%] md:w-[35%] justify-center gap-2 md:gap-4 items-center font-bold cursor-pointer relative z-50 ${!mobileNumber.trim() || submitting || submitted ? 'opacity-50 pointer-events-none' : ''}`}
              disabled={!mobileNumber.trim() || submitting || submitted}
            >
              {submitting ? "Submitting..." : "join waitlist"}
              {!submitting && <ArrowSvg/>}
            </button>
          </div>
        </form>
        <div className="mt-[55px] flex items-center justify-center gap-4 font-jakarta text-[16px] md:text-[24px] font-[600]">
          {submitted && (
            <>
              <TickSvg/>
              <p className="text-[#71FF86]">you&apos;ve joined the waitlist!</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
