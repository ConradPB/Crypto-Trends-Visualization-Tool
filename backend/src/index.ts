import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cryptoRoutes from "./routes/cryptoRoutes";
import morgan from "morgan";
import logger from "./utils/logger";

dotenv.config();

const app: Express = express();

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
app.get("/api/test", (req: Request, res: Response) => {
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

// Don't start server in production (Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
