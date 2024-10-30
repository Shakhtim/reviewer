import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import reviewRoutes from'./routes/reviewRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import autosalonRoutes from './routes/autosalonRoutes.js';
import conectDb from './config/db.js';
import env from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

// Получение текущего файла и директории
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

env.config();

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



const port = process.env.PORT_SERVER || 3001;

conectDb();

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

app.use('/reviews', reviewRoutes);
app.use('/admin', adminRoutes);
app.use('/admin/autosalons', autosalonRoutes);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

