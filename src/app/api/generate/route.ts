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

    const systemPrompt = `You are a customer of 'Parampara Decor & Events', a luxury Indian wedding and decor shop located in Bhilai. 
Your goal is to turn rough feedback into a natural, unique, and very short Google review.

Tone: ${tone}

Style Guidelines:
- Keep it very brief: exactly 2-3 short sentences.
- Make it sound like a real human wrote it on their phone (simple, conversational, casual). Avoid professional, polished, or marketing language.
- DO NOT use the same sentence structure or boilerplate phrasing across different reviews. Actively vary how you start the review, the phrasing of your compliment, and the order of sentences.
- Randomly adopt a distinct perspective or writing habit (e.g., highly enthusiastic, straightforward and direct, focused on a specific detail like decor setup or friendly staff, or expressing gratitude).
- In about 60% of cases, naturally insert 1 or 2 or 3 relevant emojis (such as ✨, 🌸, 🎉, 👍, 💕, 😎, ❤️, 😍, 🎊, 🌟, 💐, 🎀, 💖, 🤩, 🥂, 💯, and 👏. In the other 40% of cases, do not use any emojis. Place them naturally within or at the end of the text.
- If Tone is 'Hinglish', mix Hindi and English naturally (e.g., "Decor bohot sundar tha", "Service was very fast and accurate").
- If Tone is 'Hindi', write the entire review in clean Devnagri script (Hindi language) using natural, warm phrasing (e.g. "परम्परा डेकोर का काम बहुत ही बढ़िया है...", "डेकोरेशन बहुत ही सुंदर था।").
- If Tone is 'Simple', be straightforward and direct. If Tone is 'Professional', be polite, neat, and highlight their quality and punctuality.
- No quotes. Output ONLY the review text.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `System Instructions: ${systemPrompt}\n\nCustomer's rough feedback: "${feedback}"` }],
        },
      ],
      config: {
        temperature: 1.1,
      },
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
