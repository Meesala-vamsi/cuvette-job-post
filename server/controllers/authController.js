const Users = require("../models/userModel");
const { asyncHandler } = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { transporter } = require("../utils/nodemailer");

dotenv.config({ path: "./.env" });

exports.authProtectedRoute = async (req, res, next) => {
  const authHead = req.headers.authorization;
  if (authHead === undefined) {
    const error = new CustomError("Invalid jwt token", 401);
    next(error);
  }
  const token = authHead.split(" ")[1];

  if (token === undefined) {
    const error = new CustomError("Invalid jwt token", 401);
    next(error);
  } else {
    jwt.verify(token, process.env.JWT_SECRET, async (error, data) => {
      if (error) {
        const error = new CustomError("Invalid Jwt token", 401);
        return next(error);
      } else {
        const user = await Users.findById(data.id);
        req.user = user;
        next();
      }
    });
  }
};
//functionality to generate random otp..
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const generateToken = (payload, res) => {
  const createJwtToken = jwt.sign(payload, process.env.JWT_SECRET);
  return createJwtToken;
};

//Functionality to send mail...
const sendOTPEmail=(email,emailOTP)=>{
  const mailOptions = {
    from: process.env.MAIL_SENDER,
    to: email,
    subject: "Your Email OTP Code",
    text: `Your OTP code for email verification is: ${emailOTP}`,
    html: `<p>Your OTP code for email verification is: <strong>${emailOTP}</strong></p>`,
  };

  transporter.sendMail(mailOptions,(error,info)=>{
    if(error){
      console.log(error)
    }else{
      console.log("OTP sent successfully:", info.response);
    }
  })
}


//REGISTER USER..
exports.register=asyncHandler(async(req,res,next)=>{
  const checkUser = await Users.findOne({email:req.body.email});
  if (checkUser) {
    const error = new CustomError("User already exists", 400);
    return next(error);
  }

 const user= await Users.create(req.body);

  const emailOTP = generateOTP();

  sendOTPEmail(req.body.email, emailOTP);

  req.session.emailOTP = emailOTP;
  req.session.userId=user._id
  req.session.otpExpiresAt = Date.now() + 10 * 60 * 1000;
  res.status(201).json({
    status: "success",
    message: "Account created successfully.",
  });
  req.session.save();
})

//Functionality to login the user
exports.userLogin=asyncHandler(async(req,res,next)=>{
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (!user) {
    const error = new CustomError("User Not Found with provided email", 400);
    return next(error);
  }

  if (!(await user.comparePasswords(password, user.password))) {
    const error = new CustomError("Invalid Password", 404);
    return next(error);
  }

  if(!user.emailVerified){
    const error = new CustomError("Please  verify your email and mobile number to login.", 401);
    return next(error);
  }

  const token = generateToken({
    id: user._id,
    email: user.email,
    role: user.role,
    username: user.username,
  });

  res.status(200).json({
    status: "success",
    message: "Logged in successfully.",
    token,
    data: {
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
    },
  });
});


exports.verifyEmailOTP = asyncHandler(async (req, res, next) => {
  const { enteredEmailOTP } = req.body;
  console.log(enteredEmailOTP)
  console.log(req.session.emailOTP);
  console.log(req.session)
  if (enteredEmailOTP === req.session.emailOTP) {
    try {
      await Users.findByIdAndUpdate(
        { _id: req.session.userId },
        { emailVerified: true },
        { new: true, runValidators: true }
      );

      req.session.emailOTP = null;
      req.session.otpExpiresAt = null;
      req.session.userId = null;

      return res.status(200).json({ status:"success",message: "Email verification successful" });
    } catch (error) {
      return next(
        new CustomError("Failed to verify email. Please try again.", 500)
      );
    }
  } else {
    return res
      .status(400)
      .json({ message: "Invalid email OTP. Please try again." });
  }
});
