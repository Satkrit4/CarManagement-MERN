const Car = require('../models/carModel');

// Create Car
exports.createCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;
    const car = await Car.create({
      user: req.user.id,
      title,
      description,
      tags,
      images,
    });
    res.status(201).json({ success: true, car });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get All Cars
exports.getCars = async (req, res) => {
  try {
    const cars = await Car.find({ user: req.user.id });
    res.status(200).json({ success: true, cars });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Get Car by ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }
    res.status(200).json({ success: true, car });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Update Car
exports.updateCar = async (req, res) => {
  try {
    const { title, description, tags, images } = req.body;
    let car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }
    if (car.user.toString() !== req.user.id) {
      return res.status(401).json({ success: false, message: 'Not authorized' });
    }
    car = await Car.findByIdAndUpdate(req.params.id, { title, description, tags, images }, { new: true });
    res.status(200).json({ success: true, car });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// Delete Car
exports.deleteCar = async (req, res) => {
  try {
    // const car = await Car.findById(req.params.id);
    // if (!car) {
    //   return res.status(404).json({ success: false, message: 'Car not found' });
    // }
    // if (car.user.toString() !== req.user.id) {
    //   return res.status(401).json({ success: false, message: 'Not authorized' });
    // }
    // await car.remove();
    
    const { id } = req.params;
    await Car.findByIdAndDelete(id);
    res.status(200).json({ success: true, message: 'Car removed' });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};