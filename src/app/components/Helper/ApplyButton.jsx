"use client"
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import ApplyModal from "./ApplyModal";

function ApplyButton({ job }) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleApplyClick=()=>{
        setTimeout(()=>{
            setIsModalOpen(true)
        },600)
    }

    return (
        <>
            <div>
                <button onClick={handleApplyClick} className="px-10 rounded-lg py-3 bg-blue-600 text-white transition-all
                duration-300 font-semibold hover:bg-blue-900">Apply Now</button>
            </div>
            <ApplyModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                jobTitle={job.title}
            />
        </>
    );
}

export default ApplyButton;