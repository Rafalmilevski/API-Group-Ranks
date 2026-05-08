const express = require("express");
const app = express();

app.get("/", (req, res) => {
    res.send("API is working");
});

app.get("/rank", (req, res) => {
    res.json({
        player: "Test",
        rank: 99
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Running on port " + port);
});
