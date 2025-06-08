import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Necesario para __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Guarda una imagen en la carpeta /uploads
 * @param {Object} file - Archivo recibido desde multer (req.file)
 * @returns {Object} - Información del archivo guardado
 */
function guardarImagen(file) {
  if (!file) {
    throw new Error('No se recibió ningún archivo');
  }

  if (!file.mimetype.startsWith('image/')) {
    throw new Error('El archivo no es una imagen válida');
  }

  const uploadsDir = path.join(__dirname, '..', 'uploads');

  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir);
  }

  const filename = `${Date.now()}-${file.originalname}`;
  const filepath = path.join(uploadsDir, filename);

  fs.writeFileSync(filepath, file.buffer);

  return {
    filename,
    url: `/uploads/${filename}`,  // ← corregido: uploads, no upload
  };
}

export default guardarImagen;
