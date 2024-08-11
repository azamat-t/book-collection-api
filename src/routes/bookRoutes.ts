import express from 'express';
import { authenticate, authorize } from '../middleware/authMiddleware';
import {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController';

const router = express.Router();

router.post('/', authenticate, authorize(1 << 0), addBook); // Admin only
router.get('/', getBooks);
router.get('/:id', getBookById);
router.put('/:id', authenticate, authorize(1 << 0), updateBook); // Admin only
router.delete('/:id', authenticate, authorize(1 << 0), deleteBook); // Admin only

export default router;
