import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    taskName: { type: String, required: true },
    description: { type: String },
    link: { type: String },
    isJobTask: { type: Boolean, default: false },
    isRecurring: { type: Boolean, default: false },
    priority: { type: String, enum: ["low", "medium", "high"], trim: true, default: "low", lowercase: true },
    status: { type: String, enum: ["pending", "completed", "overdue"], trim: true, lowercase: true, default: "pending" },
    conclusion: { type: String },
    startTime: { type: Date, default: Date.now },
    deadline: { type: Date },
    timeTaken: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
