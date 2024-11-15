const express = require('express');
const { createCar, getCars, getCarById, updateCar, deleteCar } = require('../controllers/carController');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, createCar);
router.get('/', auth, getCars);
router.get('/:id', auth, getCarById);
router.put('/:id', auth, updateCar);
router.delete('/:id', auth, deleteCar);

module.exports = router;