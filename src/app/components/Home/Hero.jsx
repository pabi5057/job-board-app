"use client"

import { useCallback, useEffect } from 'react';
import JobData from '../../../../data';
import HeroImg from '/public/images/hero.svg'
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';

function Hero() {
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredJobs, setFilteredJobs] = useState([]);

    const [jobs, setJobs] = useState([]);
    
    console.log("jobs----->",filteredJobs);
      useEffect(() => {
        const fetchJobs = async () => {
          const res = await fetch("/api/posts");
          const data = await res.json();
          if (data.success) {
            setJobs(data.posts);
          } else {
            console.error(data.error);
          }
        };
    
        fetchJobs();
      }, [])

    const debounce = (func, delay) => {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    };

    const handleSearch = (text) => {
        const results = jobs.filter((job) =>
            job.title.toLowerCase().includes(text.toLowerCase())
        );
        console.log("results----->",results);
        setFilteredJobs(results);
    };

    const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), []);

    const onHandleChange = (e) => {
        setSearchTerm(e.target.value);
        debouncedHandleSearch(e.target.value);
    };
    

    return (
        <>
            <div className="pt-[5rem] pb-[3rem]">
                <div className="w-[100%] h-[60vh] flex flex-col items-center justify-center">
                    <div className="w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 items-center gap-[2rem]">
                        {/* content */}
                        <div>
                            <h1 className='text-[28px] sm:text-[35px] lg:text-[45px] xl:text-[60px] text-[#05264e]
                             leading-[3rem] lg:leading-[4rem] font-extrabold'>The <span className='text-blue-500'>Easiest Way</span><br /> To Get Your New job{" "}</h1>
                            <p className='text-[#4f5e64] text-[16px] md:text-[18px] mt-[1rem]'>Each month, more than 3 million job seekers turn to website on their search
                                for work , making over 140,000 applications every single day </p>
                            {/* search bar */}
                            <div className='mt-[1.5rem]'>
                                <input type="text" name='searchTerm' value={searchTerm} onChange={onHandleChange} placeholder='Search job.' className='w-[60%] md:w-[70%] lg:w-[75%] px-5 py-4 outline-none rounded-l-md bg-gray-200' />
                                <button className='px-5 py-4 outline-none rounded-r-md bg-blue-500 text-white'>Search</button>
                            </div>
                            {/* Search Results */}
                            {searchTerm && (
                                <div className="bg-white mt-4 p-4 rounded-md shadow-md w-[60%] md:w-[65%] lg:w-[75%]">
                                    {filteredJobs.length > 0 ? (
                                        filteredJobs.map((job) => (
                                            <Link href={`/job/jobdetails/${job._id}`} key={job._id}>
                                            <div key={job._id} className="border-b py-2">
                                                <h2 className="text-[18px] font-semibold">{job.title}</h2>
                                                <p className="text-[14px] text-gray-500">{job.location} — {job.salary}</p>
                                            </div>
                                            </Link>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No jobs found.</p>
                                    )}
                                </div>
                            )}
                        </div>
                        {/* image */}
                        <div className='hidden lg:block'>
                            <Image src={HeroImg} alt='hero' width={700} height={400} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Hero;