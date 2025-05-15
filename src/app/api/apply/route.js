import cloudinary from "@/lib/cloudinary";
import { connectToDatabase } from "@/lib/mongodb";
import Apply from "@/models/Apply";
import { NextResponse } from "next/server";



export async function POST(req) {
    try {
       await connectToDatabase();
       const formData=await req.formData();
         const name=formData.get("name");
            const email=formData.get("email");
            const contact=formData.get("contact");
            const experience=formData.get("experience");
            const salary=formData.get("salary");
            const resumeFile=formData.get("resume");
        
            const buffer=Buffer.from(await resumeFile.arrayBuffer());

            const result = await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream({
                    resource_type: "raw",
                    folder: "resumes",
                    public_id: `${Date.now()}_${resumeFile.name}`,
                    type: "upload",
                    format:"pdf"
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }).end(buffer);

            });

            const newApplication =await Apply.create({
                name,
                email,
                contact,
                experience,
                salary,
                resumeUrl: result.secure_url,
            });
            await newApplication.save();
            return NextResponse.json({ success: true, message: "Resume uploaded successfully", application: newApplication }, { status: 200 });
      

    } catch (error) {
        console.error("Cloudinary Upload Error:", error);
    return NextResponse.json({ success: false, error: "Resume upload failed" }, { status: 500 });
    }
}
