import express from 'express';
import eventController from '../controllers/eventController.js';

const router = express.Router();

// GET /events - lista todos los eventos
// Ejemplo: curl -X GET http://localhost:3000/events
router.get('/', eventController.list);

// GET /events/:id - muestra un evento por ID
// Ejemplo: curl -X GET http://localhost:3000/events/1
router.get('/:id', eventController.show);


    
// POST /users - crea un nuevo usuario
// Ejemplo: curl -X POST http://localhost:3000/users \
//   -H 'Content-Type: application/json' \
//   -d '{"username":"anderson","email":"a@g.com","password":"1234"}'
router.post('/', eventController.create);

// PUT /events/:id - actualiza un evento existente
// Ejemplo: curl -X PUT http://localhost:3000/events/1 \
//   -H 'Content-Type: application/json' \
//   -d '{"email":"nuevo@g.com"}'
router.put('/:id', eventController.update);

// DELETE /events/:id - elimina un evento
// Ejemplo: curl -X DELETE http://localhost:3000/events/1
router.delete('/:id', eventController.delete);

export default router;
