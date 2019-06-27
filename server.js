const express = require("express");
const app = express();

const cookieParser = require("cookie-parser");
const session = require("express-session");
const morgan = require("morgan");
const flash = require("express-flash");

const cors = require("cors");
/* const {check} = require("express-validator/check"); */

require("dotenv").config();
const { connector } = require("./database/config/dbConfig");
const port = process.env.PORT || 5000;

const registerController =  require ("./controllers/registerController");

app.use(express.json());
app.use(cors())

app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  session({
    name: process.env.SESSION_COOKIE,
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);


app.get("/", (req, res) => {
  res.send({ express: "Hello from your serverrrrrr" });
});

app.get("/something", registerController.test);

app.post("/register", registerController.postUserRegistration);


connector
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`I've got ears on port: ${port}`));
  })
  .catch(error => console.error(`Couldn't sync with database: ${error.stack}`));
