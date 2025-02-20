import express, { Application } from "express";
import dotenv from "dotenv";
import cryptoRoutes from "./routes/cryptoRoutes";
import morgan from "morgan";
import logger from "./utils/logger";

dotenv.config();

// Explicitly type app as Application
const app: Application = express();

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

// Basic test route
app.get("/api/test", (req, res) => {
  res.json({ message: "Backend is working!" });
});

app.use("/api/crypto", cryptoRoutes);

// Only use morgan in development
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
