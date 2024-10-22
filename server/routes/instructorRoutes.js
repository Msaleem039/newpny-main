import express from 'express';
import { createInstructor, deleteInstructor, getInstructor, updateInstructor } from '../controllers/instructorController.js';


const router = express.Router();
router.post('/', createInstructor);
router.get('/', getInstructor);
router.put('/:id', updateInstructor);
router.delete('/:id', deleteInstructor);

export default router;
