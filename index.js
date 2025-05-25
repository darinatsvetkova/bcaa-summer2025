const express = require("express");
const cors = require("cors");

const destinationController = require("./controller/destination");
const activityController = require("./controller/activity");

const app = express();
const port = 3000;


app.use(cors());
app.use(express.json());


app.use("/destination", destinationController);
app.use("/activity", activityController);

app.listen(port, () => {
  console.log(`Server běží na http://localhost:${port}`);
});