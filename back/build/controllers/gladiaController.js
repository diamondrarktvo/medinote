"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.gladiaCallBack = void 0;
const gladiaCallBack = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
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
        }
        else {
            console.error(`Transcription failed for id ${id}:`, req.body);
            // Gérer l'erreur (notifier, loguer, etc.)
        }
        // Répondre à Gladia pour confirmer la réception du callback
        res.status(200).json({ message: "Callback received" });
    }
    catch (error) {
        next(error);
    }
});
exports.gladiaCallBack = gladiaCallBack;
