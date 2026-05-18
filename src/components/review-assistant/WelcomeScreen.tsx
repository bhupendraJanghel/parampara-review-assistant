"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

export function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex-1 flex flex-col items-center justify-start pt-16 p-6 z-10 space-y-12">
      <div className="flex flex-col items-center space-y-6 w-full">
        <div className="relative">
          <div className="absolute inset-0 bg-gold-500/20 blur-[50px] rounded-full" />
          <div className="w-44 h-44 flex items-center justify-center relative z-10 overflow-hidden rounded-full">
            <img
              src="/images/parampara-logo.png"
              alt="Parampara Logo"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
            <span className="absolute inset-0 flex items-center justify-center text-6xl font-serif text-gradient-gold -z-10">P</span>
          </div>
        </div>

        <div className="text-center space-y-2">
          <h2 className="text-2xl tracking-[0.3em] text-gold-400 uppercase font-medium">
            Parampara
          </h2>
          <h3 className="text-[15px] tracking-[0.2em] text-gray-500 uppercase">
            Decor & Events
          </h3>
        </div>

        <div className="text-center space-y-2">
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

      <div className="w-full space-y-6 pb-2">
        <button
          onClick={onStart}
          className="w-full bg-gradient-gold text-brand-dark font-semibold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-[0_4px_20px_rgba(231,184,92,0.25)]"
        >
          Get Started
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex flex-col items-center space-y-3 pt-2">
          <span className="text-[10px] uppercase tracking-[0.25em] text-gold-500/60 font-bold">3 Easy Steps</span>
          <div className="flex items-start justify-between w-full max-w-[280px] text-[10px] text-gray-400 font-medium">
            <div className="flex flex-col items-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 text-xs font-bold">1</div>
              <span className="tracking-wide">Select Tags</span>
            </div>
            <div className="w-6 h-px bg-gold-500/20 self-start mt-3" />
            <div className="flex flex-col items-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 text-xs font-bold">2</div>
              <span className="tracking-wide">Pick a Tone</span>
            </div>
            <div className="w-6 h-px bg-gold-500/20 self-start mt-3" />
            <div className="flex flex-col items-center space-y-1">
              <div className="w-6 h-6 rounded-full bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 text-xs font-bold">3</div>
              <span className="tracking-wide">Post Review</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
