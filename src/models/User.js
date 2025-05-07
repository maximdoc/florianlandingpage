import mongoose from 'mongoose';

// Define the User schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
  },
  company: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    trim: true,
  },
  subscribed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Check if the model is already defined to prevent model overwrite error
const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User; 