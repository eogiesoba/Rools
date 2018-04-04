const router = require("express").Router();
// Requiring our custom middleware for checking if a user is logged in
const passport = require("../../config/passport");


// Matches with "/api/logout"
router.route("/")
    .get(function (req, res) {
        req.logout();
        res.redirect('/');
    });


module.exports = router;







