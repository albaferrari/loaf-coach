const Groceries = require ("../database/models/Groceries");

module.exports = {
    groceries: (req, res) => {
        Groceries.findOrCreate({
            where:{
                userId: req.session.user.id,
                name: req.body.name 
            },
            defaults:{
              points: 2,
            }
        })
    }
}