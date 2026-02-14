import mongoose from "mongoose";

const hard75Schema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true, // Ek user ka ek hi challenge tracker hoga
    },
    totalDays: {
      type: Number,
      default: 75,
    },
    currentDay: {
      type: Number,
      default: 1, // Challenge day 1 se start hoga
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date, // Hum isse startDate + 75 days karke set karenge
    },
    lastUpdated: {
      type: Date, // Track karne ke liye ki counter kab update hua tha
    },
    isActive: {
      type: Boolean,
      default: true, // Challenge active hai ya nahi
    }
  },
  { timestamps: true }
);

export default mongoose.model("Hard75", hard75Schema);