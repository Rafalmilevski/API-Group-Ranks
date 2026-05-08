const express = require("express");
const app = express();

// Home route (fixes "Cannot GET /")
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// Rank API
app.get("/rank", (req, res) => {
    res.json({
        player: "Test",
        rank: 99
    });
});

// Port (IMPORTANT for Render)
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server running on port " + port);
});
