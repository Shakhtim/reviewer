import expressAsyncHandler from 'express-async-handler';
import reviewModel from '../../model/reviewModel.js'; 

const getReviewBySalon = expressAsyncHandler(async (req, res) => {
    const { nameSalon } = req.params; 
    try {
        const reviews = await reviewModel.find({ nameSalon });
        if (!reviews) {
            return res.status(404).json({ message: 'Отзывы не найдены' });
        }
        res.status(200).json(reviews); 
    } catch (error) {
        console.error('Ошибка при получении отзывы:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

export default getReviewBySalon; 
