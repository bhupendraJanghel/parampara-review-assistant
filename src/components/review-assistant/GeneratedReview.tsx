"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw, X, Share2, Star, ClipboardCheck, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Tone = "Professional" | "Hinglish" | "Hindi" | "Simple";

interface GeneratedReviewProps {
  generatedReview: string;
  tone: Tone;
  setTone: (tone: Tone) => void;
  onGenerate: () => void;
  onBack: () => void;
  onCopy: () => void;
  isGenerating: boolean;
  isMock?: boolean;
}

export function GeneratedReview({
  generatedReview,
  tone,
  setTone,
  onGenerate,
  onBack,
  onCopy,
  isGenerating,
  isMock = false
}: GeneratedReviewProps) {
  const [showGuideModal, setShowGuideModal] = useState(false);

  const handlePostOnGoogle = () => {
    onCopy();
    setShowGuideModal(true);
  };

  const handleProceedToGoogle = () => {
    window.open("https://g.page/r/CTSHEWU8fEqNEBk/review", "_blank");
    setShowGuideModal(false);
  };

  return (
    <>
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
            {(["Professional", "Hinglish", "Hindi", "Simple"] as Tone[]).map((t) => (
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
                <span className={cn(
                  "text-[10px] font-medium uppercase tracking-widest",
                  isMock ? "text-amber-400 font-bold" : "text-white/40"
                )}>
                  {isMock ? "Mock Review (Local Run)" : "AI Generated Review"}
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
            Post Review <Share2 className="w-5 h-5" />
          </button>
        </div>
      </div>
      </div>

      <AnimatePresence>
        {showGuideModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGuideModal(false)}
              className="absolute inset-0 bg-brand-black/80 backdrop-blur-md"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-sm glass-card rounded-3xl border border-white/10 p-6 flex flex-col z-10 overflow-hidden"
            >
              {/* Background Glow */}
              <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] rounded-full bg-gold-500/10 blur-[50px] pointer-events-none" />

              {/* Close Button */}
              <button
                onClick={() => setShowGuideModal(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 active:scale-95 transition-all"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex flex-col items-center text-center mt-2">
                <div className="w-12 h-12 rounded-2xl bg-gold-500/10 border border-gold-500/20 flex items-center justify-center text-gold-400 mb-4 animate-pulse">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight">Review Copied!</h3>
                <p className="text-xs text-gray-400 mt-1 max-w-[240px]">
                  Please follow these 3 simple steps on the Google page:
                </p>
              </div>

              {/* Steps */}
              <div className="space-y-4 my-6 bg-white/5 rounded-2xl p-4 border border-white/5">
                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 text-xs font-bold shrink-0 mt-0.5">
                    1
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-white">Paste the Review</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">
                      Touch &amp; hold the review box, then tap <span className="text-gold-400 font-bold">&quot;Paste&quot;</span>.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 text-xs font-bold shrink-0 mt-0.5">
                    2
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-white">Select 5 Stars</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">
                      Tap the <span className="text-gold-400 font-semibold">last star</span> to rate us 5 stars.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 items-start">
                  <div className="w-5 h-5 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center text-gold-400 text-xs font-bold shrink-0 mt-0.5">
                    3
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-semibold text-white">Click Post</h4>
                    <p className="text-[11px] text-gray-400 mt-0.5 leading-normal">
                      Tap <span className="text-gold-400 font-bold">&quot;Post&quot;</span> or <span className="text-gold-400 font-bold">&quot;Submit&quot;</span>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={handleProceedToGoogle}
                className="w-full bg-gradient-gold text-brand-dark font-bold py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-[0_4px_20px_rgba(231,184,92,0.25)]"
              >
                Go to Google Page <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
