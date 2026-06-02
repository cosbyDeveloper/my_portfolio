import mongoose, { Connection } from 'mongoose';

let cachedConnection: Connection | null = null;

export async function connectDB(): Promise<Connection> {
  if (cachedConnection) {
    return cachedConnection;
  }

  const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/cosby-portfolio';

  try {
    const conn = await mongoose.connect(mongoUri);
    cachedConnection = conn.connection;
    console.log('✅ MongoDB connected successfully');
    return cachedConnection;
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
}

export async function disconnectDB(): Promise<void> {
  if (!cachedConnection) return;
  
  try {
    await mongoose.disconnect();
    cachedConnection = null;
    console.log('✅ MongoDB disconnected');
  } catch (error) {
    console.error('❌ MongoDB disconnection error:', error);
  }
}

export default { connectDB, disconnectDB };
