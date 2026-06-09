const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk'); // Import Groq

const app = express();
app.use(cors());
app.use(express.json());

// Masukkan API Key Groq kamu di sini
const groq = new Groq({ apiKey: "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" });

app.post('/api/chat', async (req, res) => {
    try {
        const pesanUser = req.body.pesan;
        
        const chatCompletion = await groq.chat.completions.create({
            "messages": [{ "role": "user", "content": pesanUser }],
            "model": "llama-3.3-70b-versatile",
        });

        // CARA AMAN MENGAMBIL BALASAN
        const balasan = chatCompletion.choices[0].message.content;
        
        if (balasan) {
            res.json({ balasan: balasan });
        } else {
            res.status(500).json({ balasan: "AI tidak memberikan jawaban." });
        }
    } catch (error) {
        console.error("DETAIL ERROR:", error);
        res.status(500).json({ balasan: "Error: " + error.message });
    }
});

app.listen(3000, () => console.log('Server OK di port 3000'));