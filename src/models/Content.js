import mongoose from 'mongoose';

// Schema for sections within a page
const sectionSchema = new mongoose.Schema({
  id: { type: String, required: true },
  type: { type: String, required: true },
  title: { type: String, required: true },
  subtitle: { type: String },
  // Using Mixed type for flexible section content
  // Different section types can have different structures
  content: { type: mongoose.Schema.Types.Mixed }
}, { 
  _id: false, // Don't create _id for subdocuments
  strict: false // Allow flexible structure
});

// Schema for pages
const pageSchema = new mongoose.Schema({
  id: { type: String, required: true },
  slug: { type: String, required: true },
  title: { type: String, required: true },
  meta: {
    title: { type: String },
    description: { type: String }
  },
  sections: [sectionSchema],
  // Additional flexible fields
  content: { type: mongoose.Schema.Types.Mixed }
}, { 
  _id: false,
  strict: false
});

// Global content schema (header, footer, etc.)
const globalSchema = new mongoose.Schema({
  title: { type: String },
  description: { type: String },
  header: { type: mongoose.Schema.Types.Mixed },
  footer: { type: mongoose.Schema.Types.Mixed },
  // Allow additional fields
  content: { type: mongoose.Schema.Types.Mixed }
}, { 
  _id: false,
  strict: false
});

// Main content schema with versioning
const contentSchema = new mongoose.Schema({
  version: { type: Number, default: 1 },
  active: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
  global: globalSchema,
  pages: [pageSchema]
}, { 
  timestamps: true,
  strict: false, // Allow flexible structure for future extensions
});

// Create indexes for better query performance
contentSchema.index({ version: 1 });
contentSchema.index({ active: 1 });
contentSchema.index({ 'pages.slug': 1 });

// Create model (or get existing model)
const Content = mongoose.models.Content || mongoose.model('Content', contentSchema);

export default Content; 