const express = require("express");
const app = express();

// Home route (fixes "Cannot GET /")
app.get("/", (req, res) => {
    res.send("API is running 🚀");
});

// Rank API
app.get("/rank", (req, res) => {
    const user = req.query.user;

    if (!user) {
        return res.json({ error: "No user provided" });
    }

    // fake logic (you can replace later)
    let rank = 99;

    if (user.toLowerCase() === "alex") rank = 50;
    if (user.toLowerCase() === "bob") rank = 10;

    res.json({
        player: user,
        rank: rank
    });
});
// Port (IMPORTANT for Render)
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server running on port " + port);
});
