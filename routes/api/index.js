const router = require("express").Router();
const bookRoutes = require("./books");
const userRoutes = require("./users");
const loginRoutes = require("./login");
const roommateRoutes = require("./roommates");
const billRoutes = require("./bills");

// Book routes
router.use("/users", userRoutes);
router.use("/login", loginRoutes);
router.use("/books", bookRoutes);
router.use("/bills", billRoutes);
router.use("/roommates", roommateRoutes);

module.exports = router;
