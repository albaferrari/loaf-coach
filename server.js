require("dotenv").config();
const express = require("express");
const app = express();

const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");

const { connector } = require("./database/config/dbConfig");
const port = process.env.PORT || 5000;

const registerController = require("./controllers/registerController");
const loginController = require("./controllers/loginController");
const groceriesController = require("./controllers/groceriesController");
const pointsController = require("./controllers/pointsController");
const userProfileController = require("./controllers/userProfileController");
const groceriesNamesControllers= require("./controllers/groceriesNamesController");

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
    console.log(req.session)
  }
}

function logout(req, res) {
  if (req.cookies.wowoCookie) {
    res.clearCookie("wowoCookie");
    res.send("cookies cleared");
  } else {
    res.send("there was no cookie");
  }
}

app.get("/home", (req, res) => {
  User.findAll()
    .then(userArray => {
     let locationMap = userArray.map(user => {
         return user.dataValues.location
      })
      res.send(Object.assign({},locationMap))

    }).catch(error => {
      console.error(`Cannot find user to get marker: ${error.stack}`);
    });
}
)

app.post("/register", registerController.postUserRegistration);
app.get("/register", (req, res) => {
  checkCookies(req, res)
});

app.post("/login", loginController.postUserLogin);
app.get("/login", (req, res) => {
  checkCookies(req, res)
});

app.get("/profile", (req, res) => {
  checkCookies(req, res);
});
app.post("/profile", groceriesController.groceries);
app.get("/points", pointsController.pointsCounter);

app.get("/logout", (req, res) => {
   logout(req, res);
})

app.post("/userProfileData", userProfileController.getUserFromMarker);

app.get("/user", (req, res) => {
  checkCookies(req, res);
})

app.get("/groceriesName", groceriesNamesControllers.getGroceries)


connector
  .sync()
  .then(() => {
    app.listen(port, () => console.log(`I've got ears on port: ${port}`));
  })
  .catch(error => console.error(`Couldn't sync with database: ${error.stack}`));
