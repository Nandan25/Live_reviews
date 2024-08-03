import mongoose from "mongoose";

/*Connect to mongo db */

export const connect = async () => {
    try {
        await mongoose
            .connect(`mongodb://${process.env.MONGO_URI}`, {})
            .then(() => console.log(`Mongoose Connected on ${process.env.MONGO_URI}`));
    } catch (error) {

        console.log(error);
    }
};
