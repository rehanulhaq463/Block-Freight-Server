const express = require("express");
const app = express();
const db = require("../db/conn");
const bcrypt = require("bcrypt");
const jtoken = require("jsonwebtoken");
const drivers = require("../model/drivers");
app.use(express.json());
//function to view all the trips assigned to a driver
exports.viewall = async (req, res, next) => {
  const driver = await drivers.find({});
  if (driver.length > 0) return res.status(200).send(driver);
  return res.status(404).send({ message: "No dirver exists" });
};
//function to create a new driver

exports.insertdriver = async (req, res, next) => {
  if (
    !req.body.transporterName ||
    !req.body.driverName ||
    !req.body.mobile ||
    !req.body.cnic ||
    !req.body.vehicleNo ||
    !req.body.vehicleType ||
    !req.body.maxLoad
  ) {
    return res.status(400).send({ message: "Invalid request parameters" });
  }
  const {
    transporterName,
    driverName,
    vehicleType,
    mobile,
    cnic,
    maxLoad,
    vehicleNo,
  } = req.body;
  try {
   const check = await drivers.findOne({ cnic: req.body.cnic });
    if (check)
      return res.status(200).send({ message: "Driver Already exists" });
    const dv = new drivers({
      transporterName,
      driverName,
      vehicleType,
      mobile,
      cnic,
      maxLoad,
      vehicleNo,
    });
    const resp = await dv.save();
    if (resp) {
      return res.status(200).send({
        message: "Driver successfully created",
      });
    } else {
      res.status(409).send({ message: "Driver creation failed" });
    }
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
//function for finding a driver by his Vehicle Type
exports.finddriver = async (req, res, next) => {
  try {
    const doc = await drivers.find({ vehicleType: req.params.vehicleType });
    if (doc.length > 0) return res.status(200).send(doc);
    else
      return res
        .status(200)
        .send({ message: "No driver with this vehicleType found" });
  } catch (err) {
    return res.status(500).send({ Message: err.message });
  }
};
//fucntion for assinging trips to a driver
exports.assigntrip = async (req, res, next) => {
  
  const {
    TripIds,
    TripIntiators,
    TripLocations,
    TripLoads,
    StartDates,
    EndDates,
    drivercnic,
    Statuss,
    
  } = req.body;
  if (!TripIds||
    !TripIntiators||
    !TripLocations||
    !TripLoads||
    !StartDates||
    !EndDates||
    !Statuss||
    !drivercnic 
    
  )
    return res.status(404).send({ message: "Incomplete request" });
 try {
	 const SD = new Date(StartDates);
	  const ED = new Date(EndDates);
	  const upd = await drivers.findOneAndUpdate(
	    { cnic: drivercnic },
	    {
	      $addToSet: {
          Trips: {
              TripIds:req.body.TripIds,
	            TripIntiator: req.body.TripIntiators,
	            TripLocation: req.body.TripLocations,
	            TripLoad: req.body.TripLoads,
	            StartDate: SD,
	            EndDate: ED,
	            Status: req.body.Statuss,
	        },
	      },
	    }
	  );
	  if (upd)
	  {
	    return res.status(200).send({ message: "Trip added successfully" });
	  }
	  else {
	    return res.status(422).send({ message: "Trip could not be added" });
	  }
} catch (error) {
   return res.status(500).send({ message: error.message });
}
};
//function for updating tips status assigned to a driver
exports.updatetrip = async (req, res, next) =>
{
  try {
	const driver = await drivers.findOne({ cnic: req.body.cnic });
	  if(!driver)
	  {
	    return res.status(404).send({ Status: "Driver Not Found With this cnic" });
	  }
	  const Driver = await drivers.updateOne(
	      { cnic: req.body.cnic },
	      {
	        $set: {
	          "Trips.$[o].userstatus": req.body.Status,
	        },
	      },
	      {
	        arrayFilters: [
	          {
	            "o.TripId": req.body.TripId,
	          },
	        ],
	      }
	  );
	  if (Driver)
	    return res.status(200).send({ Status: `The Trip With TripId ${req.body.TripId} has been updated` });
	  else
	    return res.status(501).send({Status: `The Trip With TripId ${req.body.TripId}could not be updated` });
} catch (error) {
    return res.status(500).send({ Status: error.message });
}
  }
