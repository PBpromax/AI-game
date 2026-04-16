import cors from "cors";
import express, { type NextFunction, type Request, type Response } from "express";
import { gameRoutes } from "./routes/gameRoutes";

export const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({
    ok: true,
    service: "ai-deduction-server",
    aiProvider: process.env.AI_PROVIDER || "mock",
    arkBaseUrl: process.env.ARK_BASE_URL || null,
    arkModel: process.env.ARK_MODEL || null
  });
});

app.use("/api", gameRoutes);

app.use((error: unknown, _req: Request, res: Response, _next: NextFunction) => {
  const message = error instanceof Error ? error.message : "服务器发生未知错误。";
  res.status(500).json({ message });
});
