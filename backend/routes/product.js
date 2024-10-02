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
const { uploadImages } = require("../controllers/uploadImage");
const { imageType } = require("../middleware/imageType");

router.post("/images", imageType, uploadImages);

router.post("/products", addProduct);
router.get("/products", getAllProducts);
router.get("/products/:id", getProductById);
router.put("/products/:id", authentication, updateProductById);
router.delete("/products/:id", authentication, deleteProductById);
module.exports = router;
