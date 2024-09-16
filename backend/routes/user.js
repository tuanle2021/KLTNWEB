const express = require("express");
const { register } = require("../controllers/userControllers");
const { activateAccount } = require("../controllers/userControllers");
const router = express.Router();

router.post("/register", register);
router.post("/activate", activateAccount);

module.exports = router;
