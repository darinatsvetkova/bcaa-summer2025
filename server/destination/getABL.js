const Ajv = require("ajv");
const ajv = new Ajv();
const destinationDao = require("../../DAO/destination-dao.js");

const schema = {
  type: "object",
  properties: {
    id: { type: "string" },
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


    const destination = await destinationDao.get(reqParams.id);
    if (!destination) {
      res.status(404).json({
        code: "destinationNotFound",
        message: `Destination with id ${reqParams.id} not found`,
      });
      return;
    }

    
    res.json(destination);
  } catch (e) {
    res.status(500).json({ code: "serverError", message: e.message || e });
  }
}

module.exports = GetAbl;
