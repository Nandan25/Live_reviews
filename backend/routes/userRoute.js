
import express from "express";
import bodyParser from "body-parser";
import { register, login } from "../controllers/userController.js";

const router = express();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));


router.post("/register", register);
router.post("/login", login);



export default router;