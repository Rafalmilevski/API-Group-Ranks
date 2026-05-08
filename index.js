const express = require("express");
const app = express();

app.get("/rank", (req, res) => {
    res.json({
        player: "Hazem",
        rank: 99
    });
});

app.listen(3000, () => {
    console.log("API running");
});
