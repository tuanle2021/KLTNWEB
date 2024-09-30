const express = require("express");
const router = express.Router();
const { uploadImages } = require("../controllers/uploadImage");
const { imageType } = require("../middleware/imageType");
router.post("/images", imageType, uploadImages);

module.exports = router;
