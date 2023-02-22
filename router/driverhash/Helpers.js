const driverhashcontroller = require('../../controllers/driverhash');

const path = require('path');

const express = require('express');

const router = express.Router();


router.post("/insertdriverhash", driverhashcontroller.insertdriverhash);

router.get("/viewdriverrecord", driverhashcontroller.viewdriverrecord);

// router.patch("/assigntrip", driverController.assigntrip);
module.exports=router