import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import multer from 'multer';
import autosalonModel from '../../../model/autosalonModel.js';

const router = express.Router();
const upload = multer({ dest: '../../../uploads/autosalons/' }); 

const editAutosalon = expressAsyncHandler(async (req, res) => {
    const { _id } = req.params;
    const { status, nameSalon, city, rating, address, phone, site, schedule, meta_title, meta_description, meta_keywords } = req.body;
    const image = req.file;

    if (!image) {
        return res.status(400).send({ message: 'Изображение не загружено' });
    }

    try {
        const autosalon = await autosalonModel.findById(_id);
        if (!autosalon) {
            return res.status(404).send({ message: 'Автосалон не найден' });
        }

        // Обновление полей 
        autosalon.status = status || autosalon.status;
        autosalon.nameSalon = nameSalon || autosalon.nameSalon;
        // autosalon.image = image || autosalon.image;
        autosalon.city = city || autosalon.city;
        autosalon.rating = rating || autosalon.rating;
        autosalon.address = address || autosalon.address;
        autosalon.phone = phone || autosalon.phone;
        autosalon.site = site || autosalon.site;
        autosalon.schedule = schedule || autosalon.schedule;
        autosalon.meta_title = meta_title || autosalon.meta_title;
        autosalon.meta_description = meta_description || autosalon.meta_description;
        autosalon.meta_keywords = meta_keywords || autosalon.meta_keywords;

        if (image) {
            autosalon.image = image.filename;
        }

        const updatedAutosalon = await autosalon.save();
        res.status(200).send({ message: 'Автосалон успешно обновлен!', autosalon: updatedAutosalon });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Ошибка при обновлении автосалона', error });
    }
});

router.put('/edit/:_id', upload.single('image'), editAutosalon);

export default router;
