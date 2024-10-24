const express = require("express");
const cors = require("cors");
const app = express();
const port = 9000;

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const router = require('./router/routes');
app.use("/todoRouter", router);

// mongoose
const mongoose = require("mongoose");
const main = () => {
  mongoose
    .connect("mongodb://localhost:27017/todo_db")
    .then(() => console.log("Server connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB", error));
};
main();

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});