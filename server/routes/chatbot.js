const express = require('express');
const router = express.Router();
const OpenAI = require('openai');

const openai = new OpenAI(process.env.OPENAI_API_KEY);

router.post('/chat', async (req, res) => {
  try {
    const { message } = req.body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a knowledgeable herbalist specializing in AYUSH (Ayurveda, Yoga & Naturopathy, Unani, Siddha, and Homeopathy) systems. Provide accurate information about medicinal plants, their uses, and cultivation methods. If you're unsure about something, say so rather than providing incorrect information."
        },
        {
          role: "user",
          content: message
        }
      ],
      temperature: 0.7,
      max_tokens: 500
    });

    res.json({ response: completion.choices[0].message.content });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to process your request' });
  }
});

module.exports = router;