import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: NextRequest) {
  try {
    const { feedback, tone } = await req.json();

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

    const systemPrompt = `You are a customer of 'Parampara Decor & Events', a luxury Indian wedding and decor shop. 
Your goal is to turn rough feedback into a natural, very short Google review.

Tone: ${tone}

Style Guidelines:
- Use simple, conversational Indian English (the way people actually talk in India).
- Keep it very brief: Exactly 2-3 short sentences.
- Make it sound like a real human wrote it on their phone, not a professional writer.
- Avoid big words or "marketing" language.
- If Tone is 'Hinglish', mix Hindi and English naturally (e.g., "Decor bohot sundar tha", "Service was very fast and accurate").
- If 'Emotional', mention happiness. If 'Simple', just be direct.
- No quotes. Just the text.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `System Instructions: ${systemPrompt}\n\nCustomer's rough feedback: "${feedback}"` }],
        },
      ],
    });

    const generatedText = response.text || "";

    return NextResponse.json({ review: generatedText.trim() });
  } catch (error: any) {
    console.error("Error generating review:", error);

    const isRateLimit = error?.status === 429 || error?.message?.includes("429");
    if (isRateLimit) {
      let waitTime = 60; // Default to 60 seconds
      try {
        const errorData = JSON.parse(error.message);
        const errorMessage = errorData?.error?.message?.toLowerCase() || "";
        const match = errorMessage.match(/wait (\d+) (second|minute|hour)/) || errorMessage.match(/try again in (\d+) (second|minute|hour)/);
        if (match) {
          const amount = parseInt(match[1], 10);
          const unit = match[2];
          if (unit === 'minute') waitTime = amount * 60;
          else if (unit === 'hour') waitTime = amount * 3600;
          else waitTime = amount;
        }
      } catch (e) {
        // Ignored
      }
      return NextResponse.json(
        { error: "Usage limit exceeded.", waitTime },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Failed to generate review" },
      { status: 500 }
    );
  }
}
