// controllers/admin/getAdmins.js
import expressAsyncHandler from 'express-async-handler';
import Admin from '../../model/adminModel.js';

// @desc    Получить всех администраторов
// @route   GET /api/admins
const getAdmins = expressAsyncHandler(async (req, res) => {
    const admins = await Admin.find({}, '-password'); // Не возвращаем пароль res.json(admins);
});

export default getAdmins;
