import React, { useState } from 'react'
import { IoHome } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { jobPost } from '../store/slices/posts';
import { toast } from 'react-toastify';

const Home = () => {
  const [postJob, setPostJob] = useState({
    jobTitle: "",
    jobDescription: "",
    experienceLevel: "",
    endDate:""
  });
  const dispatch = useDispatch();

  const [candidateEmails, setCandidateEmails] = useState([""]);

  const [openForm,setOpenForm] = useState(false);

  const onChangeInput=(event)=>{
    const { id, value } = event.target;

    setPostJob({
      ...postJob,
      [id]: value,
    });
  }

  const onClickCreateInterview=()=>{
    setOpenForm(true)
  }

  const handleAddEmail = () => {
    setCandidateEmails([...candidateEmails, ""]);
  };

  const handleEmailChange = (index, value) => {
    const newEmails = [...candidateEmails];
    newEmails[index] = value;
    setCandidateEmails(newEmails);
  };

   const handleRemoveEmail = (index) => {
     const newEmails = [...candidateEmails];
     newEmails.splice(index, 1);
     setCandidateEmails(newEmails);
   };

   const onSubmitJobDetails=(event)=>{
    event.preventDefault();
    dispatch(jobPost({ ...postJob, addCandidate:candidateEmails }))
    .then((response)=>{
      if(response?.payload?.status==="success"){
        toast.success(response?.payload?.message);
      }else{
        toast.success(response?.payload?.message);
      }
    })
    setCandidateEmails([])
    setPostJob({
      jobTitle: "",
      jobDescription: "",
      experienceLevel: "",
      endDate: "",
    });
   }
  return (
    <div className="px-6 py-10 w-full">
      {openForm ? (
        <form onSubmit={onSubmitJobDetails} className="mt-8">
          <div className="flex items-center gap-3 mb-5">
            <label htmlFor="title" className="font-bold">
              Job Title
            </label>
            <input
              type="text"
              placeholder="Enter job title"
              className="border border-black rounded-md h-10 w-[40%] px-3"
              onChange={onChangeInput}
              id="jobTitle"
              name="jobTitle"
              value={postJob.jobTitle}
              required
            />
          </div>

          <div className="flex items-start gap-3 mb-5">
            <label htmlFor="title" className="font-bold">
              Job Description
            </label>
            <textarea
              cols={70}
              rows={10}
              type="text"
              placeholder="Enter job Description"
              className="border border-black rounded-md  px-3"
              onChange={onChangeInput}
              id="jobDescription"
              name="jobDescription"
              value={postJob.jobDescription}
              required
            />
          </div>

          <div className="flex items-center gap-3 mb-5">
            <label htmlFor="title" className="font-bold">
              Experience Level
            </label>
            <input
              type="number"
              placeholder="Select Experience"
              className="border border-black rounded-md h-10 w-[40%] px-3"
              onChange={onChangeInput}
              id="experienceLevel"
              name="experienceLevel"
              value={postJob.experienceLevel}
              required
            />
          </div>

          <div className="flex items-center gap-3 mb-5">
            <label htmlFor="title" className="font-bold">
              Add Candidate
            </label>
            {candidateEmails.map((email, index) => (
              <div key={index} className="flex space-x-2 my-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => handleEmailChange(index, e.target.value)}
                  required
                  className="border p-2 w-full"
                />
                <button
                  type="button"
                  onClick={() => handleRemoveEmail(index)}
                  className="bg-black text-white px-3 text-sm"
                >
                  Remove
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddEmail}
              className="bg-black text-white px-3 text-sm"
            >
              Add Another Email
            </button>
          </div>

          <div className="flex items-center gap-3 mb-5">
            <label htmlFor="title" className="font-bold">
              End Date
            </label>
            <input
              type="date"
              placeholder="Enter end date"
              className="border border-black rounded-md h-10 w-[40%] px-3"
              onChange={onChangeInput}
              id="endDate"
              name="endDate"
              value={postJob.endDate}
              required
            />
          </div>
          <button type="submit" className="bg-black text-white">
            Send
          </button>
        </form>
      ) : (
        <button
          className="bg-black text-white"
          onClick={onClickCreateInterview}
        >
          Create Interview
        </button>
      )}
    </div>
  );
}

export default Home