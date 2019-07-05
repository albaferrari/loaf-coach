const Groceries = require ("../database/models/Groceries");

module.exports = {
    groceries: (req, res) => {
        Groceries.create({
            name: req.body.name,
            points: 2
        })
    }
}