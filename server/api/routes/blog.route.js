const { Router } = require("express");
const router = Router();
const multer = require("multer");
const uploadMW = multer({ dest: "public/uploads/" });

const {
  create,
  showAll,
  showById,
  upload,
} = require("../controllers/blog.controller");

router.post("/", uploadMW.single("files"), create);
router.get("/", showAll);
router.get("/:blog_id", showById);
router.put("/", uploadMW.single("files"), upload);

module.exports = router;
