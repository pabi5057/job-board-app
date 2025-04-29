
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

function JobCard({ job, session }) {

  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const router=useRouter();

  const toggleMenu = () => {
    setOpen((prev) => !prev);
  };


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

  //handle delete
  const handleDelete = async (jobId) => {
    try {
      const res = await fetch('/api/posts', {
        method: "DELETE",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: jobId }),
      });
  
      const data = await res.json();
  
      if (res.ok) {
        toast.dismiss(); 
        toast.success(data.message || "Job deleted successfully", {
          toastId: "job-delete-success"
        });
        setTimeout(() => {
          router.push("/");
        }, 1000)
      } else {
        toast.error(data.message || "Failed to delete job");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong!");
    }
  };

  const handleIsClick=()=>{
    setIsOpen(true);
    setOpen(false);
  }

  const handleClose=()=>{
    setIsOpen(false);
  }
  

  return (
    <>
     <ToastContainer position="top-right" autoClose={3000}/>
      <div className="p-4 mb-6 relative border-2 cursor-pointer hover:scale-110 hover:shadow-sm transition-all duration-300 border-gray-500/10 rounded-lg">
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
              <div className="text-[10px] sm:text-[14px] text-white/80 px-3 sm:px-6 py-1 rounded-full bg-opacity-30 font-semibold capitalize bg-green-700/60 hover:bg-green-700">
                {job?.jobtype}
              </div>
              <div className="text-[10px] sm:text-[14px] text-white/80 px-3 sm:px-6 py-1 rounded-full bg-opacity-30 font-semibold capitalize bg-red-500/60 hover:bg-red-500">
                Private
              </div>
              <div className="text-[10px] sm:text-[14px] text-white/80 px-3 sm:px-6 py-1 rounded-full bg-opacity-30 font-semibold capitalize bg-blue-500/40 hover:bg-blue-500">
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
                <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  <FaRegBookmark /> Bookmark
                </li>
                {
                  session && (
                    <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={handleIsClick}>
                      <FaEdit /> Edit
                    </li>
                  )
                }
                {
                  session && (
                    <li  onClick={() => handleDelete(job._id)} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-600">
                      <MdDelete /> Delete
                      
                    </li>
                    
                  )
                }
                <Link href={`/job/jobdetails/${job._id}`} key={job._id}>
                  <li className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer">
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
    </>
  );
}

export default JobCard;
