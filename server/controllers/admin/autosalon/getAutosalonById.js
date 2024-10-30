import expressAsyncHandler from 'express-async-handler';
import autosalonModel from '../../../model/autosalonModel.js'; 

const getAutosalonById = expressAsyncHandler(async (req, res) => {
    const { _id } = req.params; 
    try {
        const autosalon = await autosalonModel.findById(_id); 
        if (!autosalon) {
            return res.status(404).json({ message: 'Автосалон не найден' });
        }
        res.status(200).json(autosalon); 
    } catch (error) {
        console.error('Ошибка при получении автосалона:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

export default getAutosalonById; 
