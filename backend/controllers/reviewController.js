import isEmpty from "lodash";
import { Review } from "../models/reviewModel.js";
import mongoose from "mongoose";

export const listReviews = async (req, res) => {
    try {
        const reviews = await Review.find({ active: 1 }).sort({ updatedAt: - 1 });
        res.status(200).send({
            message: "Results fetched",
            reviews: reviews,
        });
    } catch (error) { console.log(error.message); }
};

export const getReview = async (req, res) => {
    try {
        const { _id } = req.params;
        const review = await Review.findOne({ _id });
        if (review)
            res.status(200).send({
                message: "Review fetched",
                reviews: review,
            });
    } catch (error) { console.log(error.message); }
};

export const addReview = async (req, res) => {
    try {
        console.log(req.body);
        const { title, content } = req.body;
        const saveReview = new Review({
            title, content
        });
        const savedReview = await saveReview.save();
        console.log(savedReview);
        res.status(200).send({
            message: "Review saved",
            review: savedReview,
        });
    } catch (error) { console.log(error.message); }
};

export const editReview = async (req, res) => {
    try {
        const { title, content, _id } = req.body;
        const review = await Review.findOne({ _id });

        if (review) {
            await Review.findOneAndUpdate({
                _id
            }, { $set: { title, content } });
            res.status(200).send({
                message: "Review edited successfully..",
                Review: review,
            });

        }
    }
    catch (error) { console.log(error.message); }
};

export const deleteReview = async (req, res) => {
    try {
        const { _id } = req.params;

        const review = await Review.findOne({ _id });
        console.log(review);
        if (review) {
            await Review.findOneAndUpdate(
                {
                    _id,
                },

                { $set: { active: 0 } }
            );
            res.status(200).send({
                message: "Review deleted successfully..",
                Review: review,
            });

        }
    }
    catch (error) { console.log(error.message); }
};


