import express from 'express';
import OpenAI from 'openai';

const app = express();
app.use(express.json());

const apiKey = process.env.OPENROUTER_API_KEY;


const openai = new OpenAI({
    apiKey,
    baseURL: 'https://openrouter.ai/api/v1',
})

const messages = [
  {
    role: "system",
    content: `You are a precise translation and response assistant. Your task is to reply to the user's message, which is written in English. However, you must write your entire response in the specific target language specified in the preceding system message. 

Analyze the user's input, formulate a helpful and accurate reply, and translate that reply into the selected language before outputting it. Maintain a natural, fluent tone in the target language. Do not include any English text or explanations unless explicitly requested by the user.
`,
  },
];

app.post('/api/translate', async (req, res) => {

    const { userPrompt, userLanguage } = req.body

    messages.push ({
        role: 'system',
        content: `content": "The selected target language for the next response is: ${userLanguage }`
    })

    try {
        const response = await openai.chat.completions.create({
            model: 'openai/gpt-4o-mini',
            messages
        })
        
        const reply = response.choices[0].message.content
        res.json({ reply })
    }
    catch(e) {
        console.error(e)
        res.status(500).json({ message: `It's not you, it's us. Something went wrong on the server`})
    }
})

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
