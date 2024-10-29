import express from 'express';
import {
  createFaqCategory,
  getAllFaqCategories,
  getFaqCategoryById,
  updateFaqCategory,
  deleteFaqCategory
} from '../controllers/faqCategoryController.js';
import upload from '../middleware/upload.js';  // Middleware for handling image uploads
const routerfaq = express.Router();

// POST: Create a new FAQ Category
routerfaq.post('/faq-category', upload.single('categoryImage'), createFaqCategory);

// GET: Fetch all FAQ Categories
routerfaq.get('/faq-category', getAllFaqCategories);

// GET: Fetch a single FAQ Category by ID
routerfaq.get('/faq-category/:id', getFaqCategoryById);

// PUT: Update an FAQ Category
routerfaq.put('/faq-category/:id', upload.single('categoryImage'), updateFaqCategory);

// DELETE: Delete an FAQ Category
routerfaq.delete('/faq-category/:id', deleteFaqCategory);

export default routerfaq;
