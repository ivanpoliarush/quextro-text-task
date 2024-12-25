import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import { connectDB } from './common/db.js';
import { appRouter } from './modules/index.js';

dotenv.config();

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', appRouter);

const bootstrap = async () => {
  await connectDB();
  app.listen(PORT, () => {
    console.log(`Application is running in port ${PORT}`);
  });
};

bootstrap();
