const User = require("../database/models/User");
const bcrypt = require("bcrypt");

const axios = require ("axios");
/* const { validationResult } = require("express-validator/check"); */

module.exports = {

  postUserRegistration: (req, res) => {
    bcrypt
      .hash(req.body.password, 10)
      .then(hashPassword => {
        axios
          .get(`https://api.tiles.mapbox.com/geocoding/v5/mapbox.places/${req.body.location}.json?&access_token=pk.eyJ1IjoiYWxiYWZlcnJhcmkiLCJhIjoiY2p4Yms3dzJ3MDN5dTNwcDkxdmxnbjVkNyJ9._65MsNa773gvPiLm26vtxw`)
          .then(coordinatesArray => {
            console.log(coordinatesArray.data.features[0].geometry.coordinates)
            let coordinates = JSON.stringify(coordinatesArray.data.features[0].geometry.coordinates);

            User.findOrCreate({

              where: { email: req.body.email },
              defaults: {
                name: req.body.name,
                password: hashPassword,
                location: coordinates,
                phone: req.body.phone
              }
            })

          })
                .catch(error => console.error(`Couldn't geocode address: ${error.stack}`))
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