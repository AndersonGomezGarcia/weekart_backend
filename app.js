// app.js
import createError from 'http-errors';
import express from 'express';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import cors from 'cors'; // Importar cors si es necesario

import pool from './config/db.js';           // pool inicializado aquí
import indexRouter from './routes/index.js';
import usersRouter from './routes/users.js';
import authRouter from './routes/auth.js'; // Carga dinámica de rutas
import eventsRouter from './routes/events.js'; // Carga dinámica de rutas
import postsRouter from './routes/posts.js'; // Carga dinámica de rutas
import votesRouter from './routes/votes.js'; // Carga dinámica de rutas

// __dirname en ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname  = dirname(__filename);

const app = express();



app.use(cors()); // 🔥 esto permite todas las conexiones

// o para permitir solo Vite:
app.use(cors({
  origin: 'http://localhost:5173', // puerto típico de Vite
  credentials: true // si necesitás enviar cookies o cabeceras de autenticación
}));

// --- Verificar conexión a la DB ---
pool.on('connect', () => {
  console.log('✔️  Database connected successfully');
});
pool.on('error', (err) => {
  console.error('❌  Database connection error:', err);
});

// --- View engine setup ---
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');   // si usas Pug instala 'pug' en lugar de 'jade'

// --- Middlewares ---
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// --- Rutas ---
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/auth', authRouter); // Carga dinámica de rutas
app.use('/events', eventsRouter);
app.use('/posts', postsRouter); // Carga dinámica de rutas
app.use('/votes', votesRouter); // Carga dinámica de rutas
app.use('/media', express.static(path.join(__dirname, 'media'))); // Servir archivos estáticos de la carpeta 'media'

// --- Capturar 404 ---
app.use((req, res, next) => {
  next(createError(404));
});

// --- Manejador de errores ---
app.use((err, req, res, next) => {
  // Sólo mostrar stack en desarrollo
  res.locals.message = err.message;
  res.locals.error   = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error', { error: err });
});


export default app;
