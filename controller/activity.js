const express = require("express");
const router = express.Router();

const CreateAbl = require("../server/activity/createABL");
const ListAbl = require("../server/activity/listABL");

router.post("/create", CreateAbl);
router.get("/list", ListAbl);

module.exports = router;