import FaqCategory from '../models/FaqCategory.js';
import cloudinary from '../lib/cloudinary.js';
// Create a new FAQ Category
export const createFaqCategory = async (req, res) => {
  try {
    const { categoryName, urlSlug, categoryDescription, metaTitle, metaDescription, inSitemap, indexPage, customCanonicalUrl } = req.body;
    const categoryImage = req.file ? req.file.path : '';  // Assuming file upload middleware like multer

    const faqCategory = new FaqCategory({
      categoryName,
      urlSlug,
      categoryImage,
      categoryDescription,
      metaTitle,
      metaDescription,
      inSitemap,
      indexPage,
      customCanonicalUrl
    });

    await faqCategory.save();
    res.status(201).json(faqCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch all FAQ Categories
export const getAllFaqCategories = async (req, res) => {
  try {
    const faqCategories = await FaqCategory.find();
    res.status(200).json(faqCategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Fetch a single FAQ Category by ID
export const getFaqCategoryById = async (req, res) => {
  try {
    const faqCategory = await FaqCategory.findById(req.params.id);
    if (!faqCategory) return res.status(404).json({ message: 'FAQ Category not found' });
    res.status(200).json(faqCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an FAQ Category
export const updateFaqCategory = async (req, res) => {
  try {
    const { categoryName, urlSlug, categoryDescription, metaTitle, metaDescription, inSitemap, indexPage, customCanonicalUrl } = req.body;
    const categoryImage = req.file ? req.file.path : undefined;  // Only update if a new file is uploaded

    const updatedFields = {
      categoryName,
      urlSlug,
      categoryDescription,
      metaTitle,
      metaDescription,
      inSitemap,
      indexPage,
      customCanonicalUrl
    };

    if (categoryImage) updatedFields.categoryImage = categoryImage;

    const faqCategory = await FaqCategory.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!faqCategory) return res.status(404).json({ message: 'FAQ Category not found' });

    res.status(200).json(faqCategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an FAQ Category
export const deleteFaqCategory = async (req, res) => {
  try {
    const faqCategory = await FaqCategory.findByIdAndDelete(req.params.id);
    if (!faqCategory) return res.status(404).json({ message: 'FAQ Category not found' });
    res.status(200).json({ message: 'FAQ Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
