const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const activityDao = require("../../DAO/activity-dao.js");
const destinationDao = require("../../DAO/destination-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function GetAbl(req, res) {
  try {
    const reqParams = req.query?.id ? req.query : req.body;

    
    const valid = ajv.validate(schema, reqParams);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    const activity = activityDao.get(reqParams.id);
    if (!activity) {
      res.status(404).json({
        code: "activityNotFound",
        message: `Activity ${reqParams.id} not found`,
      });
      return;
    }

 
    const destination = destinationDao.get(activity.destinationId);
    activity.destination = destination;

   
    res.json(activity);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = GetAbl;