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
    name: { type: "string", maxLength: 150 },
    description: { type: "string", maxLength: 500 },
    date: { type: "string", format: "date" },
    destinationId: { type: "string" }
  },
  required: ["id"],
  additionalProperties: false,
};

async function UpdateAbl(req, res) {
  try {
    let activity = req.body;

    
    const valid = ajv.validate(schema, activity);
    if (!valid) {
      res.status(400).json({
        code: "dtoInIsNotValid",
        message: "dtoIn is not valid",
        validationError: ajv.errors,
      });
      return;
    }

    
    if (activity.date && new Date(activity.date) >= new Date()) {
      res.status(400).json({
        code: "invalidDate",
        message: `Date must be current day or a day in the past.`,
        validationError: ajv.errors,
      });
      return;
    }

    const updatedActivity = activityDao.update(activity);
    if (!updatedActivity) {
      res.status(404).json({
        code: "activityNotFound",
        message: `Activity with id ${activity.id} not found.`,
      });
      return;
    }

    if (updatedActivity.destinationId) {
      const destination = destinationDao.get(updatedActivity.destinationId);
      if (!destination) {
        res.status(400).json({
          code: "destinationDoesNotExist",
          message: `Destination with id ${updatedActivity.destinationId} does not exist.`,
        });
        return;
      }
      updatedActivity.destination = destination;
    }

    res.json(updatedActivity);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = UpdateAbl;