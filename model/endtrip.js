const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  TripDetail: {
    type: String,
    required: true,
  },
  EndDate: {
    type: String,
    required: true,
  },
});

const endtrip = mongoose.model("endtrip", userschema);
module.exports = endtrip;