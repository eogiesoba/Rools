const router = require("express").Router();
const usersController = require("../../controllers/usersController");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");

// Matches with "/api/login"
router.route("/")
    .post(function (req, res) {
        passport.authenticate("local")
            .then(function(data){
                if(isAuthenticated){
                    //Redirect to books page
                    res.json(data);
                }
                else{
                    //Redirect to login page
                }
            })
            .catch(err => res.status(422).json(err));
        });




