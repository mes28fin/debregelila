const db = require("./models");
const User = db.user;

async function check() {
    try {
        const users = await User.findAll();
        console.log("Existing Users:", users.map(u => u.username));
        if (users.length === 0) {
            console.log("No users found! You need to trigger the /setup endpoint.");
        }
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

check();
