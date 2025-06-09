import express from 'express';
import postController from '../controllers/postController.js';
import multer from 'multer';

const upload = multer({ storage: multer.memoryStorage() });

const router = express.Router();

// GET /posts - lista todos los postos
// Ejemplo: curl -X GET http://localhost:3000/posts
router.get('/', postController.list);

// GET /posts/:id - muestra un posto por ID
// Ejemplo: curl -X GET http://localhost:3000/posts/1
router.get('/:id', postController.show);

router.get('/user/:userId', postController.getPostsByUserId);

router.get('/event/:eventId', postController.getPostsByEventId);

// POST /users - crea un nuevo usuario
// Ejemplo: curl -X POST http://localhost:3000/users \
//   -H 'Content-Type: application/json' \
//   -d '{"username":"anderson","email":"a@g.com","password":"1234"}'
router.post('/', upload.single('image'), postController.create);

// PUT /posts/:id - actualiza un posto existente
// Ejemplo: curl -X PUT http://localhost:3000/posts/1 \
//   -H 'Content-Type: application/json' \
//   -d '{"email":"nuevo@g.com"}'
router.put('/:id', upload.single('image'), postController.update);

// DELETE /posts/:id - elimina un posto
// Ejemplo: curl -X DELETE http://localhost:3000/posts/1
router.delete('/:id', postController.delete);

export default router;
