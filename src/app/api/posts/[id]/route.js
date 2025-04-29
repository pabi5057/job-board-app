import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import Post from '@/models/Post';
import cloudinary from '@/lib/cloudinary';

export async function PUT(req, { params }) {
    
    const uploadToCloudinary = async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
    
      return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream({ folder: "jobs" }, (error, result) => {
          if (error) return reject(error);
          resolve(result.secure_url);
        }).end(buffer);
      });
    };
  try {
    const id = params.id;
    const formData = await req.formData();

    const title = formData.get("title");
    const salary = formData.get("salary");
    const location = formData.get("location");
    const jobtype = formData.get("jobtype");
    const image = formData.get("image");

    await connectToDatabase();

    const post = await Post.findById(id);
    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    post.title = title || post.title;
    post.salary = salary || post.salary;
    post.location = location || post.location;
    post.jobtype = jobtype || post.jobtype;

    if (image && typeof image === "object" && image.size > 0) {

      
        const imageUrl = await uploadToCloudinary(image);
      post.image = imageUrl; 
    }

    await post.save();

    return NextResponse.json({ message: "Post updated successfully", post }, { status: 200 });

  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}
