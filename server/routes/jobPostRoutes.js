const express = require("express");
const postController = require("../controllers/jobPostController");
const authController = require("../controllers/authController");

const router = express.Router()

router.post("/create",postController.postJob);


module.exports = router;