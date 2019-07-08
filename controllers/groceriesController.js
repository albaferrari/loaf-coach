const Groceries = require ("../database/models/Groceries");

module.exports = {
    groceries: (req, res) => {
        Groceries.findOrCreate({
            where:{name: req.body.name},
            defaults:{
              points: 2,
              userId: req.session.user.id 
            }
        })
        console.log(req.body);
        console.log(req.session.user.id);
    }
}