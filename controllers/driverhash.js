const express   = require("express");
const db        = require("../db/conn");
const bcrypt    = require("bcrypt");
const jtoken    = require("jsonwebtoken");
const driverhash = require("../model/driverhash");

exports.insertdriverhash = async (req, res, next) => {
	const { Hash, DriverName, CnicNo } = req.body;
	if (!Hash||!DriverName||!CnicNo)
		return res.status(404).send({ message: "Incomplete request" });

	try {
		const dr = new driverhash({
            Hash,
            DriverName,
            CnicNo,
		});

	try {
    const check = await driverhash.findOne({ CnicNo: req.body.CnicNo });
	if (check) {
		return res.status(200).send({ message: "Data already exist" });
	}
	const drhash = new driverhash({
        Hash,
        DriverName,
        CnicNo,
    });
    const resp = await drhash.save();
	if (resp) {
		return res.status(200).send({ message: "Data successfully saved" });
    } else {
		res.status(409).send({ message: "Data storing failed" });
		}
	}
	catch (err) {
		return res.status(500).send({ message: err.message });
	}
	
	const resp = await dr.save();
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

exports.viewdriverrecord = async (req, res, next) => { 
	try {
		const dr = await driverhash.find({});
		if (dr.length > 0)
			return res.status(200).send(dr);
		return res.status(404).send({ message: "No data exists" });
	}
	catch (error) {
		return res.status(500).send({ message: error.message });
	}
}