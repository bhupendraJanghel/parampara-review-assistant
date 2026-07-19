import { NextRequest, NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

function getRandomElement<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const EMOJIS = ["✨", "🌸", "🎉", "👍", "💕", "😎", "❤️", "😍", "🎊", "🌟", "💐", "🎀", "💖", "🤩", "🥂", "💯", "👏"];

function getRandomEmojis(count: number): string {
  const selected: string[] = [];
  for (let i = 0; i < count; i++) {
    selected.push(getRandomElement(EMOJIS));
  }
  return selected.join("");
}

function generateMockReview(feedback: string, tone: string): string {
  const hasDecor = /decor|stage|setup|flower|light|look|sundar|decoration/i.test(feedback);
  const hasStaff = /staff|service|team|management|behavior|nature|cooperative|people/i.test(feedback);

  const useEmojis = Math.random() < 0.6;
  const emojiStr = useEmojis ? " " + getRandomEmojis(Math.floor(Math.random() * 2) + 1) : "";

  let review = "";

  if (tone === "Professional") {
    const intros = [
      "Highly satisfied with the services provided by Parampara Decor & Events.",
      "Excellent service and execution by the team.",
      "We had a wonderful experience working with Parampara Decor.",
      "Outstanding professionalism and stunning decor for our event."
    ];
    const details: string[] = [];
    if (hasDecor) {
      details.push("The decoration was elegant, high-quality, and matched our vision perfectly.");
      details.push("The floral arrangements and stage design exceeded our expectations.");
    } else {
      details.push("The setup was handled professionally and with great attention to detail.");
      details.push("Everything was executed perfectly as per our specifications.");
    }
    if (hasStaff) {
      details.push("Their staff was extremely cooperative, polite, and punctual.");
      details.push("The team was responsive and managed the setup without any hassle.");
    } else {
      details.push("The entire process was smooth and well-managed from start to finish.");
      details.push("Their project coordination made the event stress-free.");
    }
    const outcomes = [
      "We highly recommend them for any luxury events.",
      "Truly a commendable effort by the entire team.",
      "Will definitely collaborate with them again for future events.",
      "A big thank you to the team for their dedication."
    ];

    const intro = getRandomElement(intros);
    const detail = getRandomElement(details);
    const outcome = getRandomElement(outcomes);
    review = `${intro} ${detail} ${outcome}`;
  } else if (tone === "Hindi") {
    const intros = [
      "परम्परा डेकोर का काम वाकई में बहुत ही बढ़िया और शानदार है।",
      "हमारे इवेंट की सजावट बहुत ही खूबसूरत और लाजवाब थी।",
      "टीम ने बहुत ही बेहतरीन काम किया है, हम बेहद खुश हैं।",
      "भिलाई में बेस्ट डेकोरेशन के लिए परम्परा डेकोर ही बेस्ट चॉइस है।"
    ];
    const details: string[] = [];
    if (hasDecor) {
      details.push("डेकोरेशन का हर एक कोना बहुत ही सुंदर और आकर्षक लग रहा था।");
      details.push("स्टेज और फूलों का काम सच में बहुत ही प्यारा और अलग था।");
    } else {
      details.push("तैयारी बहुत अच्छी थी और सब कुछ समय पर पूरा हो गया था।");
      details.push("बिना किसी परेशानी के सारा अरेंजमेंट बहुत ही बढ़िया तरीके से हुआ।");
    }
    if (hasStaff) {
      details.push("स्टाफ का व्यवहार बहुत ही सहयोगी और मिलनसार था।");
      details.push("पूरी टीम ने हमारा पूरा साथ दिया और बहुत मेहनत की।");
    } else {
      details.push("पूरी टीम ने पूरे दिल से काम किया और व्यवस्था लाजवाब थी।");
      details.push("उनकी सर्विस और क्वालिटी बहुत ही बढ़िया है।");
    }
    const outcomes = [
      "सभी मेहमानों ने काम की बहुत तारीफ की। बहुत-बहुत धन्यवाद!",
      "अगर आप भी कोई बड़ा इवेंट प्लान कर रहे हैं तो इन्हें जरूर मौका दें।",
      "परम्परा डेकोरेशन को हमारी तरफ से 5 स्टार रेटिंग!",
      "शानदार काम के लिए बहुत-बहुत धन्यवाद!"
    ];

    const intro = getRandomElement(intros);
    const detail = getRandomElement(details);
    const outcome = getRandomElement(outcomes);
    review = `${intro} ${detail} ${outcome}`;
  } else if (tone === "Hinglish") {
    const intros = [
      "Decor bohot hi sundar tha aur sab kuch time par ready ho gaya.",
      "Parampara events team ne kam bohot ache se handle kiya.",
      "Bohot hi pyara decoration tha, hume bohot pasand aaya.",
      "Bhilai me best wedding decor experience raha humara inke sath."
    ];
    const details: string[] = [];
    if (hasDecor) {
      details.push("Stage setup aur flower work bilkul perfect tha.");
      details.push("Decoration design was very unique and beautiful.");
    } else {
      details.push("Management was super smooth, koi dikkat nahi hui.");
      details.push("Pura setup time se pehle hi complete ho gaya tha.");
    }
    if (hasStaff) {
      details.push("Staff kafi helpful aur cooperative tha pura time.");
      details.push("Team members ka behaviour bohot polite aur supportive tha.");
    } else {
      details.push("Everything looked elegant, sabhi guests ne tareef ki.");
      details.push("Quality aur service dono hi ekdum premium thi.");
    }
    const outcomes = [
      "Highly recommended for wedding and decor in Bhilai!",
      "Thanks a lot for making our day so special.",
      "Definite recommendation from my side, go for it guys.",
      "Bina kisi tension ke aap inko book kar sakte hain."
    ];

    const intro = getRandomElement(intros);
    const detail = getRandomElement(details);
    const outcome = getRandomElement(outcomes);
    review = `${intro} ${detail} ${outcome}`;
  } else {
    // Simple tone
    const intros = [
      "Really happy with the decor and setup.",
      "Everything was beautifully done by the team.",
      "Great experience overall with Parampara Decor.",
      "Very neat decoration and professional work."
    ];
    const details: string[] = [];
    if (hasDecor) {
      details.push("The stage decor looked amazing and very neat.");
      details.push("Flowers and lighting setup was beautiful.");
    } else {
      details.push("The execution was neat and on time.");
      details.push("The team managed everything smoothly.");
    }
    if (hasStaff) {
      details.push("The staff was friendly and easy to work with.");
      details.push("They listened to our requirements and helped us a lot.");
    } else {
      details.push("All details were handled carefully.");
      details.push("Very good service and reliable management.");
    }
    const outcomes = [
      "Highly recommended.",
      "Thanks to the team for the good work.",
      "Would definitely recommend them to others.",
      "Overall, a great experience."
    ];

    const intro = getRandomElement(intros);
    const detail = getRandomElement(details);
    const outcome = getRandomElement(outcomes);
    review = `${intro} ${detail} ${outcome}`;
  }

  return review + emojiStr;
}

export async function POST(req: NextRequest) {
  try {
    const { feedback, tone } = await req.json();

    if (!feedback) {
      return NextResponse.json(
        { error: "Feedback is required" },
        { status: 400 }
      );
    }

    if (process.env.NODE_ENV === "development" || !process.env.GEMINI_API_KEY) {
      console.log(`[Local Run] Generating mock review (Tone: ${tone})`);
      const review = generateMockReview(feedback, tone);
      // Simulate slight delay for realistic loading feel in dev
      await new Promise((resolve) => setTimeout(resolve, 600));
      return NextResponse.json({ review, isMock: true });
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
  } catch (error: unknown) {
    console.error("Error generating review:", error);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const err = error as any;
    const isRateLimit = err?.status === 429 || err?.message?.includes("429");
    if (isRateLimit) {
      let waitTime = 60; // Default to 60 seconds
      try {
        const errorData = JSON.parse(err.message);
        const errorMessage = errorData?.error?.message?.toLowerCase() || "";
        const match = errorMessage.match(/wait (\d+) (second|minute|hour)/) || errorMessage.match(/try again in (\d+) (second|minute|hour)/);
        if (match) {
          const amount = parseInt(match[1], 10);
          const unit = match[2];
          if (unit === 'minute') waitTime = amount * 60;
          else if (unit === 'hour') waitTime = amount * 3600;
          else waitTime = amount;
        }
      } catch {
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
