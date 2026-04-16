import { Router } from "express";
import {
  getGameSnapshot,
  markContactRead,
  resetGame,
  sendMessage,
  submitConclusion
} from "../store/gameStore";

export const gameRoutes = Router();

gameRoutes.get("/game/bootstrap", (_req, res) => {
  res.json(getGameSnapshot());
});

gameRoutes.post("/chat/:contactId", async (req, res, next) => {
  try {
    const contactId = req.params.contactId;
    const text = String(req.body?.text ?? "").trim();
    const clientRequestId =
      typeof req.body?.clientRequestId === "string" ? req.body.clientRequestId.trim() : "";

    if (!text) {
      res.status(400).json({ message: "消息不能为空。" });
      return;
    }

    const response = await sendMessage(contactId, text, clientRequestId || undefined);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

gameRoutes.post("/contacts/:contactId/read", (req, res) => {
  res.json(markContactRead(req.params.contactId));
});

gameRoutes.post("/case/submit-conclusion", async (req, res, next) => {
  try {
    const text = String(req.body?.text ?? "").trim();

    if (!text) {
      res.status(400).json({ message: "结案文本不能为空。" });
      return;
    }

    const response = await submitConclusion(text);
    res.json(response);
  } catch (error) {
    next(error);
  }
});

gameRoutes.post("/game/reset", (_req, res) => {
  res.json(resetGame());
});
