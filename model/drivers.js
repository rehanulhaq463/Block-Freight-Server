const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const userschema = new mongoose.Schema({
  transporterName: {
    type: String,
    required: true,
  },
  driverName: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  cnic: {
    type: String,
    required: true,
    unique: true,
  },
  vehicleNo: {
    type: String,
    required: true,
  },
  vehicleType: {
    type: String,
    required: true,
  },
  maxLoad: {
    type: String,
    required: true,
  },


  Trips: [
    {
      TripId: {
        type: String,
        required: true,
      },
      TripIntiator: {
        type: String,
        required: true,
      },
      TripLocation: {
        type: String,
        required: true,
      },
      TripLoad: {
        type: String,
        required: true,
      },
      StartDate: {
        type: Date,
        required: true,
      },
      EndDate: {
        type: Date,
        required: true,
      },
      Status: {
        type: String,
        default: "Not Assigned",
        required: true,
      },
    },
  ],
});

const driver = mongoose.model("Drivers", userschema);
module.exports = driver;
