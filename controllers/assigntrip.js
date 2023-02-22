const express   = require("express");
const db        = require("../db/conn");
const bcrypt    = require("bcrypt");
const jtoken    = require("jsonwebtoken");
const assigntrip = require("../model/assigntrip");

exports.createtrip = async (req, res, next) => {
	const { TripDetail, DriverDetail } = req.body;
	if (!TripDetail||!DriverDetail)
		return res.status(404).send({ message: "Incomplete request" });

	try {
		const asstrip = new assigntrip({
			TripDetail,
			DriverDetail,
		});

	try {
    const check = await assigntrip.findOne({ TripDetail: req.body.TripDetail });
	if (check) {
		return res.status(200).send({ message: "Trip Already assigned" });
	}
	const astr = new assigntrip({
		TripDetail,
		DriverDetail,
    });
    const resp = await astr.save();
	if (resp) {
		return res.status(200).send({ message: "Trip successfully assigned" });
    } else {
		res.status(409).send({ message: "Trip assigning failed" });
		}
	}
	catch (err) {
		return res.status(500).send({ message: err.message });
	}
	
	const resp = await asstrip.save();
		if (resp) {
			return res.status(200).send({ message: "Trip assigned successfully" });
		}
		else {
			return res.status(200).send({ message: "Trip unassigned" });
		}
	}
	catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

exports.viewassignedtrips = async (req, res, next) => { 
	try {
		const asstrip = await assigntrip.find({});
		if (asstrip.length > 0)
			return res.status(200).send(asstrip);
		return res.status(404).send({ message: "No trip exists" });
	}
	catch (error) {
		return res.status(500).send({ message: error.message });
	}
}