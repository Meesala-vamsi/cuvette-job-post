const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:[true,"name field is required."]
  },
  email:{
    type:String,
    validate:[
      validator.isEmail,"Enter a valid email address"
    ],
    unique:true,
    required:[true,"Email field is required."]
  },
  phone:{
    type:Number,
    required:[true,"Phone field is required."],
    min:10
  },
  companyName:{
    type:String,
    required:[true,"Company name is required."]
  },
  employeeSize:{
    type:Number,
    required:[true,"Employee Size field is required."]
  },
  password:{
    type:String,
    required:[true,"Password field is required."]
  },
  emailVerified:{
    type:Boolean,
    required:[true,"Email Verified is required."],
    default:false
  }
},{timestamps:true});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.comparePasswords = async function (pass, passDB) {
  return await bcrypt.compare(pass, passDB);
};

const Users = mongoose.model("Users",userSchema);

module.exports = Users;