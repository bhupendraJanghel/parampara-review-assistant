"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-between p-8 z-10">
      <div className="flex-1 flex flex-col items-center justify-center space-y-10 w-full mt-12">
        <div className="relative">
          <div className="absolute inset-0 bg-gold-500/20 blur-[50px] rounded-full" />
          <div className="w-28 h-28 flex items-center justify-center relative z-10 overflow-hidden rounded-full">
            <img
              src="/images/logo.png"
              alt="Parampara Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-4xl font-serif text-gradient-gold -z-10">P</span>
          </div>
        </div>

        <div className="text-center space-y-3">
          <h2 className="text-sm tracking-[0.3em] text-gold-400 uppercase font-medium">
            Parampara
          </h2>
          <h3 className="text-[10px] tracking-[0.2em] text-gray-500 uppercase">
            Decor & Events
          </h3>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold tracking-tight">
            Parampara
            <br />
            <span className="text-gradient-gold">Review Assistant</span>
          </h1>
          <p className="text-gray-400 text-sm max-w-[250px] mx-auto leading-relaxed">
            Share your experience and help us spread happiness!
          </p>
        </div>
      </div>

      <div className="w-full space-y-8 pb-4">
        <button
          onClick={onStart}
          className="w-full bg-gradient-gold text-brand-dark font-semibold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-[0_4px_20px_rgba(231,184,92,0.25)]"
        >
          Get Started
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center space-y-3">
          <span className="text-xs text-gray-500 font-medium">Trusted by 500+ Happy Clients</span>
          <div className="flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-brand-black bg-brand-card flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="avatar" className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <svg key={i} className="w-4 h-4 text-gold-500 fill-current" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
