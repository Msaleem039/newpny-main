import BlogCityCategory from "../models/blogpost.js"; // Ensure this imports the correct model
import cloudinary from "../lib/cloudinary.js";
// Get all city categories
export const getAllBlog = async (req, res) => {
  try {
    const cityCategories = await BlogCityCategory.find();
    res.status(200).json(cityCategories);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch city categories', error });
  }
};

// Create new city category
export const createNewBlog = async (req, res) => {
  const {
    postTitle,
    urlSlug,
    postCategory,
    postThumbnailImage, // Expecting the image URL as a string
    shortDescription,
    postDescription,
    isPublish,
    featured,
    metaTitle,
    metaDescription,
    inSitemap,
    pageIndex,
    customCanonicalUrl,
  } = req.body;

  try {
    // Check if a blog post with the same urlSlug already exists
    const existingBlogPost = await BlogCityCategory.findOne({ urlSlug });
    if (existingBlogPost) {
      return res.status(400).json({ message: 'Blog post with this slug already exists' });
    }

    // Create a new blog post with the provided data
    const newCityCategory = new BlogCityCategory({
      postTitle,
      urlSlug,
      postCategory,
      postThumbnailImage, // Directly use the image string sent from the frontend
      shortDescription,
      postDescription,
      isPublish,
      featured,
      metaTitle,
      metaDescription,
      inSitemap,
      pageIndex,
      customCanonicalUrl,
    });

    // Save the new blog post to the database
    const savedBlogPost = await newCityCategory.save();

    // Respond with the newly created blog post
    res.status(201).json(savedBlogPost);
  } catch (error) {
    console.error('Error creating blog post:', error); // Log the detailed error
    res.status(400).json({ message: 'Failed to create blog post', error: error.message });
  }
};



// Get single city category by ID
export const getBlogById = async (req, res) => {
  try {
    const cityCategory = await BlogCityCategory.findById(req.params.id);
    if (!cityCategory) return res.status(404).json({ message: 'City category not found' });
    res.status(200).json(cityCategory);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch city category', error });
  }
};

// Update city category
export const updateBlog = async (req, res) => {
  const { id } = req.params;
  const {
    postTitle,
    urlSlug,
    postCategory,
    postThumbnailImage,
    shortDescription,
    postDescription,
    isPublish,
    featured,
    metaTitle,
    metaDescription,
    inSitemap,
    pageIndex,
    customCanonicalUrl,
  } = req.body;

  try {
    const updatedCityCategory = await BlogCityCategory.findByIdAndUpdate(
      id,
      {
        postTitle,
        urlSlug,
        postCategory,
        postThumbnailImage,
        shortDescription,
        postDescription,
        isPublish,
        featured,
        metaTitle,
        metaDescription,
        inSitemap,
        pageIndex,
        customCanonicalUrl,
      },
      { new: true }
    );

    if (!updatedCityCategory) return res.status(404).json({ message: 'City category not found' });
    res.status(200).json(updatedCityCategory);
  } catch (error) {
    res.status(400).json({ message: 'Failed to update city category', error });
  }
};

// Delete city category
export const deleteBlog = async (req, res) => {
  try {
    const deletedCityCategory = await BlogCityCategory.findByIdAndDelete(req.params.id);
    if (!deletedCityCategory) return res.status(404).json({ message: 'City category not found' });
    res.status(200).json({ message: 'City category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete city category', error });
  }
};
