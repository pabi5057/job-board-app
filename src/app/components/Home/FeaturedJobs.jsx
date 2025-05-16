"use client";

import Link from "next/link";
import JobData from "../../../../data";
import Heading from "../Helper/Heading";
import JobCard from "../Helper/JobCard";
import { useEffect, useState } from "react";
import { ClipLoader,SyncLoader } from "react-spinners";

function FeaturedJobs({ session }) {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      const res = await fetch("/api/posts");
      const data = await res.json();
      if (data.success) {
        setJobs(data.posts);
        setLoading(false);
      } else {
        console.error(data.error);
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <>
      <div className="pt-20 pb-12">
        <Heading mainHeading="Featured jobs" subHeading="Know your worth and find the job that quality your life" />
        <div className="mt-12 w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          {
            loading ? (
              <div className="flex justify-center items-center col-span-2">
                <SyncLoader color="#3B82F6" size={15} margin={5} speedMultiplier={1.5} />
              </div>
            ) : (
              <>
                {jobs?.map((job) => (
                  <div key={job?._id}>
                    <JobCard job={job} session={session} />
                  </div>
                ))}
              </>
            )
          }
        </div>

        <Link href="/job/alljobs">
          <div className="text-center mt-[3rem]">
            <button className="px-8 py-2 font-semibold hover:bg-blue-900 transition-all duration-300 bg-blue-700 rounded-lg text-white">
              View All Job
            </button>

          </div>
        </Link>
      </div>
    </>
  );
}

export default FeaturedJobs;