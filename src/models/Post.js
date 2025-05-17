import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: String,
  image: String,
  salary:String,
  location:String,
  description:String,
  skills:[String],
  jobtype:String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  jobcategory:String,
});

export default mongoose.models?.Post || mongoose.model("Post", postSchema);
