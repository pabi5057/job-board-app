
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["candidate", "recruiter"], required: true }, 
  companyName: { type: String },
  registrationNumber: { type: String },
  zipcode: { type: String },
  state: { type: String },
  country: { type: String },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
