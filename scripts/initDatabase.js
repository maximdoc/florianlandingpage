require('dotenv').config({ path: '.env.local' });
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');

// Path to the content JSON file
const CONTENT_JSON_PATH = path.join(process.cwd(), 'src', 'data', 'content.json');

// Connect to MongoDB
async function connectToDatabase() {
  try {
    // Get MongoDB URI from environment variables
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
      throw new Error('MongoDB URI is not defined. Please add MONGODB_URI to your .env.local file.');
    }
    
    // Connect to MongoDB
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('Connected to MongoDB');
    return mongoose.connection;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
}

// Define schemas (simplified version of the actual model)
const contentSchema = new mongoose.Schema({
  version: { type: Number, default: 1 },
  active: { type: Boolean, default: true },
  timestamp: { type: Date, default: Date.now },
  global: { type: mongoose.Schema.Types.Mixed },
  pages: [{ type: mongoose.Schema.Types.Mixed }]
}, { 
  timestamps: true,
  strict: false,
});

// Create model 
const Content = mongoose.model('Content', contentSchema);

// Initialize database with content from the JSON file
async function initDatabase() {
  try {
    // Connect to MongoDB
    await connectToDatabase();
    
    // Check if Content collection already has documents
    const existingCount = await Content.countDocuments();
    
    if (existingCount > 0) {
      console.log(`Database already contains ${existingCount} content documents.`);
      console.log('Do you want to proceed and add the JSON file data as a new version? (y/n)');
      
      // Wait for user input
      const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
      });
      
      const answer = await new Promise((resolve) => {
        readline.question('> ', resolve);
      });
      
      readline.close();
      
      if (answer.toLowerCase() !== 'y') {
        console.log('Aborting operation');
        await mongoose.disconnect();
        return;
      }
    }
    
    // Read content from JSON file
    if (!fs.existsSync(CONTENT_JSON_PATH)) {
      console.error('Content file does not exist:', CONTENT_JSON_PATH);
      await mongoose.disconnect();
      return;
    }
    
    console.log('Reading content from JSON file...');
    const contentData = JSON.parse(fs.readFileSync(CONTENT_JSON_PATH, 'utf8'));
    
    // Set all existing versions to inactive
    if (existingCount > 0) {
      console.log('Setting all existing versions to inactive...');
      await Content.updateMany({}, { active: false });
    }
    
    // Create new version
    const newVersion = existingCount > 0 ? 
      (await Content.findOne().sort({ version: -1 }).lean())?.version + 1 || 1 : 1;
    
    console.log(`Creating new version ${newVersion}...`);
    const newContent = await Content.create({
      version: newVersion,
      active: true,
      timestamp: new Date(),
      global: contentData.global || {},
      pages: contentData.pages || []
    });
    
    console.log('Database initialized successfully');
    console.log('New content version:', newContent.version);
    console.log('Timestamp:', newContent.timestamp);
    
    // Disconnect from MongoDB
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

// Run the script
initDatabase(); 