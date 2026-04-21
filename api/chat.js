import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
  try {
    const { message } = req.body;

    const response = await openai.responses.create({
      model: "gpt-5.4-mini",
      input: [
        {
          role: "system",
          content: "You are a portfolio assistant. Answer only about the site."
        },
        {
          role: "user",
          content: message
        }
      ]
    });

    res.status(200).json({
      reply: response.output[0].content[0].text
    });

  } catch (err) {
    console.error(err); // 👈 IMPORTANT (so you can see real error in Vercel logs)

    res.status(500).json({
      reply: "Error"
    });
  }
}
