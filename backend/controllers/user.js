const User = require("../modles/user");

async function handleUserSignup(req, res) {
    const { username, email, password } = req.body;

    try {
        const createdUser = await User.create({
            username: username,
            email: email,
            password: password,
        });
         
        return res.json({ user: createdUser, message: "User signed up successfully" });
    } catch (error) {
        
        return res.json({ message: "Email or username already in use. Please try again with a different one." });
    }
}
async function handleUserLogin(req, res) {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email, password });

        if (!user) {
            return res.render("login", {
                error: "Invalid Username and Password",
            });
        }

        return res.json({ user: user, message: "User logged in successfully" });
    } catch (error) {
        
        return res.json({message: "nvalid email and password. Please check your email and password."});
    }
}

module.exports = {
    handleUserSignup,
    handleUserLogin,
};
