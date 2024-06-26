const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Player = require('./models/Player');

const app = express();
app.use(cors({
    origin: ["https://dm-estiam-tenpennys-projects.vercel.app"],
    methods: ["POST", "GET"],
    credentials: true
}));
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://med19aziz:IPeKHjCSQzxHKEuT@cluster0.xhyqhjd.mongodb.net/test?retryWrites=true&w=majority&appName=Cluster0');

// Player routes
app.post('/players', async (req, res) => {
    const { username } = req.body;
    try {
        let player = await Player.findOne({ username });
        if (!player) {
            player = new Player({ username });
            await player.save();
        }
        res.status(201).json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.put('/players/:username', async (req, res) => {
    const { username } = req.params;
    const { score } = req.body;
    try {
        const player = await Player.findOneAndUpdate({ username }, { score }, { new: true });
        if (!player) return res.status(404).json({ message: 'Player not found' });
        res.json(player);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

app.get('/players/scoreboard', async (req, res) => {
    try {
        const scoreboard = await Player.find().sort({ score: -1 }).limit(10);
        res.json(scoreboard);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Default route
app.get("/", (req, res) => {
    res.json("Hello");
});

// Start server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
