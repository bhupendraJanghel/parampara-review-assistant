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
- If 'Luxury', mention quality. If 'Emotional', mention happiness. If 'Simple', just be direct.
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
  } catch (error) {
    console.error("Error generating review:", error);
    return NextResponse.json(
      { error: "Failed to generate review" },
      { status: 500 }
    );
  }
}
