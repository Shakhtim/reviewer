import express from 'express';
import authAdmin from '../controllers/admin/authAdmin.js'; // Контроллер для аутентификации администратора
import createAdmin from '../controllers/admin/createAdmin.js'; // Контроллер для создания администратора и валидация
import getAdmins from '../controllers/admin/getAdmins.js'; // Контроллер для получения администраторов

const router = express.Router();

// Определяем маршрут для аутентификации администратора
router.route('/auth').post(authAdmin);

// Определяем маршрут для создания администратора с валидацией
router.post('/create', createAdmin);

// Определяем маршрут для получения администраторов
router.get('/', getAdmins); 

// Экспортируем маршрутизатор
export default router;
