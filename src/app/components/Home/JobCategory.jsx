import Heading from "../Helper/Heading";
import JobCategoryCard from "../Helper/JobCategoryCard";
import icon1 from '/public/images/icon1.png'
import icon2 from '/public/images/icon2.png'
import icon3 from '/public/images/icon3.png'
import icon4 from '/public/images/icon4.png'
import icon5 from '/public/images/icon5.png'
import icon6 from '/public/images/icon6.png'
import icon7 from '/public/images/icon7.png'
import icon8 from '/public/images/icon8.png'
import icon9 from '/public/images/icon9.png'

function JobCategory() {
    return (
        <>
            <div className="pt-20 pb-12">
                <Heading mainHeading="Popular Job categories" subHeading="2020 jobs live - 293 added today." />
                <div className="w-[80%] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-[4rem] gap-[3rem] items-center">
                    <JobCategoryCard image={icon1} category="Finance" openPosition="23" />
                    <JobCategoryCard image={icon2} category="Marketing" openPosition="13" />
                    <JobCategoryCard image={icon3} category="Design" openPosition="33" />
                    <JobCategoryCard image={icon4} category="Development" openPosition="23" />
                    <JobCategoryCard image={icon5} category="Humen resource" openPosition="33" />
                    <JobCategoryCard image={icon6} category="Automative Jobs" openPosition="35" />
                    <JobCategoryCard image={icon7} category="Customer Service" openPosition="13" />
                    <JobCategoryCard image={icon8} category="Health and Care" openPosition="03" />
                    <JobCategoryCard image={icon9} category="Project Management" openPosition="23" />

                </div>
            </div>
        </>
    );
}

export default JobCategory;