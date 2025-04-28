

function Heading({mainHeading,subHeading}) {
    console.log(mainHeading)
    return ( 
        <>

            <div className="text-center p-3">
                <h1 className="text-black text-[27px] text-opacity-90 font-bold">{mainHeading}</h1>
                <p className="mt-[2rem] text-[15px] text-gray-800 text-opacity-80 font-medium" >{subHeading}</p>
            </div>

        </>
     );
}

export default Heading;