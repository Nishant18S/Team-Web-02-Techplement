
exports.renderGeometryPage = (req, res) => {
    res.render('geometry'); // This will render `views/geometry.ejs`
};

// 2D Distance Formula
exports.calculate2DDistance = (req, res) => {
    const { x1, y1, x2, y2 } = req.query;
    if (!x1 || !y1 || !x2 || !y2) {
        return res.status(400).json({ error: "Please provide all required coordinates." });
    }
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    res.json({ distance });
};

// 3D Distance Formula
exports.calculate3DDistance = (req, res) => {
    const { x1, y1, z1, x2, y2, z2 } = req.query;
    if (!x1 || !y1 || !z1 || !x2 || !y2 || !z2) {
        return res.status(400).json({ error: "Please provide all required coordinates." });
    }
    const distance = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
    res.json({ distance });
};

// Equilateral Triangle Calculator
exports.calculateEquilateralTriangle = (req, res) => {
    const { side } = req.query;
    if (!side) return res.status(400).json({ error: "Please provide side length." });
    
    const area = (Math.sqrt(3) / 4) * Math.pow(side, 2);
    const perimeter = 3 * side;
    res.json({ area, perimeter });
};

// Isosceles Triangle Calculator
exports.calculateIsoscelesTriangle = (req, res) => {
    const { base, side } = req.query;
    if (!base || !side) return res.status(400).json({ error: "Please provide base and side lengths." });
    
    const height = Math.sqrt(Math.pow(side, 2) - Math.pow(base / 2, 2));
    const area = (base * height) / 2;
    const perimeter = 2 * side + Number(base);
    res.json({ area, perimeter });
};

// Right-Angled Triangle Calculator
exports.calculateRightAngledTriangle = (req, res) => {
    const { base, height } = req.query;
    if (!base || !height) return res.status(400).json({ error: "Please provide base and height." });

    const hypotenuse = Math.sqrt(Math.pow(base, 2) + Math.pow(height, 2));
    const area = (base * height) / 2;
    res.json({ area, hypotenuse });
};

// Cube Calculator
exports.calculateCube = (req, res) => {
    const { side } = req.query;
    if (!side) return res.status(400).json({ error: "Please provide side length." });

    const volume = Math.pow(side, 3);
    const surfaceArea = 6 * Math.pow(side, 2);
    res.json({ volume, surfaceArea });
};

// Cone Calculator
exports.calculateCone = (req, res) => {
    const { radius, height } = req.query;
    if (!radius || !height) return res.status(400).json({ error: "Please provide radius and height." });

    const volume = (1 / 3) * Math.PI * Math.pow(radius, 2) * height;
    const slantHeight = Math.sqrt(Math.pow(radius, 2) + Math.pow(height, 2));
    const surfaceArea = Math.PI * radius * (radius + slantHeight);
    res.json({ volume, surfaceArea });
};

// Circle Calculator
exports.calculateCircle = (req, res) => {
    const { radius } = req.query;
    if (!radius) return res.status(400).json({ error: "Please provide radius." });

    const area = Math.PI * Math.pow(radius, 2);
    const circumference = 2 * Math.PI * radius;
    res.json({ area, circumference });
};

// Cylinder Calculator
exports.calculateCylinder = (req, res) => {
    const { radius, height } = req.query;
    if (!radius || !height) return res.status(400).json({ error: "Please provide radius and height." });

    const volume = Math.PI * Math.pow(radius, 2) * height;
    const surfaceArea = 2 * Math.PI * radius * (radius + height);
    res.json({ volume, surfaceArea });
};

// Rectangle Calculator
exports.calculateRectangle = (req, res) => {
    const { length, width } = req.query;
    if (!length || !width) return res.status(400).json({ error: "Please provide length and width." });

    const area = length * width;
    const perimeter = 2 * (Number(length) + Number(width));
    res.json({ area, perimeter });
};

// Square Calculator
exports.calculateSquare = (req, res) => {
    const { side } = req.query;
    if (!side) return res.status(400).json({ error: "Please provide side length." });

    const area = Math.pow(side, 2);
    const perimeter = 4 * side;
    res.json({ area, perimeter });
};

// Sphere Calculator
exports.calculateSphere = (req, res) => {
    const { radius } = req.query;
    if (!radius) return res.status(400).json({ error: "Please provide radius." });

    const volume = (4 / 3) * Math.PI * Math.pow(radius, 3);
    const surfaceArea = 4 * Math.PI * Math.pow(radius, 2);
    res.json({ volume, surfaceArea });
};
