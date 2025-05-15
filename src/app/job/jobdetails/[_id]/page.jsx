import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import JobData from "../../../../../data";
import JobCard from "@/app/components/Helper/JobCard";
import ApplyButton from "@/app/components/Helper/ApplyButton";
import Link from "next/link";

//fetch post
async function getPosts() {
    const res = await fetch('http://localhost:3000/api/posts', {
      cache: 'no-store',
    });
  
    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
  }

export default async function JobDetails({ params }) {
    const postData = await getPosts();
  
    const jobId = await params?._id;
    const session = await getServerSession(authOptions);

    const singleJob = postData?.posts.find((job) => job._id == jobId);

    const firstFourJob=postData?.posts.slice(0,4);

    return (
        <div className="mt-20 mb-12">
            <div className="block sm:flex items-center justify-between w-[80%] mx-auto">
                <div className="flex-[0.7]">
                    <JobCard job={singleJob} session={session}/>
                </div>
                {session && <ApplyButton job={singleJob}/>}
                {!session && (
                    <Link href="/signup" className="px-8 py-3 bg-emerald-600 rounded-lg text-white">Signu Up To apply</Link>
                )}
            </div>
            <div className="mt-16 w-[80%] mx-auto">
                <h1 className="text-[20px] font-semibold">Job Description</h1>
                <p className="mt-4 text-black/70 ">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis, temporibus perferendis error aliquid consequuntur dolore
                    excepturi rem nulla ex sunt, magni ad laboriosam possimus magnam,
                    doloribus nam sequi perspiciatis nihil nisi aliquam.
                    Facilis, temporibus perferendis error aliquid consequuntur dolore
                    excepturi rem nulla ex sunt, magni ad laboriosam possimus magnam,
                </p>

                <h1 className="text-[20px] font-semibold mt-8">Key Responsibility</h1>
                <p className="mt-4 text-black/70 ">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Facilis, temporibus perferendis error aliquid consequuntur dolore
                    excepturi rem nulla ex sunt, magni ad laboriosam possimus magnam,
                    doloribus nam sequi perspiciatis nihil nisi aliquam.
                    Facilis, temporibus perferendis error aliquid consequuntur dolore
                    excepturi rem nulla ex sunt, magni ad laboriosam possimus magnam,
                </p>
                <h1 className="text-[20px] font-semibold mt-8">Skills</h1>
                  <ul className="mt-4">
                    <li className="mt-4 text-black/70" >React Js</li>
                    <li className="mt-4 text-black/70">Next Js</li>
                    <li className="mt-4 text-black/70">Tailwind CSS</li>
                    <li className="mt-4 text-black/70">Typescript</li>
                    <li className="mt-4 text-black/70">Next Auth</li>
                  </ul>
                  <h1 className="text-[20px] font-semibold mt-8">Related Jobs</h1>
                  <div className="mt-4">
                {
                    firstFourJob.map((job)=>{
                        return (  
                            <JobCard key={job._id} job={job} session={session} />
                          )
                    
                    })
                }
            </div>
            </div>
        </div>
    );
}
