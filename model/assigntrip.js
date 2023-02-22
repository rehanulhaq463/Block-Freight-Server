const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userschema = new mongoose.Schema({
  TripDetail: {
    type: String,
    required: true,
  },
  DriverDetail: {
    type: String,
    required: true,
  }
});

const assigntrips = mongoose.model("AssignedTrip", userschema);
module.exports = assigntrips;
