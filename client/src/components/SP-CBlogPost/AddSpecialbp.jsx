import axios from "axios";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../common/Header";

const AddSpecialbp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const instructors = [
    { id: 1, name: "John Doe" },
    { id: 2, name: "Jane Smith" },
    { id: 3, name: "Alice Johnson" },
    { id: 4, name: "Bob Brown" },
  ];

  const onSubmit = async (data) => {
    try {
      // Constructing the request body
      const requestData = {
        ...data,
        // Add any additional transformations if necessary
      };

      let res = await axios.post('https://88b8-182-181-220-26.ngrok-free.app/api/courses', requestData);
      if (res.status === 200) {
        console.log('Course added successfully', res.data);
        navigate("/courses");
      } else {
        console.error('Error adding course', res.data);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="w-full overflow-y-auto">
      <Header />
      <div className='p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto mt-10'>
        <h2 className='text-3xl font-semibold text-gray-100 mb-6 text-center'>
          Add city wise blog post
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

          {/* Post Title */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Post Title*</label>
            <input
              type='text'
              {...register("postTitle", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter post title"
            />
            {errors.postTitle && <span className="text-red-500">Post Title is required</span>}
          </div>

          {/* URL Slug */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>URL Slug*</label>
            <input
              type='text'
              {...register("urlSlug", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter URL slug"
            />
            {errors.urlSlug && <span className="text-red-500">URL Slug is required</span>}
          </div>

          {/* Assigned Post Category Cities */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Assigned Post Category Cities*</label>
            <select
              {...register("assignedPostCategoryCities", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select City Category</option>
              {/* Populate with actual categories */}
              <option value="City1">City 1</option>
              <option value="City2">City 2</option>
            </select>
            {errors.assignedPostCategoryCities && <span className="text-red-500">Assigned Post Category Cities is required</span>}
          </div>

          {/* Post Thumb Image */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Post Thumb Image*</label>
            <input
              type='file'
              {...register("postThumbImage", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              accept="image/*"
            />
            {errors.postThumbImage && <span className="text-red-500">Post Thumb Image is required</span>}
          </div>

          {/* Short Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Short Description*</label>
            <textarea
              {...register("shortDescription", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter short description"
            />
            {errors.shortDescription && <span className="text-red-500">Short Description is required</span>}
          </div>

          {/* Post Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Post Description*</label>
            <textarea
              {...register("postDescription", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter post description"
            />
            {errors.postDescription && <span className="text-red-500">Post Description is required</span>}
          </div>

          {/* Is Publish? */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Is Publish?*</label>
            <select
              {...register("isPublish", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Publish/Unpublish</option>
              <option value="Publish">Publish</option>
              <option value="Unpublish">Unpublish</option>
            </select>
            {errors.isPublish && <span className="text-red-500">Is Publish option is required</span>}
          </div>

          {/* Featured */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Featured*</label>
            <select
              {...register("featured", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Yes/No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.featured && <span className="text-red-500">Featured option is required</span>}
          </div>

          {/* Meta Title */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Meta Title*</label>
            <input
              type='text'
              {...register("metaTitle", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter meta title"
            />
            {errors.metaTitle && <span className="text-red-500">Meta Title is required</span>}
          </div>

          {/* Meta Description */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Meta Description*</label>
            <textarea
              {...register("metaDescription", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder="Enter meta description"
            />
            {errors.metaDescription && <span className="text-red-500">Meta Description is required</span>}
          </div>

          {/* In Sitemap */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>In Sitemap*</label>
            <select
              {...register("inSitemap", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Yes/No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.inSitemap && <span className="text-red-500">In Sitemap option is required</span>}
          </div>

          {/* Page Index */}
          <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Page Index*</label>
            <select
              {...register("pageIndex", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Yes/No</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
            {errors.pageIndex && <span className="text-red-500">Page Index option is required</span>}
          </div>

          {/* Assigned Instructor */}
          {/* <div className='mb-4'>
            <label className='block text-gray-400 mb-2'>Assigned Instructor*</label>
            <select
              {...register("assignedInstructor", { required: true })}
              className='w-full px-4 py-2 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
            >
              <option value="">Select Instructor</option>
              {instructors.map(instructor => (
                <option key={instructor.id} value={instructor.name}>{instructor.name}</option>
              ))}
            </select>
            {errors.assignedInstructor && <span className="text-red-500">Assigned Instructor is required</span>}
          </div> */}

          {/* Submit Button */}
          <button type="submit" className='w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700'>
            Add Course
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSpecialbp;
