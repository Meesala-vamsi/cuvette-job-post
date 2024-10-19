const express = require("express");
const authController = require("../controllers/authController");

const router = express.Router()

router.post("/register",authController.register)
router.post("/login", authController.userLogin);
router.post("/verifyEmail", authController.verifyEmailOTP);
router.get("/auth-check", authController.authProtectedRoute,async (req, res) => {
  try{
    const user = req.user;
    res.status(200).json({
      status: "success",
      message: "User is authenticated.",
      user,
    });
  }catch(error){
    res.json({
      status:"failed",
      message :"something went wrong"
    })
  }
});


module.exports = router;