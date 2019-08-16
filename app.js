require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookiePaerser = require("cookie-parser");
const cors=require('cors')

const postRoutes = require("./routes/post");
const authRoutes = require("./routes/auth");
const userRoutes=require('./routes/user')

const app = express();
const PORT = process.env.PORT;

mongoose
  .connect(process.env.MONGO_DB_URL, { useNewUrlParser: true })
  .then(() => {
    console.log("Database successfully connected..");
  })
  .catch(err => {
    console.error("Database connection failed:", err);
  });

app.use(morgan("dev"));

app.use(cookiePaerser());
app.use(bodyParser.json());
app.use(cors())

app.use("/", postRoutes);
app.use("/", authRoutes);
app.use('/',userRoutes)
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({error:'unauthorized'});
  }
});

app.get("/",(req,res)=>{
  res.send("Welcome to social netowork api")
})

app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});
