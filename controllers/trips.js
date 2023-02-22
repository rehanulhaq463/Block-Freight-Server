const express   = require("express");
const db        = require("../db/conn");
const bcrypt    = require("bcrypt");
const jtoken    = require("jsonwebtoken");
const trips     = require("../model/trips");
exports.createtrip = async (req, res, next) => {
	const { TripId,TripIntiator, TripLocation, TripLoad, StartDate, EndDate, Status } = req.body;
	if (!TripId||!TripIntiator || !TripLocation || !TripLoad || !StartDate || !EndDate)
		return res.status(404).send({ message: "Incomplete request" });
	
	const SD = new Date(StartDate);
	const ED = new Date(EndDate);
	try {
		const trip = new trips({
			TripId,
			TripIntiator,
			TripLocation,
			TripLoad,
			StartDate:SD,
			EndDate:ED,
			Status,
		});

	try {
    const check = await trips.findOne({ TripId: req.body.TripId });
	if (check) {
		return res.status(200).send({ message: "Trip Already exists" });
	}
	const tr = new trips({
		TripId,
		TripIntiator,
		TripLocation,
		TripLoad,
		StartDate:SD,
		EndDate:ED,
		Status,
    });
    const resp = await tr.save();
	if (resp) {
		return res.status(200).send({ message: "Trip successfully created" });
    } else {
    	res.status(409).send({ message: "Trip creation failed" });
		}
	}
	catch (err) {
		return res.status(500).send({ message: err.message });
	}
	
	const resp = await trip.save();
		if (resp) {
			return res.status(200).send({ message: "Trip created successfully" });
		}
		else {
			return res.status(200).send({ message: "Trip did not save" });
		}
	}
	catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

exports.viewtrips = async (req, res, next) => { 
	try {
		const trip = await trips.find({});
		if (trip.length > 0) return res.status(200).send(trip);
		return res.status(404).send({ message: "No trip exists" });
		// const una = await trips.find({ Status: "Not Assigned" });
		// const start =await trips.find({ Status: "Started" });
	// if (trip) {
	// 	return res.status(200).send({Completed:trip, Unassigned:una, Started:start});
	// }
	// else {
	// 	return res.status(404).send({ message: "No completed trips found" });
	// }
} catch (error) {
	return res.status(500).send({ message: error.message });
}
}

