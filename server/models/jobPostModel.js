const mongoose = require("mongoose");

const jobPostSchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: [true, "Job title is required."],
  },
  jobDescription: {
    type: String,
    required: [true, "Job description is required."],
  },
  experienceLevel: {
    type: String,
    required: [true, "Experience level is required."],
  },
  addCandidate:{
    type:[String],
    required:[true,"Candidates are required."]
  },
  endDate:{
    type:Date,
    required:[true,"End Date is required."],
    default:new Date()
  }
},{timestamps:true});

const Posts = mongoose.model("Posts",jobPostSchema);

module.exports = Posts;