import express from 'express';
import { deleteSpecial, getSpecialpage, specialPageController, updateSpecial } from '../controllers/specialPageController.js';


const router = express.Router();

router.post('/',specialPageController);
router.get('/', getSpecialpage);
router.put('/:id', updateSpecial);
router.delete('/:id',deleteSpecial);

export default router;
