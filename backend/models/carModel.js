const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
  title: String,
  description: String,
  tags: [String],
  images: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
});

const Car = mongoose.model('Car', carSchema);

module.exports = Car;