import isEmpty from "lodash";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

export const register = async (req, res) => {
    try {
        console.log(req.body);
        const { name, email, password } = req.body;

        const passwordHash = await bcrypt.hash(password, 10);
        const saveUser = new User({
            name: name,
            email: email,
            password: passwordHash,

        });
        const savedUser = await saveUser.save();
        console.log(savedUser);
        res.status(200).send({
            message: "User creation successfull..",
            user: savedUser,
        });
    } catch (error) { console.log(error.message); }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({
            email
        });
        if (user) {
            bcrypt.compare(password, user.password).then((resp) => {
                res.status(200).send({
                    message: "Login successfull..",
                    user: user,
                });
            });
        }
    }
    catch (error) { console.log(error.message); }
};

