const Ajv = require("ajv");
const ajv = new Ajv();

const destinationDao = require("../../DAO/destination-dao.js");
const activityDao = require("../../dao/activity-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" }
  },
  required: ["id"],
  additionalProperties: false
};

async function DeleteAbl(req, res) {
  try {
    const dtoIn = req.body;

 
    const valid = ajv.validate(schema, dtoIn);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "Input data is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    
    const destination = await destinationDao.get(dtoIn.id);
    if (!destination) {
      res.status(400).json({
        code: "destinationDoesNotExist",
        message: `Destination with id ${dtoIn.id} does not exist`,
      });
      return;
    }

    const deletedActivityCount = await activityDao.deleteByDestinationId(dtoIn.id);

 
    await destinationDao.remove(dtoIn.id);


    res.json({
      id: dtoIn.id,
      deletedActivityCount: deletedActivityCount,
    });
  } catch (e) {
    res.status(500).json({
      code: "serverError",
      message: e.message || e,
    });
  }
}

module.exports = DeleteAbl;