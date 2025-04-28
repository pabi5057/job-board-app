"use client"
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"

function ApplyButton() {
    const applyHandler=()=>{
        toast.success("Application Successful");
    }
    return ( 
        <>
           <div>
               <button onClick={applyHandler} className="px-10 rounded-lg py-3 bg-blue-600 text-white transition-all
                duration-300 font-semibold hover:bg-blue-900">Apply Now</button>
                <ToastContainer position="top-right"/>
           </div>
        </>
     );
}

export default ApplyButton;