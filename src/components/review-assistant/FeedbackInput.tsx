"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Mic, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface FeedbackInputProps {
  feedback: string;
  setFeedback: (value: string) => void;
  onGenerate: () => void;
  onBack: () => void;
  isGenerating: boolean;
}

export function FeedbackInput({
  feedback,
  setFeedback,
  onGenerate,
  onBack,
  isGenerating
}: FeedbackInputProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<string[]>([]);

  const serviceChips = [
    "Wedding",
    "Birthday",
    "Engagement",
    "Anniversary",
    "Baby Shower",
    "Decor Items",
    "Festive Decor",
    "Corporate Event"
  ];

  const quickChips = [
    "Great Quality",
    "Huge Variety",
    "Beautiful Setup",
    "On Time",
    "Loved the Work",
    "Beautiful Shop",
    "Friendly Staff",
    "Neat & Clean",
    "Very Helpful",
    "Highly Recommend",
    "Good Prices",
    "Best in Bhilai"
  ];

  const handleChipClick = (chip: string, isService = false) => {
    let newFeedback = feedback.trim();
    const chipLower = chip.toLowerCase();

    if (isService) {
      if (selectedService === chip) {
        setSelectedService(null);
        newFeedback = newFeedback.replace(new RegExp(`^Visited for ${chipLower}[,.]?\\s*`, 'i'), '');
      } else {
        if (selectedService) {
          newFeedback = newFeedback.replace(new RegExp(`^Visited for ${selectedService.toLowerCase()}`, 'i'), `Visited for ${chipLower}`);
        } else {
          newFeedback = newFeedback ? `Visited for ${chipLower}, ${newFeedback}` : `Visited for ${chipLower}.`;
        }
        setSelectedService(chip);
      }
    } else {
      if (selectedDetails.includes(chip)) {
        // Remove
        setSelectedDetails(prev => prev.filter(c => c !== chip));
        // Remove from text: handles ", chip", "chip, ", or just "chip"
        const regex = new RegExp(`,?\\s*${chipLower}|${chipLower},?\\s*`, 'i');
        newFeedback = newFeedback.replace(regex, '').trim();
        // Clean up trailing commas or double spaces
        newFeedback = newFeedback.replace(/,\s*,/g, ',').replace(/^,|,$/g, '').trim();
      } else {
        // Add
        setSelectedDetails(prev => [...prev, chip]);
        if (!newFeedback) {
          newFeedback = chip;
        } else {
          newFeedback = `${newFeedback}${newFeedback.endsWith('.') ? '' : ','} ${chipLower}`;
        }
      }
    }

    // Final cleanup: uppercase first letter and ensure proper spacing
    newFeedback = newFeedback.charAt(0).toUpperCase() + newFeedback.slice(1);
    setFeedback(newFeedback);
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
          <div className="w-8 h-1 rounded-full bg-gold-500" />
          <div className="w-2 h-2 rounded-full bg-gold-500/30" />
          <div className="w-2 h-2 rounded-full bg-gold-500/30" />
        </div>
      </div>

      <div className="flex flex-col">
        <div className="space-y-6 pr-2 -mr-2 py-2">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
              Tell us about
              <br />
              your experience
            </h2>
          </div>

          {/* Chips Section */}
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-gold-500/60 font-bold px-1">
                What was the occasion?
              </p>
              <div className="flex flex-wrap gap-2">
                {serviceChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip, true)}
                    className={cn(
                      "px-4 py-1.5 rounded-full border transition-all active:scale-95 text-xs font-semibold",
                      selectedService === chip
                        ? "bg-gold-500 border-gold-500 text-brand-dark shadow-[0_0_15px_rgba(231,184,92,0.4)]"
                        : "border-gold-500/20 bg-gold-500/5 text-gold-400 hover:bg-gold-500/10"
                    )}
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/30 font-bold px-1">
                Add details
              </p>
              <div className="flex flex-wrap gap-2">
                {quickChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleChipClick(chip)}
                    className={cn(
                      "px-3 py-1.5 rounded-full transition-all active:scale-95 text-xs font-medium",
                      selectedDetails.includes(chip)
                        ? "bg-gold-500/20 border border-gold-500/60 text-gold-300 shadow-[0_0_10px_rgba(231,184,92,0.25)]"
                        : "glass-card text-white/70 hover:text-gold-400 hover:border-gold-500/40"
                    )}
                  >
                    {selectedDetails.includes(chip) ? "✓ " : "+ "} {chip}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="glass-card h-40 shrink-0 rounded-3xl p-5 flex flex-col relative group transition-all duration-300 focus-within:border-gold-500/40 focus-within:shadow-[0_8px_32px_rgba(231,184,92,0.1)]">
            <textarea
              ref={textareaRef}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value.slice(0, 200))}
              placeholder="Write a few lines about the event, decoration, team, your overall experience..."
              className="w-full flex-1 bg-transparent border-none outline-none resize-none text-white/90 placeholder:text-white/30 text-[16px] leading-relaxed"
            />

            <div className="flex items-center justify-between pt-3 mt-auto border-t border-white/5">
              <span className="text-[10px] font-medium text-white/40 uppercase tracking-tighter">
                {feedback.length} / 200 characters
              </span>
              <div className="flex gap-3">
                <button className="text-white/40 hover:text-white/80 transition-colors p-1">
                  <Mic className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-2 pb-2">

          <button
            onClick={onGenerate}
            disabled={!feedback.trim() || isGenerating}
            className="w-full bg-gradient-gold text-brand-dark font-semibold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-[0_4px_20px_rgba(231,184,92,0.25)] disabled:opacity-50 disabled:active:scale-100 disabled:shadow-none"
          >
            {isGenerating ? (
              <motion.div
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                Generating magic...
              </motion.div>
            ) : (
              <>
                Generate Reviews <Sparkles className="w-5 h-5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
