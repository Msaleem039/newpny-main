import mongoose from 'mongoose';

const blogPostSchema = new mongoose.Schema({
    postTitle: { type: String, required: true },
    urlSlug: { type: String, required: true, unique: true },
    postCategory: { type: mongoose.Schema.Types.ObjectId, ref: 'CityCategory', required: true },
    postThumbnailImage: { type: String, required: true },
    shortDescription: { type: String, required: true },
    postDescription: { type: String, required: true },  // CKEditor or TinyMCE content
    isPublish: { type: Boolean, default: false },
    featured: { type: Boolean, default: false },
    metaTitle: { type: String },
    metaDescription: { type: String },
    inSitemap: { type: Boolean, default: false },
    pageIndex: { type: Boolean, default: false },
    customCanonicalUrl: { type: String },
    urlFullSlug: { type: String },  // Redirect URL
    createdAt: { type: Date, default: Date.now },
});

const SBlogPost = mongoose.model('sBlogPost', blogPostSchema);

export default SBlogPost;
