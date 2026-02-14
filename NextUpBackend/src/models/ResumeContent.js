import mongoose from "mongoose";

const sectionSchema = new mongoose.Schema({
    title: { type: String, required: true }, // e.g., "Skills", "Projects", "Experience"
    description: { type: String, required: true },
    companyName: { type: String }, // Optional: For experience section
    link: { type: String }, // Optional: For project or company links
    purpose: { type: String }, // Optional: For sections like "Why Hire Me"
});

const resumeContentSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
            unique: true, // Ek user ka ek hi resume content document hoga
        },
        linkedin: { type: String },
        github: { type: String },
        sections: [sectionSchema], // Array of different resume sections
    },
    { timestamps: true }
);

export default mongoose.model("ResumeContent", resumeContentSchema);