import express, { Application, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cryptoRoutes from "./routes/cryptoRoutes";
import morgan from "morgan";
import logger from "./utils/logger";

dotenv.config();

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

app.get("/api/test", (req: Request, res: Response) => {
  res.json({ message: "Backend is working!" });
});

app.use("/api/crypto", cryptoRoutes);

if (process.env.NODE_ENV !== "production") {
  app.use(
    morgan("combined", {
      stream: {
        write: (message: string) => logger.info(message.trim()),
      },
    })
  );
}

// Start server locally only if not in production (e.g., Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000; // Use .env PORT or default to 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
