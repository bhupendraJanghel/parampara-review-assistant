"use client";

import { motion } from "framer-motion";
import { Check, Copy, RefreshCw, X, Share2, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "Professional" | "Emotional" | "Hinglish" | "Simple";

interface GeneratedReviewProps {
  generatedReview: string;
  tone: Tone;
  setTone: (tone: Tone) => void;
  onGenerate: () => void;
  onBack: () => void;
  onCopy: () => void;
  copied: boolean;
  isGenerating: boolean;
}

export function GeneratedReview({
  generatedReview,
  tone,
  setTone,
  onGenerate,
  onBack,
  onCopy,
  copied,
  isGenerating
}: GeneratedReviewProps) {
  const handlePostOnGoogle = () => {
    onCopy();
    window.open("https://g.page/r/CTSHEWU8fEqNEBk/review", "_blank");
  };

  return (
    <div className="flex-1 flex flex-col p-6 z-10">
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={onBack}
          className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gold-400 active:scale-95 transition-transform"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="flex gap-2 items-center">
          <div className="w-2 h-2 rounded-full bg-gold-500/30" />
          <div className="w-2 h-2 rounded-full bg-gold-500/30" />
          <div className="w-8 h-1 rounded-full bg-gold-500" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="space-y-6 pr-2 -mr-2 py-2">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
              Your Review
              <br />
              is Ready!
            </h2>
            <p className="text-gray-400 text-sm">
              Choose a tone that fits your style.
            </p>
          </div>

          {/* Tone Selection */}
          <div className="flex flex-wrap gap-2">
            {(["Professional", "Emotional", "Hinglish", "Simple"] as Tone[]).map((t) => (
              <button
                key={t}
                onClick={() => {
                  setTone(t);
                }}
                className={cn(
                  "px-4 py-2 rounded-full border transition-all active:scale-95 text-xs font-semibold",
                  tone === t
                    ? "bg-gold-500 border-gold-500 text-brand-dark shadow-[0_0_15px_rgba(231,184,92,0.4)]"
                    : "border-gold-500/20 bg-gold-500/5 text-gold-400 hover:bg-gold-500/10"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative group min-h-[180px]">
            <div className="absolute inset-0 bg-gold-500/10 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className={cn(
              "relative h-full glass-card rounded-3xl p-6 border border-white/10 transition-all duration-300",
              isGenerating && "opacity-50"
            )}>
              {isGenerating && (
                <div className="absolute inset-0 flex items-center justify-center z-20">
                  <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}

              <div className="flex items-center gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-gold-500 fill-current" />
                ))}
              </div>

              <p className="text-white/90 text-lg leading-relaxed font-medium">
                {generatedReview}
              </p>

              <div className="flex items-center justify-between mt-6 pt-4 border-t border-white/5">
                <span className="text-[10px] font-medium text-white/40 uppercase tracking-widest">
                  AI Generated Review
                </span>
                <div className="flex gap-2">
                  <button
                    onClick={() => onGenerate()}
                    disabled={isGenerating}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors active:scale-95 disabled:opacity-50"
                  >
                    <RefreshCw className={cn("w-4 h-4", isGenerating && "animate-spin")} />
                    Refresh
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pb-6 pt-4">
          <button
            onClick={handlePostOnGoogle}
            className="w-full bg-gradient-gold text-brand-dark font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-[0_4px_20px_rgba(231,184,92,0.25)]"
          >
            {copied ? (
              <>
                Copied! Opening Google... <Check className="w-5 h-5" />
              </>
            ) : (
              <>
                Post Review <Share2 className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
