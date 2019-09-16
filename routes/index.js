const router = require("express").Router();
const apiRoutes = require("./api");
require("dotenv").config();

// API Routes
router.use("/api", apiRoutes);

module.exports = router;