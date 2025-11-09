import { NextApiRequest, NextApiResponse } from "next";
import { handleChat } from "@/services/chain"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { safeMessage } = req.body;
  if (!safeMessage) return res.status(400).json({ error: "Missing prompt" });
  try {
    const reply = await handleChat(req, res);
    res.status(200).json({ reply });
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}
