const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  Hash: {
    type: String,
    required: true,
  },
  TripDetail: {
    type: String,
    required: true,
  },
  EndDate: {
    type: String,
    required: true,
  },
});

const triphash = mongoose.model("TripHash", userschema);
module.exports = triphash;