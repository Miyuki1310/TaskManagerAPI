const express = require("express");
const connectDB = require("./db/connect");
const app = express();
require("dotenv").config();
const port = process.env.PORT || 3000;
const tasks = require("./routes/tasks");
const notFound = require("./middleware/not-found");
const errorHandleMiddleware = require("./middleware/errorHandle");

//middleware
app.use(express.static("./public"));
app.use(express.json());
app.get("/", (req, res) => {});

app.use("/api/v1/tasks", tasks);

app.use(notFound);
app.use(errorHandleMiddleware);
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Example app listening at http://localhost:${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
