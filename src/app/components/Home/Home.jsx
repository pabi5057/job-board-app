import { getServerSession } from "next-auth";
import FeaturedJobs from "./FeaturedJobs";
import Hero from "./Hero";
import JobCategory from "./JobCategory";
import { authOptions } from "@/auth";

async function Home() {
      const session = await getServerSession(authOptions);
    return (
        <>
            <div>
                <Hero/>
                <JobCategory/>
                <FeaturedJobs session={session}/>
            </div>
        </>
    );
}

export default Home;