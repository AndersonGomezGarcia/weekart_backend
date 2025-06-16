import express from 'express';
import commentController from '../controllers/commentController.js';

const router = express.Router();


router.get('/', commentController.list); // List all comments (optional, can be removed if not needed)
router.post('/', commentController.create);
router.get('/post/:postId', commentController.listByPost);
router.get('/:id', commentController.show);
router.delete('/:id', commentController.delete);

export default router;