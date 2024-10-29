import GalleryCategory from '../models/GalleryCategory.js';
import cloudinary from '../lib/cloudinary.js';
// Create a new Gallery Category
export const createGalleryCategory = async (req, res) => {
  try {
    const { galleryTitle, isViewOnWeb, note } = req.body;
    const coverImage = req.file ? req.file.path : '';  // Assuming file upload middleware like multer

    const galleryCategory = new GalleryCategory({
      galleryTitle,
      isViewOnWeb,
      coverImage,
      note
    });

    await galleryCategory.save();
    res.status(201).json(galleryCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all Gallery Categories
export const getAllGalleryCategories = async (req, res) => {
  try {
    const galleryCategories = await GalleryCategory.find();
    res.status(200).json(galleryCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single Gallery Category by ID
export const getGalleryCategoryById = async (req, res) => {
  try {
    const galleryCategory = await GalleryCategory.findById(req.params.id);
    if (!galleryCategory) return res.status(404).json({ message: 'Gallery Category not found' });
    res.status(200).json(galleryCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a Gallery Category
export const updateGalleryCategory = async (req, res) => {
  try {
    const { galleryTitle, isViewOnWeb, note } = req.body;
    const coverImage = req.file ? req.file.path : undefined;  // Only update if a new file is uploaded

    const updatedFields = {
      galleryTitle,
      isViewOnWeb,
      note
    };

    if (coverImage) updatedFields.coverImage = coverImage;

    const galleryCategory = await GalleryCategory.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!galleryCategory) return res.status(404).json({ message: 'Gallery Category not found' });

    res.status(200).json(galleryCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a Gallery Category
export const deleteGalleryCategory = async (req, res) => {
  try {
    const galleryCategory = await GalleryCategory.findByIdAndDelete(req.params.id);
    if (!galleryCategory) return res.status(404).json({ message: 'Gallery Category not found' });
    res.status(200).json({ message: 'Gallery Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
