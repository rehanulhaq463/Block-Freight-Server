const express   = require("express");
const db        = require("../db/conn");
const bcrypt    = require("bcrypt");
const jtoken    = require("jsonwebtoken");
const triphash = require("../model/triphash");

exports.inserttriphash = async (req, res, next) => {
	const { Hash, TripDetail, EndDate } = req.body;
	if (!Hash||!TripDetail||!EndDate)
		return res.status(404).send({ message: "Incomplete request" });

	try {
		const tr = new triphash({
			Hash,
            TripDetail,
            EndDate,
		});

	try {
    const check = await triphash.findOne({ TripDetail: req.body.TripDetail });
	if (check) {
		return res.status(200).send({ message: "Data already exist" });
	}
		const trhash = new triphash({
		Hash,
        TripDetail,
        EndDate,
    });
    const resp = await trhash.save();
	if (resp) {
		return res.status(200).send({ message: "Data successfully saved" });
    } else {
		res.status(409).send({ message: "Data storing failed" });
		}
	}
	catch (err) {
		return res.status(500).send({ message: err.message });
	}
	
	const resp = await tr.save();
		if (resp) {
			return res.status(200).send({ message: "Data stored successfully" });
		}
		else {
			return res.status(200).send({ message: "Data unstored" });
		}
	}
	catch (error) {
		return res.status(500).send({ message: error.message });
	}
};

exports.viewtriprecord = async (req, res, next) => { 
	try {
		const tr = await triphash.find({});
		if (tr.length > 0)
			return res.status(200).send(dr);
		return res.status(404).send({ message: "No data exists" });
	}
	catch (error) {
		return res.status(500).send({ message: error.message });
	}
}