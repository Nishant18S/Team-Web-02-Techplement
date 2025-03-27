// const express = require("express");
// const bcrypt = require("bcryptjs");
// const pool = require("../db");
// const router = express.Router();


// router.get("/register", (req, res) => {
//     res.render("register", { error: null });
// });



// router.post("/register", async (req, res) => {
//     try {
//         const { username, password } = req.body;

//         if (!username || !password) {
//             return res.render("register", { error: "Username and password are required." });
//         }

    
//         const userCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
//         if (userCheck.rows.length > 0) {
//             return res.render("register", { error: "Username already exists!" });
//         }

//         const hashedPassword = await bcrypt.hash(password, 10);
//         const result = await pool.query(
//             "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
//             [username, hashedPassword]
//         );

//         if (result.rows.length > 0) {
//             res.redirect("/"); 
//         } else {
//             throw new Error("User registration failed.");
//         }
//     } catch (error) {
//         console.error("Registration Error:", error.message);
//         res.render("register", { error: "Error registering user." });
//     }
// });


// router.get("/login", (req, res) => {
//     res.render("login", { error: null });
// });

// router.post("/login", async (req, res) => {
//     const { username, password } = req.body;

//     try {
//         const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

//         if (result.rows.length === 0) {
//             return res.render("login", { error: "Invalid username or password!" });
//         }

//         const user = result.rows[0];
//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//             return res.render("login", { error: "Invalid username or password!" });
//         }

//         req.session.user = user; 
//         res.redirect("/geometry");
//     } catch (error) {
//         console.error(error);
//         res.render("login", { error: "Error logging in." });
//     }
// });


// router.get("/logout", (req, res) => {
//     req.session.destroy(() => {
//         res.redirect("/"); 
//     });
// });


// router.get("/geometry", (req, res) => {
//     res.render("geometry", { error: null });
// });
// module.exports = router;

const express = require("express");
const bcrypt = require("bcryptjs");
const pool = require("../db");
const router = express.Router();

// Register Route (AJAX)
router.post("/register", async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            return res.json({ success: false, error: "Username and password are required." });
        }


        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordRegex.test(password)) {
            return res.json({ success: false, error: "Password must be at least 8 characters, include an uppercase, lowercase, number, and special character." });
        }

        const userCheck = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
        if (userCheck.rows.length > 0) {
            return res.json({ success: false, error: "Username already exists!" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *",
            [username, hashedPassword]
        );

        if (result.rows.length > 0) {
            return res.json({ success: true }); // ✅ Success response (Frontend opens login popup)
        } else {
            throw new Error("User registration failed.");
        }
    } catch (error) {
        console.error("Registration Error:", error.message);
        res.json({ success: false, error: "Error registering user." });
    }
});

// Login Route (AJAX)
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);

        if (result.rows.length === 0) {
            return res.json({ success: false, error: "Invalid username or password!" });
        }

        const user = result.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, error: "Invalid username or password!" });
        }

        req.session.user = user; // Store user in session
        res.json({ success: true }); // ✅ Success response (Frontend reloads page)
    } catch (error) {
        console.error("Login Error:", error.message);
        res.json({ success: false, error: "Error logging in." });
    }
});

// Logout Route (redirects to homepage)
router.get("/logout", (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
});

// Geometry Route
router.get("/geometry", (req, res) => {
    res.render("geometry", { error: null });
});

module.exports = router;
