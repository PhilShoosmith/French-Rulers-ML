import { GoogleGenAI } from "@google/genai";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const apiKey = process.env.GEMINI_API_KEY || process.env.API_KEY;
    if (!apiKey) {
      return res.status(500).json({ error: "API key not configured. Access to the Gemini API was denied." });
    }

    const ai = new GoogleGenAI({ apiKey });
    const { prompt, targetLanguage } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        tools: [{googleSearch: {}}],
      },
    });

    const groundingChunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || null;

    res.status(200).json({
      text: response.text,
      groundingChunks
    });
  } catch (error: any) {
    console.error("Gemini API error:", error);
    res.status(error.status || 500).json({ error: error.message || "Failed to generate content" });
  }
}
