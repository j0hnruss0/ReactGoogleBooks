const router = require("express").Router();
const apiRoutes = require("./api");
require("dotenv").config();

// API Routes
router.use("/api", apiRoutes);

router.use(function(req, res) {
    res.sendFile(path.join(__dirname, "../client/build/index.html"));
  });

module.exports = router;