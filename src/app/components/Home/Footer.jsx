import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";

function Footer() {
    return (
        <>
            <div className="pt-[5rem] pb-[3rem] bg-[#111111]">
                <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
             gap-[3rem] items-start pb-[2rem] border-b-2 border-white/20">

                    {/* !st part of footer */}
                    <div>
                        <h1 className="text-[24px] text-white mb-[1rem] font-bold uppercase">Jobify</h1>
                        <p className="text-[14px] text-white/70 ">
                            Explore exciting career opportunities and connect with employers looking for skilled and passionate individuals.
                        </p>
                        {/* Socials icons */}
                        <div className="mt-[1.5rem] flex items-center space-x-3">
                            <div className="w-[2.3rem] h-[2.4rem] bg-blue-600 rounded-full flex items-center
                              justify-center flex-col">
                                <FaFacebook className="text-white" />
                            </div>
                            <div className="w-[2.3rem] h-[2.4rem] bg-sky-400 rounded-full flex items-center
                              justify-center flex-col">
                                <FaTwitter className="text-white" />
                            </div>
                            <div className="w-[2.3rem] h-[2.4rem] bg-red-600 rounded-full flex items-center
                              justify-center flex-col">
                                <FaYoutube className="text-white" />
                            </div>
                            <div className="w-[2.3rem] h-[2.4rem] bg-red-400 rounded-full flex items-center
                              justify-center flex-col">
                                <FaInstagram className="text-white" />
                            </div>

                        </div>
                    </div>
                    {/* 2nd part of footer */}
                    <div>
                        <h1 className="text-[22px] w-fit text-white font-semibold mb-[1.5rem]">About Us</h1>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">Job</p>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">Privacy</p>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">Policy</p>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">Application</p>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">Candidates</p>
                    </div>
                    {/* 3rd part of footer */}
                    <div>
                        <h1 className="text-[22px] w-fit text-white font-semibold mb-[1.5rem]">Quick Link</h1>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">All Job</p>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">Job Details</p>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">How To Apply</p>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">Resume</p>
                    </div>
                    {/* 4th part of footer */}
                    <div>
                        <h1 className="text-[22px] w-fit text-white font-semibold mb-[1.5rem]">Get in Tech</h1>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">+0122346789</p>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">example12@gmail.com</p>
                        <p className="text-[15px] w-fit text-white/25 hover:text-yellow-300 cursor-pointer 
                        mb-[0.7rem]">Surat,Gujarat,India</p>
                    </div>
                </div>
                  <h1 className="mt-[2rem] text-[14px] w-[80%] mx-auto text-white/50">&copy;COPYRIGHT BY P2 DEVELOPER -2025</h1>
            </div>
        </>
    );
}

export default Footer;