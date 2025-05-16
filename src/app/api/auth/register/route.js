import { connectToDatabase } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req) {
    const { name, email, password,role,companyName,registrationNumber,zipcode,state,country } = await req.json();;
    await connectToDatabase();
  
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
    }
  
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashedPassword,role,companyName,registrationNumber,zipcode,state,country});
     const plainUser = newUser.toObject();
    return new Response(JSON.stringify({ message: "User registered", user: plainUser }), { status: 201 });
  }