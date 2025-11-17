import OpenAI from "openai";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });

    const { prompt } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: "Prompt kosong" });
    }

    const result = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "user", content: prompt }
      ]
    });

    res.status(200).json({
      result: result.choices[0].message.content
    });

  } catch (err) {
    console.error("API ERROR:", err);
    res.status(500).json({ error: "Terjadi kesalahan AI Server" });
  }
}