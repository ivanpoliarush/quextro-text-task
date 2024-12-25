import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './common/db.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

const bootstrap = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Application is running in port ${PORT}`);
  });
};

bootstrap();
