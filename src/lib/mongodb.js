import mongoose from 'mongoose';

// Variable to cache the MongoDB connection
let cachedConnection = null;

/**
 * Connect to MongoDB
 * This function implements connection pooling to reuse connections
 */
export async function connectToDatabase() {
  // If we have a cached connection, use it
  if (cachedConnection) {
    return cachedConnection;
  }

  // Get MongoDB URI from environment variables
  const MONGODB_URI = process.env.MONGODB_URI;
  
  if (!MONGODB_URI) {
    throw new Error('MongoDB URI is not defined. Please add MONGODB_URI to your environment variables.');
  }

  // Options for the MongoDB connection
  const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  };

  try {
    // Create a new connection if there isn't one
    if (mongoose.connection.readyState !== 1) {
      const conn = await mongoose.connect(MONGODB_URI, options);
      cachedConnection = conn;
      return conn;
    }

    // Return the existing connection
    cachedConnection = mongoose.connection;
    return cachedConnection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export default connectToDatabase; 