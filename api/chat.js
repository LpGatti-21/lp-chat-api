import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: `You are a portfolio assistant. Answer only about the site.\nUser: ${message}`,
    });

    const reply = response.output[0].content[0].text;

    res.status(200).json({
      reply: reply,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ reply: "Error" });
  }
}
