import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import bannerRoutes from './routes/bannerRoutes.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/banner', bannerRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
