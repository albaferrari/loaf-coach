require("dotenv").config();
const express = require("express");
const app = express();

const session = require("express-session");
const cookieParser = require("cookie-parser")
const morgan = require("morgan");

const { connector } = require("./database/config/dbConfig");
const port = process.env.PORT || 5000;

const registerController = require("./controllers/registerController");
const loginController = require("./controllers/loginController");
/* const markersController = require ("./controllers/markersController"); */

const User = require("./database/models/User");


app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser())
app.use(
  session({
    name: "wowoCookie",
    secret: "wowoSecret",
    resave: false,
    saveUninitialized: false,
  })
);

/* Custom Middleware */
function checkCookies(req, res) {
  if (!req.cookies.wowoCookie) {
    res.send(false);
  } else {
    res.send(true);
  }
}

app.get("/home", (req, res) => {
  User.findAll()
    .then(userArray => {
      let address = userArray.map(user => {
        return {
          location: user.dataValues.location

        }
      })
      res.send(address)
    }).catch(error => {
      console.error(`Cannot find user to get marker: ${error.stack}`);
    });
}
)


/* app.post("/", markersController.getMarker); */
app.post("/register", registerController.postUserRegistration);
app.get("/register", (req, res) => {
  checkCookies(req, res)
});

app.post("/login", loginController.postUserLogin);
app.get("/login", (req, res) => {
  checkCookies(req, res)
});

app.get("/profile", (req, res) => {
  checkCookies(req, res)
});

connector
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`I've got ears on port: ${port}`));
  })
  .catch(error => console.error(`Couldn't sync with database: ${error.stack}`));
