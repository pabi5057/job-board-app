import { connectToDatabase } from "@/lib/mongodb";
import Post from "@/models/Post";
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import mongoose, { Types } from "mongoose";

// Helper: Upload file to Cloudinary using buffer
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

// Main POST handler
export async function POST(req) {

  try {
    await connectToDatabase();

    const session = await getServerSession(authOptions);
    if (!session || !session.user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

    const formData = await req.formData();

    const title = formData.get("title");
    const salary = formData.get("salary");
    const location = formData.get("location");
    const jobtype = formData.get("jobtype");
    const imageFile = formData.get("image");

    let imageUrl = "";

    if (imageFile && typeof imageFile === "object") {
      imageUrl = await uploadToCloudinary(imageFile);
    }

    const newPost = new Post({
      title,
      salary,
      location,
      jobtype,
      image: imageUrl,
      user: userId,
    });


    await newPost.save();

    return NextResponse.json({ success: true, post: newPost }, { status: 201 });

  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

//GET METHOD
export async function GET() {
  try {
    await connectToDatabase();
    const posts = await Post.find({}).sort({ _id: -1 }).populate({ path: "user", select: "name email", strictPopulate: false });
    return NextResponse.json({ success: true, posts });

  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch posts" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    const body = req.json();
    const { id } = await body;
    if (!id) {
      return NextResponse.json({ error: 'Post ID is required' }, { status: 400 });
    }
    await connectToDatabase();
    await Post.findByIdAndDelete(id);
    return NextResponse.json({ message: 'Post deleted successfully' }, { status: 200 });
  } catch (error) {
    console.log("error");
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

