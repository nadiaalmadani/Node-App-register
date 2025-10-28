import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let url = process.env.DB_URL;

export function DBConnection() {
    mongoose
        .connect(url)
        .then(() => console.log(`Connected To DateBase`))
        .catch(() => {
        console.log(`Can't Connect To DateBase`);
        });
}
