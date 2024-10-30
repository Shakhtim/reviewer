import mongoose from 'mongoose';

async function conectDb() {
  try {
    await mongoose.connect('mongodb://localhost:27017');
    console.log('Connected to MongoDB');
    return true;
  } catch (error) {
    console.error('Failed to connect to MongoDB', error);
    return false;
  }
}

export default conectDb;
