const express = require("express");
const router = express.Router();

const {
  addProduct,
  getAllProducts,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productControllers");
const { authentication } = require("../middleware/authenUser");

router.post("/products", addProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", authentication, updateProductById);
router.delete("/products/:id", authentication, deleteProductById);
module.exports = router;
