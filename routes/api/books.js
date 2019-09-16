const router = require("express").Router();
const booksController = require("../../controllers/booksController");

// Matches with "/api/saved"
router.route("/")
  .get(booksController.findAll)
  .post(booksController.create);

// Matches with "/api/saved/:id"
router
  .route("/:id")
  .get(booksController.findById)
  .delete(booksController.remove);

module.exports = router;