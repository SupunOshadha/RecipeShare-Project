const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require("./routes/index");

const app = express();

// ✅ Fix: Apply CORS Middleware Properly
const allowedOrigins = [
  "https://recipe-share-project.vercel.app",
  "https://recipe-share-project-4mw3kdc7l-supun-oshadhas-projects.vercel.app"
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.options("*", cors()); // Preflight requests

app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());

// ✅ Fix: Remove redundant manual CORS headers
// (Express CORS middleware already handles this)

// ✅ Debugging Middleware
app.use((req, res, next) => {
  console.log("Request Method:", req.method);
  console.log("Request Headers:", req.headers);
  console.log("Origin:", req.headers.origin);
  next();
});

app.use("/api", router);

const PORT = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Connected to DB");
    console.log(`Server is running on port ${PORT}...`);
  });
});




// const express = require("express");
// const cors = require("cors");
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// require("dotenv").config();
// const connectDB = require("./config/db");
// const router = require("./routes/index");

// const app = express();
// app.use(
//   cors({
//     origin: ["https://recipe-share-project.vercel.app", "https://recipe-share-project-4mw3kdc7l-supun-oshadhas-projects.vercel.app"],    // origin: process.env.FRONTEND_URL,
//     credentials: true,
//   })
// );
// app.options("*", cors());

// app.use(bodyParser.json({ limit: "50mb" }));
// app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
// app.use(express.json());
// app.use(cookieParser());

// // Debugging Middleware (Check CORS Headers)
// app.use((req, res, next) => {
//   console.log("Request Method:", req.method);
//   console.log("Request Headers:", req.headers);
//   next();
// });

// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "https://recipe-share-project.vercel.app");
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//   res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   res.header("Access-Control-Allow-Credentials", "true");
//   if (req.method === "OPTIONS") {
//     return res.sendStatus(200);
//   }
//   next();
// });


// app.use("/api", router);
// // testing comment
// const PORT = process.env.PORT || 8080;

// connectDB().then(() => {
//   app.listen(PORT, () => {
//     console.log("Connect to DB");
//     console.log("Server is running...");
//   });
// });
