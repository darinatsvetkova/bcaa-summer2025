const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const destinationFolderPath = path.join(__dirname, "storage", "destinationList");

function get(destinationId) {
  try {
    const filePath = path.join(destinationFolderPath, `${destinationId}.json`);
    const fileData = fs.readFileSync(filePath, "utf8");
    return JSON.parse(fileData);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw { code: "failedToReadDestination", message: error.message };
  }
}


function create(destination) {
  try {
    const destinationList = list();

    if (destinationList.some((item) => item.name === destination.name)) {
      throw {
        code: "uniqueNameAlreadyExists",
        message: "exists destination with given name",
      };
    }

    destination.id = crypto.randomBytes(16).toString("hex");
    const filePath = path.join(destinationFolderPath, `${destination.id}.json`);
    const fileData = JSON.stringify(destination);
    fs.writeFileSync(filePath, fileData, "utf8");

    return destination;
  } catch (error) {
    throw { code: "failedToCreateDestination", message: error.message };
  }
}

function update(destination) {
  try {
    const currentDestination = get(destination.id);
    if (!currentDestination) return null;

    if (destination.name && destination.name !== currentDestination.name) {
      const destinationList = list();
      if (destinationList.some((item) => item.name === destination.name)) {
        throw {
          code: "uniqueNameAlreadyExists",
          message: "exists destination with given name",
        };
      }
    }

    const newDestination = { ...currentDestination, ...destination };
    const filePath = path.join(destinationFolderPath, `${destination.id}.json`);
    const fileData = JSON.stringify(newDestination);
    fs.writeFileSync(filePath, fileData, "utf8");
    return newDestination;
  } catch (error) {
    throw { code: "failedToUpdateDestination", message: error.message };
  }
}


function remove(destinationId) {
  try {
    const filePath = path.join(destinationFolderPath, `${destinationId}.json`);
    fs.unlinkSync(filePath);
    return {};
  } catch (error) {
    if (error.code === "ENOENT") {
      return {};
    }
    throw { code: "failedToRemoveDestination", message: error.message };
  }
}


function list() {
  try {
    const files = fs.readdirSync(destinationFolderPath);
    const destinationList = files.map((file) => {
      const fileData = fs.readFileSync(
        path.join(destinationFolderPath, file),
        "utf8"
      );
      return JSON.parse(fileData);
    });
    return destinationList;
  } catch (error) {
    throw { code: "failedToListDestinations", message: error.message };
  }
}

module.exports = {
  get,
  create,
  update,
  remove,
  list,
};