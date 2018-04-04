const router = require("express").Router();
const billsController = require("../../controllers/billsController");

// Matches with "/api/bills"
router.route("/")
  .post(billsController.create)
  .put(billsController.update);

// Matches with "/api/bills/:id"
router
  .route("/:id")
  .get(billsController.findById)
  .delete(billsController.remove);

module.exports = router;
