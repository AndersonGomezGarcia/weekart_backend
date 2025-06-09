import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Guarda una imagen en la carpeta /media
 * @param {Object} file - Archivo recibido desde multer (req.file)
 * @returns {Object} - Información del archivo guardado
 */
function saveImage(file) {
  if (!file) {
    throw new Error("No se recibió ningún archivo");
  }

  if (!file.mimetype.startsWith("image/")) {
    throw new Error("El archivo no es una imagen válida");
  }

  const mediaDir = path.join(__dirname, "..", "media");

  if (!fs.existsSync(mediaDir)) {
    fs.mkdirSync(mediaDir);
  }

  const filename = `${Date.now()}-${file.originalname}`;
  const filepath = path.join(mediaDir, filename);

  fs.writeFileSync(filepath, file.buffer);

  return {
    filename: filename,
    url: `/media/${filename.replace(" ", "%20")}`,
  };
}

export default saveImage;
