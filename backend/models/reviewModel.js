import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({

    title: {
        type: String, required: true
    },
    content: {
        type: String, required: true
    },
    active: {
        type: Boolean, default: 1
    }
}, { timestamps: true });

export const Review = mongoose.model("Reviews", reviewSchema);