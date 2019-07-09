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
        console.log(req.body);
        console.log(req.session.user.id);
    }
}