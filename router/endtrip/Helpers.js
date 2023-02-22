const endtripcontroller = require('../../controllers/endtrip');

const path = require('path');

const express = require('express');

const router = express.Router();

router.post("/submitendtrip", endtripcontroller.submitendtrip);

router.get("/viewendtrip", endtripcontroller.viewendtrip);

module.exports=router