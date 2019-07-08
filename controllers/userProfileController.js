const User = require("../database/models/User");
const axios = require("axios");

module.exports = {
    getUserFromMarker: (req, res) => {
        let stringifiedCoords = JSON.stringify(Object.values(req.body).reverse());

        User.findOne({ where: { location: stringifiedCoords } })
            .then(foundUser =>
                res.send(foundUser.dataValues)
             )
            .catch(error => console.error(`Couldn't find user from location: ${error.stack}`))
    }
}