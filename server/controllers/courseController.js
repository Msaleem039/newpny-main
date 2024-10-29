import Course from '../models/Course.js';
import Category from '../models/Category.js';
import cloudinary from '../lib/cloudinary.js';

// Create Course with Cloudinary image upload
export const createCourse = async (req, res) => {
  try {
    console.log("Incoming request body:", req.body);

    // Upload image to Cloudinary if image file exists
    let courseImage = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'courses',
        resource_type: 'image'
      });
      courseImage = result.secure_url;
    }

    const courseData = {
      ...req.body,
      courseImage
    };

    const course = new Course(courseData);
    await course.save();
    res.status(201).json({ message: 'Course created successfully', course });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all Courses with populated category data
export const getCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('course_Category'); // Populate Category data
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Course with Cloudinary image upload
export const updateCourse = async (req, res) => {
  try {
    // Ensure the category exists if it is being updated
    if (req.body.course_Category) {
      const category = await Category.findById(req.body.course_Category);
      if (!category) {
        return res.status(400).json({ message: 'Invalid category ID' });
      }
    }

    // Update image if a new file is uploaded
    let courseImage = req.body.courseImage; // Existing image URL
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: 'courses',
        resource_type: 'image'
      });
      courseImage = result.secure_url;
    }

    const updatedData = {
      ...req.body,
      courseImage
    };

    const updatedCourse = await Course.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }

    res.status(200).json({ message: 'Course updated successfully', updatedCourse });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete Course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
