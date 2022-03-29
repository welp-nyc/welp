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
    address: {
      type: String,
      required: false
    },
    lat: {
      type: Number,
      required: true
    },
    long: {
      type: Number,
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5
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
      type: [String],
      required: false
    },
    review: {
      type: String,
      required: false
    },
    cleanliness: {
      type: Number,
      required: false
    },
    comfort: {
      type: Number,
      required: false
    },
    vibes: {
      type: Number,
      required: false
    },
    tags: {
      type: [String],
      required: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pin", PinSchema);