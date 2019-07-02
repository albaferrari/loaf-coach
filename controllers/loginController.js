const User = require("../database/models/User");
const bcrypt = require("bcrypt");


module.exports = {

    postUserLogin: (req, res) => {
        User.findOne({
            where: { name: req.body.name }
        })
            .then(foundUser => {
                // 4 - add compare(what the user inserts and the correspondent user password into db table)
                bcrypt.compare(req.body.password, foundUser.dataValues.password)
                    .then(results => {
                        if (req.body.name !== null && results) {
                            req.session.user = foundUser.dataValues;
                            console.log("Cookies after login", req.cookies)
                            res.send(req.session.user)
                        } else {
                            console.log("Something went wrong when logging in");
                            console.log(results);
                            console.log(req.session);
                        }
                    })
                    .catch(error => console.error(`Couldn't login: ${error.stack}`));
            })
            .catch(error => console.error(`Something went wrong when comparing passwords: ${error.stack}`));
    }
};
