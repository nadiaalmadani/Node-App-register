import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import morgan from 'morgan'
import { DBConnection } from "./DataBase/mongoose.js";
import userRouter from "./Routes/user.routes.js";
import MongoStore from 'connect-mongo';
import categoryRouter from "./Routes/category.routes.js";
import productRouter from "./Routes/product.routes.js";
import orderRouter from "./Routes/order.routes.js";
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;


app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: 'mongodb://localhost:27017/products-api-sef',
        }),
        cookie: {
            secure: false, // Change to true in production with HTTPS
        },
    })
);

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'))

app.use('/api/images' , express.static('./uploads'))


// Routes
app.use("/users", userRouter);
app.use('/category' , categoryRouter )
app.use('/products' , productRouter)
app.use('/orders' , orderRouter)

app.use((req, res, next) => {
    console.log('Session:', req.session); // Check if session exists and contains expected values
    next();
});

// Listen
app.listen(port, () => {
    DBConnection();
    console.log(`App is running on port : ${port}`);
});
