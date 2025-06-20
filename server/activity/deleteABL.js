const Ajv = require("ajv");
const ajv = new Ajv();

const activityDao = require("../../DAO/activity-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string", minLength: 32, maxLength: 32 },
  },
  required: ["id"],
  additionalProperties: false,
};

async function DeleteAbl(req, res) {
  try {
    
    const reqParams = req.body;


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
        message: `Activity with id ${reqParams.id} not found.`,
      });
      return;
    }

    activityDao.remove(reqParams.id);

   
    res.json({});
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = DeleteAbl;