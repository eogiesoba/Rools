const router = require("express").Router();
const usersController = require("../../controllers/usersController");
// Requiring our custom middleware for checking if a user is logged in
const isAuthenticated = require("../../config/middleware/isAuthenticated");
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
            // Sending back a password, even a hashed password, isn't a good idea
            res.json({
                email: req.user.email,
                id: req.user.id
            });
        }
    });


// router.post('/login',
//     passport.authenticate('local'),
//     function (req, res) {
//         res.redirect('/upload');
//     });

// router.route("/")
//     .post(function (req, res) {
//         passport.authenticate("local")
//             .then(function(data){
//                 if(isAuthenticated){
//                     //Redirect to books page
//                     // return ( <Redirect to='/books' /> )
//                     console.log("redirect to books page");
//                     res.json("/books");
//                 }
//                 else{
//                     console.log("redirect to login page");
//                     res.json("/");
//                     //Redirect to login page
//                     // return ( <Redirect to='/' /> )
//                 }
//             })
//             .catch(err => res.status(422).json(err));
//         });

module.exports = router;







