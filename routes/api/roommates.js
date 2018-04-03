const router = require("express").Router();
const roommatesController = require("../../controllers/roommatesController");

// Matches with "/api/roommates"
router.route("/")
  // .get(roommatesController.find)
  .post(roommatesController.create)
  .put(roommatesController.update);

// Matches with "/api/roommates/:id"
router
  .route("/:id")
  .get(roommatesController.findById)
  .delete(roommatesController.remove);

module.exports = router;
