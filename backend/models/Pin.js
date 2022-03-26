const mongoose = require("mongoose");

const PinSchema = new mongoose.Schema({
    username: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true,
      min: 3,
      max: 60
    },
    desc: {
      type: String,
      required: true,
      min: 3
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    lat: {
      type: Number,
      required: true
    },
    long: {
      type: Number,
      required: true
    },
    address: {
      type: String,
      required: false
    },
    hours: {
      type: String,
      required: false
    },
    phone: {
      type: String,
      required: false
    },
    image: {
      type: String,
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);