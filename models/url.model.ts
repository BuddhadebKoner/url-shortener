import mongoose from "mongoose";

const urlSchema = new mongoose.Schema({
   originalUrl: {
      type: String,
      required: true,
   },
   shortCode: {
      type: String,
      required: true,
      unique: true,
   },
   createdAt: {
      type: Date,
      default: Date.now,
   },
   creatorInfo: {
      ip: String,
      userAgent: String,
      createdAt: Date,
   },
   clicks: {
      type: Number,
      default: 0,
   },
   visits: [{
      ip: String,
      userAgent: String,
      timestamp: Date,
   }]
}, { timestamps: true });

export default mongoose.models.Url || mongoose.model("Url", urlSchema);