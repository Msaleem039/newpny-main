import Course from '../models/Course.js';
import Category from '../models/Category.js';

// Create Course
export const createCourse = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);
    // const category = await Category.findById(req.body.course_Category);
    // console.log(category)
    // if (!category) {
    //   return res.status(400).json({ message: 'Invalid category ID' });
    // }
    const course = new Course(req.body);
    await course.save();
    res.status(201).json(course);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Courses
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('course_Category'); // Populate Category data
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Course
export const updateCourse = async (req, res) => {
  try {
    // Ensure the category exists if it is being updated
    if (req.body.course_Category) {
      const category = await Category.findById(req.body.course_Category);

      if (!category) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
    }

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    await Course.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
