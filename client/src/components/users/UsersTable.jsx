import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import axios from "axios";

const UsersTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [editingUserId, setEditingUserId] = useState(null);
  const [updatedUser, setUpdatedUser] = useState({});
  const location = useLocation();

  // Fetch instructor details from the API
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/instructors");
        console.log(response.data); // Log fetched users
        setUsers(response.data);
        setFilteredUsers(response.data);
      } catch (error) {
        console.error("Error fetching instructors:", error);
      }
    };

    fetchInstructors();
  }, []);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(term) || user.email.toLowerCase().includes(term)
    );
    setFilteredUsers(filtered);
  };

  // DELETE user function
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/instructors/${id}`);
      setFilteredUsers(filteredUsers.filter((user) => user._id !== id)); // Assuming _id is the user ID
    } catch (error) {
      console.error("Failed to delete user", error);
    }
  };

  // Handle Edit Button Click
  const handleEditClick = (user) => {
    setEditingUserId(user._id);
    setUpdatedUser(user); // Set the user data for editing
  };

  // Handle input change in the edit form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  // Handle update
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8080/api/instructors/${editingUserId}`, updatedUser);
      setFilteredUsers((prevUsers) =>
        prevUsers.map((user) =>
          user._id === editingUserId ? { ...user, ...updatedUser } : user
        )
      );
      setEditingUserId(null); // Reset editing state
    } catch (error) {
      console.error("Failed to update user", error);
    }
  };

  // Check if the current route is 'adduser'
  const isAddInstructorPage = location.pathname.includes("adduser");

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {!isAddInstructorPage && (
        <>
          <div className="text-center mb-6">
            {/* Title */}
            <h2 className="text-2xl font-semibold text-gray-100 cursor-pointer mb-6">
              Instructor
            </h2>
            <hr className="w-full h-1 bg-slate-500 rounded-sm" />
            {/* Search and Add Instructor Button */}
            <div className="my-5 flex justify-center lg:justify-between items-center space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users..."
                  className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={handleSearch}
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>

              {/* Add Instructor Button */}
              <Link to="adduser">
                <button className="bg-blue-600 hover:bg-blue-500 hidden sm:block text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300">
                  Add Instructor
                </button>
              </Link>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-700">
                {filteredUsers.map((user) => (
                  <motion.tr
                    key={user._id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-gradient-to-r from-purple-400 to-blue-500 flex items-center justify-center text-white font-semibold">
                            {user.name ? user.name.charAt(0) : "?"}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-100">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-800 text-blue-100">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status === "Active"
                            ? "bg-green-800 text-green-100"
                            : "bg-red-800 text-red-100"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {editingUserId === user._id ? (
                        // Inline edit form
                        <form onSubmit={handleUpdate} className="flex items-center space-x-2">
                          <input
                            type="text"
                            name="name"
                            value={updatedUser.name}
                            onChange={handleChange}
                            className="bg-gray-700 text-white p-2 rounded"
                          />
                          <button
                            type="submit"
                            className="bg-green-600 hover:bg-green-500 text-white py-1 px-2 rounded"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingUserId(null)}
                            className="text-red-400 hover:text-red-300 py-1 px-2"
                          >
                            Cancel
                          </button>
                        </form>
                      ) : (
                        <>
                          <button
                            className='text-indigo-400 hover:text-indigo-300 mr-2'
                            onClick={() => handleEditClick(user)}
                          >
                            Edit
                          </button>
                          <button
                            className="text-red-400 hover:text-red-300"
                            onClick={() => handleDelete(user._id)}
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Render the Add Instructor form if on the 'adduser' route */}
      <Outlet />
    </motion.div>
  );
};

export default UsersTable;
