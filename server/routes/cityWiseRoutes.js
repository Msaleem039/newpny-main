import express from 'express';
import { createCityCate, deleteCityCategory, getCityCategory, updateCityCategory } from '../controllers/cityWiseController.js';

const router = express.Router();

router.post('/', createCityCate);
router.get('/', getCityCategory);
router.put('/:id', updateCityCategory);
router.delete('/:id', deleteCityCategory);

export default router;
