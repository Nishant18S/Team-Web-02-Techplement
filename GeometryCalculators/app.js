const express = require("express");
const session = require("express-session");
const PgSession = require("connect-pg-simple")(session);
const path = require("path");
const bcrypt = require("bcrypt"); // ✅ Added missing bcrypt import
const geometryRoutes = require("./routes/geometryRoutes");
const authRoutes = require("./routes/authRoutes");
const pool = require("./db");

const app = express();

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Session Middleware (MUST COME BEFORE ROUTES)
app.use(
    session({
        store: new PgSession({ pool, tableName: "session" }), // Store sessions in DB
        secret: "your_secret_key",
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false, httpOnly: true, maxAge: 1000 * 60 * 60 }, // 1 hour
    })
);

// Authentication Middleware
function isAuthenticated(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        req.session.redirectTo = req.originalUrl; // ✅ Store intended URL before redirecting
        res.redirect("/login");
    }
}

// **Main Dashboard (Homepage)**
app.get("/", (req, res) => {
    res.render("dashboard", { user: req.session.user });
});

// ✅ Added explicit route for `/dashboard`
app.get("/dashboard", isAuthenticated, (req, res) => {
    res.render("dashboard", { user: req.session.user });
});

// **Authentication Routes**
app.use("/", authRoutes);

// **Protected Geometry Routes**
app.use("/geometry", isAuthenticated, geometryRoutes);


// **Server Start**
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
