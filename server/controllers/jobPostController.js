const Posts = require("../models/jobPostModel");
const { asyncHandler } = require("../utils/asyncHandler");
const CustomError = require("../utils/customError");
const { transporter } = require("../utils/nodemailer");


const sendEmails = async (jobTitle, jobDescription, candidates) => {
  const mailOptions = {
    from: '"theResume.io" <vamsimeesala789@gmail.com>',
    to: candidates.join(","),
    subject: `Job Opportunity: ${jobTitle}`,
    text: `We have a new job opportunity for you!\n\n${jobDescription}`,
    html: `<p>We have a new job opportunity for you!</p><p>${jobDescription}</p>`,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Emails sent successfully!");
  } catch (error) {
    console.error("Error sending emails:", error);
  }
};

exports.postJob = asyncHandler(async (req, res, next) => {
  try {
    const { jobTitle, jobDescription, addCandidate, experienceLevel, endDate } = req.body;

    const post = await Posts.create({
      jobTitle,
      jobDescription,
      addCandidate,
      experienceLevel,
      endDate,
    });

    await sendEmails(
      req.body.jobTitle,
      req.body.jobDescription,
      req.body.addCandidate
    );

    res.status(200).json({
      status:"success",
      message: "Job posted successfully.",
      post,
    });
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
});