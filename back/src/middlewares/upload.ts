// src/middlewares/upload.ts

import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure the uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the destination folder for uploaded files
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename to avoid collisions
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  },
});

// Configure multer with storage and optional file filter
export const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 50, // Limit file size to 50MB
  },
});
