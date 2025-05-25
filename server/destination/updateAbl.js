const Ajv = require("ajv");
const ajv = new Ajv();

const destinationDao = require("../../DAO/destination-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
    name: { type: "string", maxLength: 100 },
    arrivalDate: { type: "string", format: "date-time" },
    departureDate: { type: "string", format: "date-time" },
    description: { type: "string", maxLength: 250 }
  },
  required: ["id"], 
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    const destination = req.body;


    const valid = ajv.validate(schema, destination);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        category: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    
    let updatedDestination;
    try {
      updatedDestination = await destinationDao.update(destination);
    } catch (e) {
      
      res.status(400).json({
        code: e.code || "updateFailed",
        message: e.message || "Update failed",
      });
      return;
    }

    if (!updatedDestination) {
      res.status(404).json({
        code: "destinationNotFound",
        category: `Destination with id ${destination.id} not found`,
      });
      return;
    }

    res.json(updatedDestination);
  } catch (e) {
    res.status(500).json({ category: e.category || e.message });
  }
}

module.exports = UpdateAbl;