import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

// GET /users - lista todos los usuarios
// Ejemplo: curl -X GET http://localhost:3000/users
router.get('/', userController.list);

// GET /users/:id - muestra un usuario por ID
// Ejemplo: curl -X GET http://localhost:3000/users/1
router.get('/:id', userController.show);

// POST /users - crea un nuevo usuario
// Ejemplo: curl -X POST http://localhost:3000/users \
//   -H 'Content-Type: application/json' \
//   -d '{"username":"anderson","email":"a@g.com","password":"1234"}'
router.post('/', userController.create);

// PUT /users/:id - actualiza un usuario existente
// Ejemplo: curl -X PUT http://localhost:3000/users/1 \
//   -H 'Content-Type: application/json' \
//   -d '{"email":"nuevo@g.com"}'
router.put('/:id', userController.update);

// DELETE /users/:id - elimina un usuario
// Ejemplo: curl -X DELETE http://localhost:3000/users/1
router.delete('/:id', userController.delete);

export default router;
