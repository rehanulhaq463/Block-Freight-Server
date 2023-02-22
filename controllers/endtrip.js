const express   = require("express");
const db        = require("../db/conn");
const bcrypt    = require("bcrypt");
const jtoken    = require("jsonwebtoken");
const endtrip = require("../model/endtrip");

exports.submitendtrip = async (req, res, next) => {
	const { TripDetail, EndDate } = req.body;
	if (!TripDetail||!EndDate)
		return res.status(404).send({ message: "Incomplete request" });

	try {
		const et = new endtrip({
			TripDetail,
			EndDate,
		});

	try {
    const check = await endtrip.findOne({ TripDetail: req.body.TripDetail });
	if (check) {
		return res.status(200).send({ message: "Trip Already assigned" });
	}
	const endt = new endtrip({
		TripDetail,
		EndDate,
    });
    const resp = await endt.save();
	if (resp) {
		return res.status(200).send({ message: "Trip successfully completed" });
    } else {
		res.status(409).send({ message: "Trip completion failed" });
		}
	}
	catch (err) {
		return res.status(500).send({ message: err.message });
	}
	
	const resp = await et.save();
		if (resp) {
			return res.status(200).send({ message: "Trip completed successfully" });
		}
		else {
			return res.status(200).send({ message: "Trip record unsaved" });
		}
	}
	catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

exports.viewendtrip = async (req, res, next) => { 
	try {
		const et = await endtrip.find({});
		if (et.length > 0)
			return res.status(200).send(et);
		return res.status(404).send({ message: "No trip exists" });
	}
	catch (error) {
		return res.status(500).send({ message: error.message });
	}
}