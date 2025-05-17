import Heading from "@/app/components/Helper/Heading";
import JobCard from "@/app/components/Helper/JobCard";
import Link from "next/link";

async function getPosts() {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const res = await fetch(`${baseUrl}/api/posts`, {
        cache: 'no-store',
    });

    if (!res.ok) throw new Error('Failed to fetch posts');
    return res.json();
}

async function JobCategoryPage({ params }) {
    const postData = await getPosts();
    const jobcategory = decodeURIComponent(params?.jobcategory || "");
    const filterJobs=postData?.posts?.filter((item)=>item.jobcategory===jobcategory);
    return (
        <>
            <div className="pt-20 pb-12">
                   <Heading mainHeading="Featured jobs" subHeading="Know your worth and find the job that quality your life" />
                   <div className="mt-12 w-[80%] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
                     
                         <>
                           {filterJobs?.map((job) => (
                             <div key={job?._id}>
                               <JobCard job={job}  />
                             </div>
                           ))}
                         </>
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

export default JobCategoryPage;