// src/controllers/gladiaCallbackController.ts
import { Request, Response, NextFunction } from "express";

export const gladiaCallBack = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    console.log("Gladia callback received:", req.body);
    // Exemple de structure attendue (adapter selon la documentation Gladia) :
    // {
    //   "id": "45463597-20b7-4af7-b3b3-f5fb778203ab",
    //   "event": "success",
    //   "result": { "transcription": { "full_transcript": "..." } }
    // }
    const { id, event, result } = req.body;
    if (event === "success") {
      console.log(`Transcription succeeded for id ${id}:`);
      console.log(result.transcription.full_transcript);
      // Vous pouvez ici mettre à jour la base de données, notifier l'utilisateur, etc.
    } else {
      console.error(`Transcription failed for id ${id}:`, req.body);
      // Gérer l'erreur (notifier, loguer, etc.)
    }
    // Répondre à Gladia pour confirmer la réception du callback
    res.status(200).json({ message: "Callback received" });
  } catch (error) {
    next(error);
  }
};
