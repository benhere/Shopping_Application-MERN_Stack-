const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product");
const seedDB = require("./seed");
require("dotenv").config();
const cookieParser = require("cookie-parser");

mongoose
  .connect("mongodb://localhost:27017/shopping-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log(err));

// seed the local Database
//seedDB();

// grab all the routes
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

// to parse the incoming body
app.use(express.json());
// to parse cookies
app.use(cookieParser());

app.get("/hello", async (req, res) => {
  res.status(200).send("Hello from Server");
});

// fetch all products
app.use(productRoutes);
app.use(authRoutes);

app.listen(3003, () => {
  console.log("Server started at port:3003");
});
