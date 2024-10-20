const express = require("express");
const cors = require("cors");
const CustomError = require("./utils/customError");
const globalErrorController = require("./controllers/globalErrorController");
const authRoutes = require("./routes/authRoutes");
const jobRoutes = require("./routes/jobPostRoutes");
const session = require("express-session");
const dotenv = require("dotenv")
const app = express();
dotenv.config({path:"./.env"})

app.set("trust proxy", 1);

app.use(
  session({
    secret: "vamsisony",
    saveUninitialized: true,
    resave: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      httpOnly: true,
      sameSite: "none",
      maxAge: 10 * 60 * 1000,
    },
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true, 
  })
);

app.use(express.json());

app.use("/auth",authRoutes);
app.use("/job",jobRoutes);
app.use("*",(req,res,next)=>{
  const error = new CustomError(`Invalid endpoint ${req.originalUrl}`,404);
  return next(error)
});

app.use(globalErrorController);

module.exports = app;