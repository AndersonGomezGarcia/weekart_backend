// server.js
import express from 'express';
import multer from 'multer';
import path from 'path';
import cors from 'cors';
import guardarImagen from './helpers/guardarImagenes.js';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// Para usar __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(cors());

const upload = multer({ storage: multer.memoryStorage() });

// Carpeta estática para acceder a las imágenes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/upload', upload.single('image'), (req, res) => {
  try {
    const info = guardarImagen(req.file);
    res.status(200).json({
      message: 'Imagen guardada correctamente',
      filename: info.filename,
      url: `http://localhost:3000${info.url}`
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000');
});
