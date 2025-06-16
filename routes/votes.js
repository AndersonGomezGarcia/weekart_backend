import express from 'express';
import voteController from '../controllers/voteController.js';

const router = express.Router();

// GET /votes - lista todos los voteos
// Ejemplo: curl -X GET http://localhost:3000/votes
router.get('/', voteController.list);

// GET /votes/:id - muestra un voteo por ID
// Ejemplo: curl -X GET http://localhost:3000/votes/1
router.get('/:id', voteController.show);

router.get('/user/:userId', voteController.getVotesByUser);

// GET /votes/post/:postId - muestra los voteos por post
// Ejemplo: curl -X GET http://localhost:3000/votes/post/1
router.get('/post/:postId', voteController.getVotesByPost);

router.get('/:userId/:postId', voteController.getVotesByUserAndPost);

// POST /users - crea un nuevo usuario
// Ejemplo: curl -X POST http://localhost:3000/users \
//   -H 'Content-Type: application/json' \
//   -d '{"username":"anderson","email":"a@g.com","password":"1234"}'
router.post('/', voteController.create);

// PUT /votes/:id - actualiza un voteo existente
// Ejemplo: curl -X PUT http://localhost:3000/votes/1 \
//   -H 'Content-Type: application/json' \
//   -d '{"email":"nuevo@g.com"}'
router.put('/:id', voteController.update);

// DELETE /votes/:id - elimina un voteo
// Ejemplo: curl -X DELETE http://localhost:3000/votes/1
router.delete('/:id', voteController.delete);

router.delete('/:userId/:postId', voteController.deleteVoteByUserAndPost);

export default router;
