const express = require('express');
const router = express.Router();
const geometryController = require('../controllers/geometryController');

// Route to serve the Geometry UI
router.get('/', geometryController.renderGeometryPage);

// API Routes for calculations
router.get('/2d-distance', geometryController.calculate2DDistance);
router.get('/3d-distance', geometryController.calculate3DDistance);
router.get('/equilateral-triangle', geometryController.calculateEquilateralTriangle);
router.get('/isosceles-triangle', geometryController.calculateIsoscelesTriangle);
router.get('/right-angled-triangle', geometryController.calculateRightAngledTriangle);
router.get('/cube', geometryController.calculateCube);
router.get('/cone', geometryController.calculateCone);
router.get('/circle', geometryController.calculateCircle);
router.get('/cylinder', geometryController.calculateCylinder);
router.get('/rectangle', geometryController.calculateRectangle);
router.get('/square', geometryController.calculateSquare);
router.get('/sphere', geometryController.calculateSphere);

module.exports = router;
