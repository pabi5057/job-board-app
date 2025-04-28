import Image from "next/image";

function JobCategoryCard({ image, category, openPosition }) {
    return (
        <>
            <div className="p-4 border-2 cursor-pointer hover:scale-110 hover:shadow-sm transition-all
             duration-300 border-gray-500/10 rounded-lg ">
                <div className="flex items-center space-x-4">
                  <Image src={image} alt={category} width={60} height={60} />
                  <div>
                    <h1 className="text-[17px] font-semibold mb-[0.4rem]">{category}</h1>
                    <p className="text-[14px] text-black/50 font-semibold">({openPosition} open Position)</p>
                  </div>
                </div>
             </div>
        </>
    );
}

export default JobCategoryCard;