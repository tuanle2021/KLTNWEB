const express = require("express");
const router = express.Router();
const {
  addBrand,
  getAllBrands,
  deleteBrandById,
  updateBrandById,
} = require("../controllers/brandControllers");
const { authentication } = require("../middleware/authenUser");

router.post("/brands", authentication, addBrand);
router.get("/brands", authentication, getAllBrands);
router.delete("/brands/:id", authentication, deleteBrandById);
router.put("/brands/:id", authentication, updateBrandById);

module.exports = router;
