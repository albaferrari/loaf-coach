const Groceries = require("../database/models/Groceries");

module.exports = {
    pointsCounter: (req, res) => {
        Groceries.sum("points", { where: { userId: req.session.user.id } })
            .then(results => {
                let noPointsYet = "You have no points yet";
                if (isNaN(results)) {
                    res.send(noPointsYet);
                } else {
                    res.send({points: results});
                }
            })
            .catch(error =>
                console.error(
                    `Something went wrong while searching for the account: ${error.stack}`
                )
            );
    }
};
