const db = require("./models");
const User = db.user;
const bcrypt = require("bcryptjs");

async function reset() {
    try {
        const user = await User.findOne({ where: { username: "admin" } });
        if (user) {
            user.password = bcrypt.hashSync("admin123", 8);
            await user.save();
            console.log("Admin password reset to: admin123");
        } else {
            await User.create({
                username: "admin",
                password: bcrypt.hashSync("admin123", 8),
                role: "admin"
            });
            console.log("Admin user created with password: admin123");
        }
        process.exit();
    } catch (e) {
        console.error(e);
        process.exit(1);
    }
}

reset();
