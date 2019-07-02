const User = require("../database/models/User");

/* module.exports = {
    getMarker: (req, res) => {
        User.findAll().then(
            user => {
                console.log(user.dataValues.location)
            }
        )
        .catch(error => {
            console.error(`Cannot find user to get marker: ${error.stack}`);
          });
    }
} */