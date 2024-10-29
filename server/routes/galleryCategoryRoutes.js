import express from 'express';
import {
  createGalleryCategory,
  getAllGalleryCategories,
  getGalleryCategoryById,
  updateGalleryCategory,
  deleteGalleryCategory
} from '../controllers/galleryCategoryController.js';
import upload from '../middleware/upload.js';  // Middleware for handling image uploads

const routergallery = express.Router();

// POST: Create a new Gallery Category
routergallery.post('/gallery-category', upload.single('coverImage'), createGalleryCategory);

// GET: Fetch all Gallery Categories
routergallery.get('/gallery-category', getAllGalleryCategories);

// GET: Fetch a single Gallery Category by ID
routergallery.get('/gallery-category/:id', getGalleryCategoryById);

// PUT: Update a Gallery Category
routergallery.put('/gallery-category/:id', upload.single('coverImage'), updateGalleryCategory);

// DELETE: Delete a Gallery Category
routergallery.delete('/gallery-category/:id', deleteGalleryCategory);

export default routergallery;
