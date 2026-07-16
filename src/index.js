import express from "express";
import dotenv from "dotenv";
import {rateLimit} from "express-rate-limit"
import weatherRoutes from "./routes/weather.js";

dotenv.config({quiet: true});

const app = express();
const PORT = process.env.PORT || 3000;


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes,
  limit: 100,
  standardHeaders: "draft-8",
  legacyHeaders: false,
  ipv6Subnet: 56
})



app.use(limiter)
app.use(express.json());

app.use("/api", weatherRoutes);

const startServer = () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};

startServer();