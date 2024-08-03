
import express from "express";
import bodyParser from "body-parser";
import { listReviews, addReview, editReview, deleteReview, getReview } from "../controllers/reviewController.js";

const router = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.get("/", listReviews);
router.get("/:_id", getReview);
router.post("/add", addReview);
router.put("/edit", editReview);
router.delete("/:_id", deleteReview);



export default router;