import mongoose from 'mongoose';

// Connection URL
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/workflow-app';

// Cache the MongoDB connection to reuse it across API routes
const connection = {
  isConnected: false,
};

async function connectToDatabase() {
  // Check if we already have a connection
  if (connection.isConnected) {
    return;
  }

  // Create a new connection
  const db = await mongoose.connect(MONGODB_URI, {
    // These options are no longer needed in newer versions of Mongoose
    // but kept here for backwards compatibility
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  connection.isConnected = db.connections[0].readyState === 1;
  console.log('MongoDB connected successfully');

  return db;
}

export default connectToDatabase; 