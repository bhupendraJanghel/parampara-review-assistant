"use client";

import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { AlertCircle } from "lucide-react";
import { WelcomeScreen } from "./WelcomeScreen";
import { FeedbackInput } from "./FeedbackInput";
import { GeneratedReview } from "./GeneratedReview";

type Step = "WELCOME" | "INPUT" | "GENERATED";
type Tone = "Professional" | "Hinglish" | "Hindi" | "Simple";

const checkRateLimit = (): boolean => {
  if (typeof window === "undefined") return true;
  try {
    const now = Date.now();
    const stored = localStorage.getItem("parampara_generations");
    if (!stored) return true;

    const data = JSON.parse(stored);
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    if (now - data.date > ONE_DAY_MS) {
      return true; // Reset window has passed
    }

    if (data.count >= 5) {
      return false; // Daily limit reached
    }

    return true;
  } catch (e) {
    return true;
  }
};

const recordGeneration = () => {
  if (typeof window === "undefined") return;
  try {
    const now = Date.now();
    const stored = localStorage.getItem("parampara_generations");
    if (!stored) {
      localStorage.setItem("parampara_generations", JSON.stringify({ date: now, count: 1 }));
      return;
    }

    const data = JSON.parse(stored);
    const ONE_DAY_MS = 24 * 60 * 60 * 1000;

    if (now - data.date > ONE_DAY_MS) {
      localStorage.setItem("parampara_generations", JSON.stringify({ date: now, count: 1 }));
    } else {
      localStorage.setItem("parampara_generations", JSON.stringify({ date: data.date, count: data.count + 1 }));
    }
  } catch (e) {
    // Fail-silent
  }
};

export function ReviewFlow() {
  const [step, setStep] = useState<Step>("WELCOME");
  const [feedback, setFeedback] = useState("");
  const [generatedReview, setGeneratedReview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<Tone>("Simple");
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async (toneOverride?: Tone) => {
    if (!feedback.trim()) return;

    if (!checkRateLimit()) {
      setError("Daily generation limit reached (3 per day). Thank you for your support!");
      setTimeout(() => setError(null), 6000);
      return;
    }

    setIsGenerating(true);
    setError(null);

    const activeTone = typeof toneOverride === "string" ? toneOverride : tone;

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ feedback, tone: activeTone }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 429) {
          setError(`Usage limit exceeded. Please wait ${data.waitTime || 60} seconds.`);
        } else {
          setError(data.error || "Failed to generate review");
        }
        setTimeout(() => setError(null), 5000);
        return;
      }

      if (data.review) {
        recordGeneration();
        setGeneratedReview(data.review);
        setStep("GENERATED");
      }
    } catch (err) {
      console.error("Failed to generate review:", err);
      setError("Failed to connect. Please try again.");
      setTimeout(() => setError(null), 5000);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedReview);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const pageVariants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex-1 flex flex-col relative max-w-md mx-auto w-full h-[100dvh] overflow-hidden bg-brand-black">
      {/* Background gradients */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-gold-500/10 blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-gold-700/10 blur-[100px]" />
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 right-4 z-50 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium backdrop-blur-md flex items-start gap-3 shadow-lg"
          >
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p>{error}</p>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === "WELCOME" && (
          <motion.div
            key="welcome"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col"
          >
            <WelcomeScreen onStart={() => setStep("INPUT")} />
          </motion.div>
        )}

        {step === "INPUT" && (
          <motion.div
            key="input"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col overflow-y-auto"
          >
            <FeedbackInput
              feedback={feedback}
              setFeedback={setFeedback}
              onGenerate={handleGenerate}
              onBack={() => setStep("WELCOME")}
              isGenerating={isGenerating}
            />
          </motion.div>
        )}

        {step === "GENERATED" && (
          <motion.div
            key="generated"
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col overflow-y-auto"
          >
            <GeneratedReview
              generatedReview={generatedReview}
              tone={tone}
              setTone={setTone}
              onGenerate={() => handleGenerate()}
              onBack={() => setStep("INPUT")}
              onCopy={handleCopy}
              copied={copied}
              isGenerating={isGenerating}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
