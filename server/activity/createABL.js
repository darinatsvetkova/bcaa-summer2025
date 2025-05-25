const Ajv = require("ajv");
const addFormats = require("ajv-formats").default;
const ajv = new Ajv();
addFormats(ajv);

const activityDao = require("../../DAO/activity-dao.js");
const destinationDao = require("../../DAO/destination-dao.js");

const schema = {
  type: "object",
  properties: {
    destinationId: { type: "string" },
    name: { type: "string", maxLength: 100 },
    date: { type: "string", format: "date-time" },
    startTime: { type: "string", pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$" },
    endTime: { type: "string", pattern: "^([01]\\d|2[0-3]):([0-5]\\d)$" },
    description: { type: "string", maxLength: 250 },
  },
  required: ["destinationId", "name", "date", "startTime", "endTime"],
  additionalProperties: false,
};

async function CreateAbl(req, res) {
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

    const activityDate = new Date(activity.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (activityDate < today) {
      res.status(400).json({
        code: "invalidDate",
        message: "date must be today or in the future",
      });
      return;
    }

    const [startH, startM] = activity.startTime.split(":").map(Number);
    const [endH, endM] = activity.endTime.split(":").map(Number);
    if (startH > endH || (startH === endH && startM >= endM)) {
      res.status(400).json({
        code: "invalidTimeRange",
        message: "startTime must be before endTime",
      });
      return;
    }

    const destination = await destinationDao.get(activity.destinationId);
    if (!destination) {
      res.status(400).json({
        code: "destinationDoesNotExist",
        message: `Destination with id ${activity.destinationId} does not exist`,
      });
      return;
    }

   
    const createdActivity = await activityDao.create(activity);

   
    res.json(createdActivity);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: e.message });
  }
}

module.exports = CreateAbl;