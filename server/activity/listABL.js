const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const activityDao = require("../../DAO/activity-dao.js");
const destinationDao = require("../../DAO/destination-dao.js");

const schema = {
  type: "object",
  properties: {
    date: { type: "string" },
  },
  required: [],
  additionalProperties: false,
};

async function ListAbl(req, res) {
  try {
    const filter = req.query?.date ? req.query : req.body;


    const valid = ajv.validate(schema, filter);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const { activityList } = activityDao.list(filter);

  
    const destinationMap = destinationDao.getDestinationMap();

  
    res.json({ itemList: activityList, destinationMap });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = ListAbl;