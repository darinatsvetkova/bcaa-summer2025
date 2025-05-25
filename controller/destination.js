const express = require("express");
const router = express.Router();

const CreateAbl = require("../server/destination/createABL");
const ListAbl = require("../server/destination/listAbl");
const DeleteAbl = require("../server/destination/deleteABL");


router.post("/create", CreateAbl);
router.get("/list", ListAbl);
router.post("/delete", DeleteAbl);

module.exports = router;