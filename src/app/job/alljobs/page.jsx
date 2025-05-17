"use client";


import JobCard from "@/app/components/Helper/JobCard";
import { useEffect, useState } from "react";


function AllJobs() {
    const [jobs, setJobs] = useState([]);

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

    return (
        <>
            <div className="mt-12 w-[80%] mb-12 mx-auto">
                <div className="mb-[2rem]">
                    <h1 className="font-semibold">Show Result ({jobs.length})</h1>
                </div>
                <div className="space-y-8">
                    {
                        jobs?.map((job) =>(
                            <div key={job?._id}>
                            <JobCard job={job} />
                          </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}

export default AllJobs;