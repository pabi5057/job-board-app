import React, { useState } from "react";
import { toast } from "react-toastify";

const ApplyModal = ({ isOpen, onClose, jobTitle }) => {
  const [resumeFile, setResumeFile] = useState(null);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData();
    formData.append("name", form.name.value);
    formData.append("email", form.email.value);
    formData.append("contact", form.contact.value);
    formData.append("experience", form.experience.value);
    formData.append("salary", form.salary.value);
    formData.append("resume", resumeFile);

    try {
        const res = await fetch("/api/apply", {
            method: "POST",
            body: formData,
          });
        
        const data = await res.json();
        if(data.success) {
            toast.success("Application submitted successfully!");
            setResumeFile(""); 
            onClose();
        }else{
            toast.error("Failed to submit application. Please try again.");

        }


    } catch (error) {
        console.error("API error:", error);
        alert("Something went wrong.");
    }
    
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl p-6 w-100  max-w-xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Apply for {jobTitle}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800 hover:bg-gray-400 px-2 rounded-full  transition">
            ✕
          </button>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="experience"
            placeholder="Experience (e.g., 2 years)"
            required
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            name="salary"
            placeholder="Expected Salary"
            required
            className="w-full p-2 border rounded"
          />

          
          <div className="w-full border-2 border-dashed border-gray-300 p-4 rounded text-center">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Upload Resume (PDF, DOCX)
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              className="w-full text-sm"
            />
            {resumeFile && (
              <p className="mt-2 text-green-600 text-sm">{resumeFile.name}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Submit Application
          </button>
        </form>
      </div>
    </div>
  );
};

export default ApplyModal;
