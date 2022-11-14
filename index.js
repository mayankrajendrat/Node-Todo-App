// import all the necessary packages
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
// we are using port 8000
//const port = 8000;
const port = process.env.PORT || 8000;

// we will create these todoRoutes in the future
const todoRoutes = require("./routes/Todo");

const app = express();
const uri = process.env.MONGODB_URI;
//const localURI = "mongodb://127.0.0.1:27017/todoapp";

// DB connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log("CONNECTED TO DATABASE");
  });

// middleware for cors to allow cross origin resource sharing
app.use(cors());
// middleware to convert our request data into JSON format
app.use(bodyParser.json());

// include the todoRoutes
app.use("/api", todoRoutes);

// start the server in the port 8000
app.listen(port, () => {
  console.log(`Listening to http://localhost:${port}`);
});
