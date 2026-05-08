const express = require("express");
const app = express();

const GROUP_ID = 35091112;

// ---------- Username → UserId ----------
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

// ---------- Get Group Rank + RoleId ----------
async function getGroupInfo(userId) {
    try {
        const res = await fetch(`https://groups.roblox.com/v1/users/${userId}/groups/roles`);
        const data = await res.json();

        const group = data.data?.find(g => g.group.id === GROUP_ID);

        if (!group) {
            return {
                rank: 0,
                roleId: null
            };
        }

        return {
            rank: group.role.rank,
            roleId: group.role.id
        };

    } catch (err) {
        console.log("Group error:", err);
        return {
            rank: 0,
            roleId: null
        };
    }
}

// ---------- API ROUTE ----------
app.get("/rank", async (req, res) => {
    const user = req.query.user;

    if (!user) {
        return res.json({ error: "No user provided" });
    }

    const userId = await getUserId(user);

    if (!userId) {
        return res.json({ error: "User not found" });
    }

    const groupInfo = await getGroupInfo(userId);

    res.json({
        rank: groupInfo.rank,
        roleId: groupInfo.roleId
    });
});

// ---------- HOME ----------
app.get("/", (req, res) => {
    res.send("Roblox Rank API is running 🚀");
});

// ---------- START ----------
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server running on port " + port);
});
