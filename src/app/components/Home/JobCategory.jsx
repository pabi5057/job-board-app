"use client";

import { useEffect, useState } from "react";
import Heading from "../Helper/Heading";
import JobCategoryCard from "../Helper/JobCategoryCard";
import AOS from "aos";
import "aos/dist/aos.css";
import icon1 from '/public/images/icon1.png'
import icon2 from '/public/images/icon2.png'
import icon3 from '/public/images/icon3.png'
import icon4 from '/public/images/icon4.png'
import icon5 from '/public/images/icon5.png'
import icon6 from '/public/images/icon6.png'
import icon7 from '/public/images/icon7.png'
import icon8 from '/public/images/icon8.png'
import icon9 from '/public/images/icon9.png'
import { SyncLoader } from "react-spinners";

const CATEGORY_CONFIG = [
    { name: "Finance", icon: icon1 },
    { name: "Marketing", icon: icon2 },
    { name: "Design", icon: icon3 },
    { name: "Development", icon: icon4 },
    { name: "Human resource", icon: icon5 },
    { name: "Automative Jobs", icon: icon6 },
    { name: "Customer Service", icon: icon7 },
    { name: "Health and Care", icon: icon8 },
    { name: "Project Management", icon: icon9 },
];

function JobCategory() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [categoryCounts, setCategoryCounts] = useState({});

    useEffect(() => {
        AOS.init();
    }, []);

    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const res = await fetch("/api/posts");
                const data = await res.json();
                if (data.success) {
                    setJobs(data.posts);
                } else {
                    console.error(data.error);
                }
            } catch (err) {
                console.error("Fetch error:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchJobs();
    }, []);

    useEffect(() => {
        const grouped = {};
        jobs.forEach(job => {
            const category = job.jobcategory;
            if (grouped[category]) {
                grouped[category]++;
            } else {
                grouped[category] = 1;
            }
        });
        setCategoryCounts(grouped);
    }, [jobs]);

    return (
        <div className="pt-20 pb-12">
            <Heading mainHeading="Popular Job categories" subHeading="2020 jobs live - 293 added today." />
            <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[4rem] gap-[3rem] items-center">
                {
                    loading ? (
                        <div className="flex justify-center items-center col-span-2  lg:ml-72">
                            <SyncLoader color="#3B82F6" size={15} margin={5} speedMultiplier={1.5} />
                        </div>
                    ) : (
                        <>
                            {CATEGORY_CONFIG.map(({ name, icon }) => (
                                <JobCategoryCard
                                    key={name}
                                    image={icon}
                                    category={name}
                                    openPosition={categoryCounts[name] || 0}
                                    loading={loading}
                                />
                            ))}
                        </>

                    )
                }
            </div>
        </div>
    );
}

export default JobCategory;
