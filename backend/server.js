// const express = require("express");
// const app = express();
// const errorMiddleware=require('./middlewares/error')
// app.use(express.json())
// const dotenv = require("dotenv");
// const path = require("path");
// const productRoutes = require("./routes/productRoute");
// const connectDatabase = require("./config/database");

// dotenv.config({ path: path.join(__dirname, "config", "config.env") });

// const PORT = process.env.PORT;

// app.use("/api/v1", productRoutes);
// //middleware for error 

// app.use(errorMiddleware)
// connectDatabase();
// app.listen(PORT, () =>
//   console.log("server running succesfully on the port ", PORT)
// );



const app = require("./app");
// const cloudinary = require("cloudinary");
const connectDatabase = require("./config/database");

// Handling Uncaught Exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down the server due to Uncaught Exception`);
  process.exit(1);
});

// Config
// if (process.env.NODE_ENV !== "PRODUCTION") {
//   require("dotenv").config({ path: "backend/config/config.env" });
// }

// Connecting to database
connectDatabase();

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});

// Unhandled Promise Rejection
// process.on("unhandledRejection", (err) => {
//   console.log(`Error: ${err.message}`);
//   console.log(`Shutting down the server due to Unhandled Promise Rejection`);

//   server.close(() => {
//     process.exit(1);
//   });
// });