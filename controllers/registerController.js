const User = require("../database/models/User");
const bcrypt = require ("bcrypt");
const { validationResult } = require("express-validator/check");

module.exports = {

    test: (req, res) => {
        res.send("lalalalalalalala test alalalalalalalalal");
    },

    postUserRegistration: (req, res) => {
        const errors = validationResult(req);
    
        if(!errors.isEmpty()){
          req.session.error = errors.array();
        }else{
        bcrypt
        .hash(req.body.password, 10)
        .then(hashPassword => {
          User.create({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            location: req.body.location,
            phone: req.body.phone
          })
            .then(results => {
              req.session.user = results.dataValues;
              console.log("User's session after registration: ", req.session.user);
              res.send(results.dataValues);
            })
            .catch(error => {
              console.error(`Cannot create user: ${error.stack}`);
            });
        })
        .catch(error =>
            console.error(`Something went wrong when hashing password: ${error.stack}`)
          );
        }
      }
}