const triphashcontroller = require('../../controllers/triphash');

const path = require('path');

const express = require('express');

const router = express.Router();

router.post("/inserttriphash", triphashcontroller.inserttriphash);

router.get("/viewtriprecord", triphashcontroller.viewtriprecord);

module.exports=router