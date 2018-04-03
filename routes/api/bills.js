const router = require("express").Router();
const billsController = require("../../controllers/billsController");

// Matches with "/api/bills"
router.route("/")
  // .get(billsController.find)
  .post(billsController.create)
  .put(billsController.update);

// Matches with "/api/bills/:id"
router
  .route("/:id")
  .get(billsController.findById)
  // .put(billsController.update)
  .delete(billsController.remove);

module.exports = router;
