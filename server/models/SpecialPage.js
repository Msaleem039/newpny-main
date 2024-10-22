import mongoose from 'mongoose';

const specialPageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  url_Slug: { type: String, required: true },
  full_Url: { type: String },
  spage_Image: { type: String },
  video: { type: String },
  description_Short: { type: String },
  description: { type: String },
  meta_Title: { type: String },
  meta_Description: { type: String},
  meta_Keywords: { type: String }
});

const SpecialPage = mongoose.model('SpecialPage', specialPageSchema);
export default SpecialPage;
