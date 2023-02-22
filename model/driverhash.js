const mongoose = require("mongoose");

const userschema = new mongoose.Schema({
  Hash: {
    type: String,
    required: true,
  },
  DriverName: {
    type: String,
    required: true,
  },
  CnicNo: {
    type: String,
    required: true,
    unique: true,
  },
});

const driverhash = mongoose.model("DriverHash", userschema);
module.exports = driverhash;