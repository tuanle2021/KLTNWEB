const express = require("express");
const router = express.Router();

const { addProduct } = require("../controllers/productControllers");
const { addCategory } = require("../controllers/categoriesControllers");

router.post("/products", addProduct);
router.post("/categories", addCategory);

module.exports = router;
