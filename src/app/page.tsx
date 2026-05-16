"use client";

import { useState, useRef, useEffect } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { Sparkles, Mic, Copy, Check, ChevronRight, X, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "WELCOME" | "INPUT" | "GENERATED";
type Tone = "Professional" | "Emotional" | "Luxury" | "Simple";

export default function Home() {
  const [step, setStep] = useState<Step>("WELCOME");
  const [feedback, setFeedback] = useState("");
  const [generatedReview, setGeneratedReview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<Tone>("Luxury");

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (step === "INPUT" && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [step]);

  const handleGenerate = async () => {
    if (!feedback.trim()) return;
    setIsGenerating(true);
    
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, tone }),
      });
      
      const data = await response.json();
      if (data.review) {
        setGeneratedReview(data.review);
        setStep("GENERATED");
      }
    } catch (error) {
      console.error("Failed to generate review:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePostOnGoogle = () => {
    // Replace with actual Google Review link
    window.open("https://search.google.com/local/writereview?placeid=YOUR_PLACE_ID", "_blank");
  };

  // Shared animation variants
  const pageVariants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <main className="flex-1 flex flex-col relative max-w-md mx-auto w-full h-[100dvh] overflow-hidden bg-brand-black">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gold-700/10 blur-[100px]" />
      </div>

      <AnimatePresence mode="wait">
        {step === "WELCOME" && (
          <motion.div
            key="welcome"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col items-center justify-between p-8 z-10"
          >
            <div className="flex-1 flex flex-col items-center justify-center space-y-10 w-full mt-12">
              <div className="relative">
                <div className="absolute inset-0 bg-gold-500/20 blur-[50px] rounded-full" />
                <div className="w-24 h-24 border border-gold-500/30 rounded-xl flex items-center justify-center relative z-10 bg-brand-black shadow-[0_0_30px_rgba(231,184,92,0.15)]">
                  {/* Luxury Monogram Logo Placeholder */}
                  <span className="text-4xl font-serif text-gradient-gold">P</span>
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
                onClick={() => setStep("INPUT")}
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
                        <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="avatar" className="w-full h-full object-cover" />
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
          </motion.div>
        )}

        {step === "INPUT" && (
          <motion.div
            key="input"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col p-6 z-10"
          >
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setStep("WELCOME")}
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

            <div className="space-y-6 flex-1 flex flex-col">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
                  Tell us about
                  <br />
                  your experience
                </h2>
              </div>

              <div className="glass-card flex-1 rounded-3xl p-5 flex flex-col relative group transition-all duration-300 focus-within:border-gold-500/40 focus-within:shadow-[0_8px_32px_rgba(231,184,92,0.1)]">
                <textarea
                  ref={textareaRef}
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value.slice(0, 500))}
                  placeholder="Write a few lines about the event, decoration, team, your overall experience..."
                  className="w-full flex-1 bg-transparent border-none outline-none resize-none text-white/90 placeholder:text-white/30 text-[17px] leading-relaxed"
                />
                
                <div className="flex items-center justify-between pt-4 mt-auto border-t border-white/5">
                  <span className="text-xs font-medium text-white/40">
                    {feedback.length} / 500
                  </span>
                  <div className="flex gap-3">
                    <button className="text-white/40 hover:text-white/80 transition-colors p-2">
                      <Mic className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="pb-4">
                <button
                  onClick={handleGenerate}
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
          </motion.div>
        )}

        {step === "GENERATED" && (
          <motion.div
            key="generated"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col p-6 z-10"
          >
            <div className="flex items-center justify-between mb-8">
              <button 
                onClick={() => setStep("INPUT")}
                className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-gold-400 active:scale-95 transition-transform"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="flex gap-2 items-center">
                <div className="w-8 h-1 rounded-full bg-gold-500/30" />
                <div className="w-6 h-1 rounded-full bg-gold-500" />
                <div className="w-2 h-2 rounded-full bg-gold-500/30" />
              </div>
            </div>

            <div className="space-y-6 flex-1 flex flex-col">
              <h2 className="text-3xl font-bold tracking-tight text-white leading-tight">
                Choose your
                <br />
                favorite review
              </h2>

              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide -mx-2 px-2">
                {(["Luxury", "Professional", "Emotional", "Simple"] as Tone[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => {
                      setTone(t);
                      handleGenerate(); // re-generate with new tone
                    }}
                    className={cn(
                      "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                      tone === t
                        ? "bg-gold-500 text-brand-dark"
                        : "glass-card text-white/70"
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <div className="glass-card-gold flex-1 rounded-3xl p-6 flex flex-col relative group overflow-hidden">
                {isGenerating ? (
                  <div className="flex-1 flex flex-col gap-3 pt-2">
                    <div className="h-4 bg-white/5 rounded-full w-full animate-pulse" />
                    <div className="h-4 bg-white/5 rounded-full w-[90%] animate-pulse" />
                    <div className="h-4 bg-white/5 rounded-full w-[95%] animate-pulse" />
                    <div className="h-4 bg-white/5 rounded-full w-[80%] animate-pulse" />
                    <div className="h-4 bg-white/5 rounded-full w-[85%] animate-pulse" />
                  </div>
                ) : (
                  <motion.div 
                    initial={{ opacity: 0 }} 
                    animate={{ opacity: 1 }} 
                    className="flex-1 overflow-y-auto pr-2 text-[16px] leading-relaxed text-white/90 font-light"
                  >
                    {generatedReview}
                  </motion.div>
                )}

                <div className="flex items-center justify-between pt-5 mt-4 border-t border-gold-500/20">
                  <span className="text-xs font-medium text-white/40">
                    {generatedReview.length} chars
                  </span>
                  <div className="flex gap-2">
                    <button 
                      onClick={handleGenerate}
                      disabled={isGenerating}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 text-white/80 text-sm font-medium hover:bg-white/10 transition-colors active:scale-95 disabled:opacity-50"
                    >
                      <RefreshCw className={cn("w-4 h-4", isGenerating && "animate-spin")} />
                    </button>
                    <button 
                      onClick={handleCopy}
                      disabled={isGenerating}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gold-500/10 text-gold-400 text-sm font-medium hover:bg-gold-500/20 transition-colors active:scale-95 disabled:opacity-50"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? "Copied" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>

              <div className="pb-4">
                <button
                  onClick={handlePostOnGoogle}
                  className="w-full bg-gradient-gold text-brand-dark font-semibold text-lg py-4 rounded-2xl flex items-center justify-center gap-2 active:scale-[0.98] transition-transform shadow-[0_4px_20px_rgba(231,184,92,0.25)]"
                >
                  Post on Google <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
