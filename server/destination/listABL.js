const destinationDao = require("../../DAO/destination-dao.js");

async function ListAbl(req, res) {
  try {

    const destinationList = await destinationDao.list();

   
    res.json({ itemList: destinationList });
  } catch (e) {
    res.status(500).json({ code: "serverError", message: e.message || e });
  }
}

module.exports = ListAbl;
