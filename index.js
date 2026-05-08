const express = require("express");
const app = express();

const GROUP_ID = 35091112; // change to your group id

// ---------- 1. Username → UserId ----------
async function getUserId(username) {
    try {
        const res = await fetch("https://users.roblox.com/v1/usernames/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                usernames: [username],
                excludeBannedUsers: false
            })
        });

        const data = await res.json();
        return data.data?.[0]?.id || null;
    } catch (err) {
        console.log("UserId error:", err);
        return null;
    }
}

// ---------- 2. Get group rank ----------
async function getGroupRank(userId) {
    try {
        const res = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
        const data = await res.json();

        const group = data.data?.find(g => g.group.id === GROUP_ID);

        return group ? group.role.rank : 0;
    } catch (err) {
        console.log("Rank error:", err);
        return 0;
    }
}

// ---------- 3. API ROUTE ----------
app.get("/rank", async (req, res) => {
    const user = req.query.user;

    if (!user) {
        return res.json({ error: "No user provided" });
    }

    const userId = await getUserId(user);

    if (!userId) {
        return res.json({ error: "User not found" });
    }

    const rank = await getGroupRank(userId);

    res.json({
        player: user,
        userId: userId,
        rank: rank
    });
});

// ---------- 4. Home route ----------
app.get("/", (req, res) => {
    res.send("Roblox API is running 🚀");
});

// ---------- 5. Start server ----------
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server running on port " + port);
});
