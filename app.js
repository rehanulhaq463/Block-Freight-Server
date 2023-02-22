const express = require("express");
const env = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const cors = require("cors");
const cookies_parser = require('cookie-parser');

const admin = require("./router/admin/Helpers");
const driver = require("./router/driver/Helpers");
const trips = require("./router/trips/Helpers");
const assigntrip = require("./router/assigntrip/Helpers");
const driverhash = require("./router/driverhash/Helpers");
const endtrip = require("./router/endtrip/Helpers");
const triphash = require("./router/triphash/Helpers");

const bodyParser = require('body-parser');
env.config({ path: "config.env" });
require("./db/conn.js");
app.use(cookies_parser());
app.use(cors());
app.use(express.json());

const PORT = process.env.port;
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", admin);
app.use("/drivers", driver);
app.use("/trips", trips);
app.use("/assigntrip", assigntrip);
app.use("/driverhash", driverhash);
app.use("/endtrip", endtrip);
app.use("/triphash", triphash);

app.listen(PORT, () => {
  console.log("server up at localhost" + " " + PORT);
});