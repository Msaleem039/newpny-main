import SpecialPage from "../models/SpecialPage.js";
// Create Category
export const specialPageController = async (req, res) => {
  try {
    const category = new SpecialPage(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all categories
export const getSpecialpage = async (req, res) => {
  try {
    const categories = await SpecialPage.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Category
export const updateSpecial = async (req, res) => {
  try {
    const updatedCategory = await SpecialPage.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Category
export const deleteSpecial = async (req, res) => {
  try {
    await SpecialPage.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
