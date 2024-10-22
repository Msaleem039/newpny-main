import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/common/Header";

const AddFlyers = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [categories, setCategories] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [status, setStatus] = useState(""); // State for status
  const navigate = useNavigate();

  useEffect(() => {
    // Simulated API data
    const dummyCategories = [
      { id: 1, name: "Category 1" },
      { id: 2, name: "Category 2" },
      { id: 3, name: "Category 3" },
    ];

    const dummyCourses = [
      { id: 1, name: "Course 1" },
      { id: 2, name: "Course 2" },
      { id: 3, name: "Course 3" },
    ];

    // Simulate API call to fetch categories and courses
    setCategories(dummyCategories);
    setCourses(dummyCourses);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Eflayer Added:", {
      name,
      email,
      phone,
      profilePic,
      selectedCategory,
      selectedCourse,
      status,
    });
    navigate("/eflayer"); // Redirect to the eflayer page after successful form submission
  };

  const handleCancel = () => {
    navigate("/eflayer"); // Navigate back to the previous page
  };

  return (
    <div className="flex-1 overflow-auto relative z-10 ">
      <Header />
      <div className="p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto my-10">
        <h2 className="text-3xl font-semibold text-gray-100 mb-6 text-center">
          Add Eflayer
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="course">
              Course
            </label>
            <select
              id="course"
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select a course
              </option>
              {courses.map((course) => (
                <option key={course.id} value={course.name}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="profilePic">
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              onChange={(e) => setProfilePic(e.target.files[0])}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              accept="image/*"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-400 mb-2" htmlFor="status">
              Status
            </label>
            <select
              id="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="" disabled>
                Select status
              </option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </div>

        

          <div className="flex justify-between">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none"
            >
              Add Eflayer
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 focus:outline-none"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddFlyers;

