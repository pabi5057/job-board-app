
"use client";
import Image from "next/image";
import { FaMapLocation } from "react-icons/fa6";
import { BiMoney } from "react-icons/bi";
import { FaRegBookmark } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEye } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import { useRouter } from "next/navigation";
import EditListingModal from "./EditListingModal";
import "aos/dist/aos.css";
import Aos from "aos";
import DeleteModal from "./DeleteModal";
function JobCard({ job, session,fetchJobs }) {

  const [deleteModalOpen,setDeleteModalOpen]=useState(false);
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [bookmarkedJobs, setBookmarkedJobs] = useState([]);
  const menuRef = useRef(null);
  const router=useRouter();

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("bookmarkedJobs")) || [];
    setBookmarkedJobs(stored);
}, []);


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  
  const handleIsClick=()=>{
    setIsOpen(true);
    setOpen(false);
  }

  const handleClose=()=>{
    setIsOpen(false);
  }

  const  handleDeleteClick=()=>{
     setDeleteModalOpen(true);
  }
  
  const handleDeleteClose=()=>{
    setDeleteModalOpen(false);
  }
  
  const toggleBookmark = (jobId) => {
    let updatedBookmarks;
    if (bookmarkedJobs.includes(jobId)) {
        updatedBookmarks = bookmarkedJobs.filter(id => id !== jobId);
    } else {
        updatedBookmarks = [...bookmarkedJobs, jobId];
    }
    setBookmarkedJobs(updatedBookmarks);
    localStorage.setItem("bookmarkedJobs", JSON.stringify(updatedBookmarks));
};

  useEffect(() => {
    Aos.init({
      duration: 800, 
      once: true,    
    });
  }, []);


  return (
    <>
      <div data-aos="zoom-in-up" className="p-4 mb-6 relative border-2 cursor-pointer hover:scale-110 hover:shadow-sm transition-all duration-300 border-gray-500/10 rounded-lg">
        <div className="flex items-center space-x-6">
          <div>
            <Image src={job?.image} alt={job?.title} width={50} height={50} />
          </div>
          <div>
            <h1 className="text-[17px] mb-[0.4rem] font-semibold">{job?.title}</h1>
            <div className="flex items-center md:space-x-10 space-x-4">
              <div className="flex items-center space-x-2">
                <FaMapLocation className="w-[0.8rem] h-[0.8rem] text-pink-700" />
                <p className="text-[14px] text-black/60 font-semibold">{job?.location}</p>
              </div>
              <div className="flex items-center space-x-2">
                <BiMoney className="w-[0.8rem] h-[0.8rem] text-pink-700" />
                <p className="text-[14px] text-black/60 font-semibold">{job?.salary}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4 mt-[1rem]">
              <div className="text-[10px] sm:text-[14px] text-white/80 px-3 sm:px-6 py-1 rounded-full  font-semibold capitalize  bg-green-400/60 hover:bg-green-500">
                {job?.jobtype}
              </div>
              <div className="text-[10px] sm:text-[14px] text-white/80 px-3 sm:px-6 py-1 rounded-full  font-semibold capitalize bg-red-400/50 hover:bg-red-500">
                Private
              </div>
              <div className="text-[10px] sm:text-[14px] text-white/80 px-3 sm:px-6 py-1 rounded-full  font-semibold capitalize bg-blue-400/60 hover:bg-blue-600">
                Urgent
              </div>
            </div>
          </div>
        </div>

        <div className="absolute top-[1rem] right-[1rem]" ref={menuRef}>
          <BsThreeDotsVertical onClick={() => toggleMenu()} className="w-[1rem] h-[1rem] cursor-pointer" />
          {open && (
            <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-[100]">
              <ul className="text-sm text-gray-700">
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg" 
                  onClick={() => {
                    toggleBookmark(job._id);
                    setOpen(false); 
                    toast.success(bookmarkedJobs.includes(job._id)?"Remove Bookmarked successfully":"Add Bookmarked successfully ", {
                      toastId: "job-delete-success"
                    });
                  } }
                  title={bookmarkedJobs.includes(job._id) ? "Remove Bookmark" : "Add to Bookmark"}
                >
                  <FaRegBookmark /> Bookmark
                </li>
                {
                   session?.user?.name ==job?.user?.name && session?.user?.role=='recruiter' && (
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg" onClick={handleIsClick}>
                      <FaEdit /> Edit
                    </li>
                  )
                }
                {
                  session?.user?.name ==job?.user?.name && session?.user?.role=='recruiter'  && (
                    <li  onClick={handleDeleteClick} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600 rounded-lg">
                      <MdDelete /> Delete
                      
                    </li>
                    
                  )
                }
                <Link href={`/job/jobdetails/${job._id}`} key={job._id}>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer rounded-lg">
                    <FaEye /> View Details
                  </li>
                </Link>
              </ul>
            </div>
          )}
        </div>
      </div>
      {isOpen && (
        <EditListingModal
          isOpen={isOpen}
          onClose={handleClose}
          job={job}
        />
      )}
      {
        <DeleteModal open={deleteModalOpen} onClose={handleDeleteClose} id={job._id} fetchJobs={fetchJobs}/>
      }
    </>
  );
}

export default JobCard;
