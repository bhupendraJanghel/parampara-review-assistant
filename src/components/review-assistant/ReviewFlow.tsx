"use client";

import { useState } from "react";
import { AnimatePresence, motion, Variants } from "framer-motion";
import { WelcomeScreen } from "./WelcomeScreen";
import { FeedbackInput } from "./FeedbackInput";
import { GeneratedReview } from "./GeneratedReview";

type Step = "WELCOME" | "INPUT" | "GENERATED";
type Tone = "Professional" | "Emotional" | "Hinglish" | "Simple";

export function ReviewFlow() {
  const [step, setStep] = useState<Step>("WELCOME");
  const [feedback, setFeedback] = useState("");
  const [generatedReview, setGeneratedReview] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [tone, setTone] = useState<Tone>("Simple");

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

  const pageVariants: Variants = {
    initial: { opacity: 0, y: 20, scale: 0.95 },
    animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
    exit: { opacity: 0, y: -20, scale: 0.95, transition: { duration: 0.3 } }
  };

  return (
    <div className="flex-1 flex flex-col relative max-w-md mx-auto w-full h-[100dvh] overflow-y-auto bg-brand-black">
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
            className="flex-1 flex flex-col"
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
            className="flex-1 flex flex-col"
          >
            <GeneratedReview
              generatedReview={generatedReview}
              tone={tone}
              setTone={setTone}
              onGenerate={handleGenerate}
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
