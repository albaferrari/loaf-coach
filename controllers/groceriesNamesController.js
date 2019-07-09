const Groceries = require ("../database/models/Groceries");

module.exports = {
    getGroceries: (req, res) => {
        Groceries.findAll ({ where: { userId: req.session.user.id }})
        .then(groceries =>
            res.send(groceries))
        .catch(error => console.error(`Something went wrong when getting groceries names:${error.stack}`))
    },

    getOtherUsersGroceries: (req, res) => {
        Groceries.findAll ({ where: { userId: req.body.id }})
        .then(groceries => {
            console.log(groceries)
        })
        .catch(error => console.error(`Something went wrong when getting OTHER USERS' groceries names:${error.stack}`))
    }
}