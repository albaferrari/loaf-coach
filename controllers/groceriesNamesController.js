const Groceries = require ("../database/models/Groceries");

module.exports = {
    getGroceries: (req, res) => {
        Groceries.findAll ({ where: { userId: req.session.user.id }})
        .then(groceries =>
            res.send(groceries))
        .catch(error => console.error(`Something went wrong when getting groceries names:${error.stack}`))
    }
}