const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const listingRoute = require("./routes/listingRoute");
const adminRoute = require("./routes/adminRoute");
const paymentRoute=require("./routes/paymentRoute");
const dailyCheck=require("./automation/autoMate");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB!');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use('/api/user', userRoute);
app.use('/api/auth', authRoute);
app.use('/api/admin', adminRoute);
app.use('/api/listing', listingRoute);
app.use('/api/pay', paymentRoute);


dailyCheck()
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}!`);
});
