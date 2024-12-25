import { connect } from 'mongoose';

export const connectDB = async () => {
  try {
    const url = process.env.MONGO_URL;
    if (!url) {
      throw new Error('MONGO_URL is not configured');
    }

    await connect(url);
    console.log('DB connected');
  } catch (error) {
    console.log('Failed to connect to the database:', error);
  }
};
