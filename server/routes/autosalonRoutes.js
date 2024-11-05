import express from 'express';
import multer from 'multer';
import path from 'path'; 
import { fileURLToPath } from 'url'; 
import createAutosalon from '../controllers/admin/autosalon/createAutosalon.js';
import getAutosalons from '../controllers/admin/autosalon/getAutosalons.js';
import getAutosalonById from '../controllers/admin/autosalon/getAutosalonById.js';
import editAutosalon from '../controllers/admin/autosalon/editAutosalon.js'; 
import deleteAutosalon from '../controllers/admin/autosalon/deleteAutosalon.js'; 

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename); 

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '/uploads/autosalons')); 
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); 
    }
});

const upload = multer({ storage });

router.get('/', getAutosalons);
router.post('/', upload.single('image'), createAutosalon);
router.get('/get/:_id', getAutosalonById);
router.put('/edit/:_id', editAutosalon); 
router.delete('/delete/:_id', deleteAutosalon);

export default router;
