import expressAsyncHandler from 'express-async-handler';
import autosalonModel from '../../../model/autosalonModel.js';

const createAutosalon = expressAsyncHandler(async (req, res) => {
    const { status,nameSalon, city, rating, address, phone, site, schedule, meta_title, meta_description, meta_keywords } = req.body;
    const image = req.file;

    if (!image) {
        return res.status(400).send({ message: 'Изображение не загружено' });
    }

    try {
        const newAutosalon = await autosalonModel.create({
            status,
            nameSalon,
            city,
            rating,
            address,
            phone,
            site,
            schedule,
            meta_title,
            meta_description,
            meta_keywords,
            image: image.filename });

        res.status(201).send({ message: 'Автосалон успешно создан!', autosalon: newAutosalon });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Ошибка при создании автосалона', error });
    }
});

export default createAutosalon;
