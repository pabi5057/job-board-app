import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  image: String,
  salary:String,
  location:String,
  jobtype:String,
});

export default mongoose.models?.Post || mongoose.model("Post", postSchema);
