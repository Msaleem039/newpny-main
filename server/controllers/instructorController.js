import Category from '../models/Category.js';
import Instructor from '../models/Instructor.js';
import cloudinary from '../lib/cloudinary.js';
// Create Category
export const createInstructor = async (req, res) => {
  try {
    const category = new Instructor(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all categories
export const getInstructor = async (req, res) => {
  try {
    const categories = await Instructor.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
export const updateInstructor = async (req, res) => {
  try {
    const updatedCategory = await Instructor.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Category
export const deleteInstructor = async (req, res) => {
  try {
    await Instructor.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const instructorbyid = async (req, res) => {
  try {
    await Instructor.findById(req.params.id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};