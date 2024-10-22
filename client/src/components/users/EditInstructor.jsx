import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditInstructor = () => {
  const { id } = useParams(); // Get the instructor ID from the URL
  const navigate = useNavigate();
  
  const [instructor, setInstructor] = useState({
    name: '',
    photo: '',
    other_info: '',
    in_View: 'yes', // Default value
  });

  // Fetch the instructor data
  useEffect(() => {
    const fetchInstructor = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/instructors/${id}`);
        console.log("Fetched Instructor Data:", response.data);
        setInstructor(response.data);
      } catch (error) {
        console.error('Error fetching instructor:', error.response ? error.response.data : error.message);
      }
    };

    fetchInstructor();
  }, [id]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8080/api/instructors/${id}`, instructor, { withCredentials: true });
      alert('Instructor updated successfully!');
      navigate('/users'); // Redirect to the users list after updating
    } catch (error) {
      console.error('Error updating instructor:', error.response ? error.response.data : error.message);
      alert('Failed to update instructor. Reason: ' + (error.response?.data?.message || error.message));
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInstructor((prevInstructor) => ({
      ...prevInstructor,
      [name]: value,
    }));
  };

  return (
    <div className='bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 w-full'>
      <h2 className='text-2xl font-semibold text-gray-100 mb-5'>Edit Instructor</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-300'>Instructor Name</label>
          <input
            type='text'
            name='course_Name'
            value={instructor.course_Name}
            onChange={handleChange}
            required
            className='w-full p-2 rounded bg-gray-700 text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-300'>Short Description</label>
          <input
            type='text'
            name='Short_Description'
            value={instructor.Short_Description}
            onChange={handleChange}
            required
            className='w-full p-2 rounded bg-gray-700 text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-300'>Course Image URL</label>
          <input
            type='text'
            name='course_Image'
            value={instructor.course_Image}
            onChange={handleChange}
            required
            className='w-full p-2 rounded bg-gray-700 text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-300'>Status</label>
          <select
            name='status'
            value={instructor.status}
            onChange={handleChange}
            className='w-full p-2 rounded bg-gray-700 text-white'
          >
            <option value='Active'>Active</option>
            <option value='Inactive'>Inactive</option>
          </select>
        </div>
        <button type='submit' className='bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-lg'>
          Update Instructor
        </button>
      </form>
    </div>
  );
};

export default EditInstructor;
