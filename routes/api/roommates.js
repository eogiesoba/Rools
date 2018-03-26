const router = require("express").Router();
const roommatesController = require("../../controllers/roommatesController");

// Matches with "/api/roommates"
router.route("/")
  .get(roommatesController.findAll)
  .post(roommatesController.create);

// Matches with "/api/roommates/:id"
router
  .route("/:id")
  .get(roommatesController.findById)
  .put(roommatesController.update)
  .delete(roommatesController.remove);

module.exports = router;
