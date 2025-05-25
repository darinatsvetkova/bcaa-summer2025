const Ajv = require("ajv");
const ajv = new Ajv();

const destinationDao = require("../../DAO/destination-dao.js");

const schema = {
  type: "object",
  properties: {
    name: { type: "string" },
    description: { type: "string" }
  },
  required: ["name", "description"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
  try {
    let destination = req.body;

    // validate input
    const valid = ajv.validate(schema, destination);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    // store destination to persistent storage
    try {
      destination = await destinationDao.create(destination);
    } catch (e) {
      res.status(400).json({
        ...e,
      });
      return;
    }

    // return properly filled dtoOut
    res.json(destination);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;