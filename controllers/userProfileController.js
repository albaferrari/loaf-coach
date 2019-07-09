const User = require("../database/models/User");
const Groceries = require("../database/models/Groceries");

module.exports = {
    getUserFromMarker: (req, res) => {
        let stringifiedCoords = JSON.stringify(Object.values(req.body).reverse());

        User.findOne({ where: { location: stringifiedCoords } })
            .then(foundUser =>
                {
                    Groceries.findAll({where: {userId: foundUser.dataValues.id}})
                    .then(results => {
                        let food = results.map(element => {
                            return {
                                name: element.name
                            }
                        })
                         res.send({foundUser: foundUser.dataValues, food: food})
                    })
                    .catch()
                }
             )
            .catch(error => console.error(`Couldn't find user from location: ${error.stack}`))
    }
}