import mongoose from "mongoose";

// Chota schema har individual link ke liye
const linkItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
});

// Main schema jo user ke saare links ko hold karega
const linkCollectionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Har user ka ek hi link collection hoga
    },
    links: [linkItemSchema], // Yahan user ke saare links (title aur url ke saath) save honge
  },
  { timestamps: true }
);

export default mongoose.model("LinkCollection", linkCollectionSchema);