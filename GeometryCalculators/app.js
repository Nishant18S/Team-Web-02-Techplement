const express = require("express");
const app = express();
const path = require("path");
const geometryRoutes = require("./routes/geometryRoutes");

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static("public")); // Ensure CSS/JS can be loaded

// Serve the main Geometry UI
app.get("/geometry", (req, res) => {
    res.render("geometry"); // Renders views/geometry.ejs
});

// Serve the calculator views (HTML pages)
app.get("/geometry/view/:type", (req, res) => {
    const { type } = req.params;
    res.render(`calculators/${type}`, { type }); // Ensure `views/calculators/${type}.ejs` exists
});

// Use geometry API routes separately
app.use("/geometry/api", geometryRoutes);

app.get('/', (req, res) => {
    res.redirect('/geometry'); // Redirect root URL to /geometry
});

// Start the server
app.listen(3000, () => console.log("Server running on http://localhost:3000"));
