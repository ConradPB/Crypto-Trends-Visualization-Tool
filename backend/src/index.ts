import * as express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cryptoRoutes from "./routes/cryptoRoutes";
import morgan from "morgan";
import logger from "./utils/logger";

dotenv.config();

const app = express();

app.use(express.json());

const allowedOrigins = [
  "https://crypto-trends-kohl.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.use("/api/crypto", cryptoRoutes);

if (process.env.NODE_ENV !== "production") {
  app.use(
    morgan("combined", {
      stream: {
        write: (message) => logger.info(message.trim()),
      },
    })
  );
}

export default app;
