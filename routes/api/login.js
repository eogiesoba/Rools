const router = require("express").Router();
// Requiring our custom middleware for checking if a user is logged in
const passport = require("../../config/passport");


// Matches with "/api/login"
router.route("/")
    .post(passport.authenticate('local'), function (req, res) {
        res.json(req.user);
    })
    .get(function (req, res) {
        if (!req.user) {
            // The user is not logged in, send back an empty object
            res.json({});
        }
        else {
            // Otherwise send back the user's email and id
            res.json({
                username: req.user.username,
                email: req.user.email
            });
        }
    });


module.exports = router;







