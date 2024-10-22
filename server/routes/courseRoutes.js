import express from 'express';
import { createCourse, deleteCourse, getCourses, updateCourse } from '../controllers/courseController.js';
import { instructorbyid } from '../controllers/instructorController.js';

const router = express.Router();

router.post('/',createCourse);
router.get('/',getCourses);
router.delete('/:id',deleteCourse);
router.put('/:id',updateCourse);
router.put('/:id',instructorbyid);
export default router;
