const User = require("../database/models/User");
const bcrypt = require ("bcrypt");
/* const { validationResult } = require("express-validator/check"); */

module.exports = {

    postUserRegistration: (req, res) => {
        bcrypt
        .hash(req.body.password, 10)
        .then(hashPassword => {
          User.findOrCreate({
            
            where: {email: req.body.email},
            defaults: {
            name: req.body.name,
            password: hashPassword,
            location: req.body.location,
            phone: req.body.phone
          }
          })
            .then(([user]) => {         
              req.session.user = user.dataValues;
              res.send(req.session.user);
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