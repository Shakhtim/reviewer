import expressAsyncHandler from 'express-async-handler';
import autosalonModel from '../../../model/autosalonModel.js';

const deleteAutosalon = expressAsyncHandler(async (req, res) => {
    const { _id } = req.params;

    try {
        const autosalon = await autosalonModel.findById(_id);
        if (!autosalon) {
            return res.status(404).send({ message: 'Автосалон не найден' });
        }

        await autosalonModel.findByIdAndDelete(_id);
        res.status(200).send({ message: 'Автосалон успешно удален!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Ошибка при удалении автосалона', error });
    }
});

export default deleteAutosalon;