const router = require("express").Router();
const userRoutes = require("./users");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout")
const roommateRoutes = require("./roommates");
const billRoutes = require("./bills");

// Book routes
router.use("/users", userRoutes);
router.use("/login", loginRoutes);
router.use("/logout", logoutRoutes);
router.use("/bills", billRoutes);
router.use("/roommates", roommateRoutes);

module.exports = router;
