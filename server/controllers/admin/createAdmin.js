import bcrypt from 'bcrypt';
import expressAsyncHandler from 'express-async-handler';
import { validationResult } from 'express-validator';
import Admin from '../../model/adminModel.js'; // Импорт модели Admin
import jwt from 'jsonwebtoken'; // Не забудьте импортировать jwt

// Секретный ключ для подписи токена
const JWT_SECRET = 'admin'; // Замените на свой секретный ключ

// Проверка существования email
const checkIfEmailExists = async (email) => {
    const admin = await Admin.findOne({ email });
    return admin !== null; // Возвращаем true, если email существует
};

// Проверка существования логина
const checkIfLoginExists = async (login) => {
    const admin = await Admin.findOne({ login });
    return admin !== null; // Возвращаем true, если логин существует
};

const createAdmin = expressAsyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, login, password, username, surname } = req.body;

    // Проверка существующих email и логина
    const existingEmail = await checkIfEmailExists(email);
    if (existingEmail) {
        return res.status(400).json({ message: 'Пользователь с таким email уже существует' });
    }

    const existingLogin = await checkIfLoginExists(login);
    if (existingLogin) {
        return res.status(400).json({ message: 'Пользователь с таким логином уже существует' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const admin = await Admin.create({
            email,
            login,
            password: hashedPassword,
            username,
            surname,
        });

        // Генерация токена 
        const token = jwt.sign({ id: admin._id }, JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({ message: 'Администратор успешно создан', admin, token });
    } catch (error) {
        console.error('Ошибка при создании администратора:', error);
        res.status(500).json({ message: 'Ошибка сервера' });
    }
});

export default createAdmin;
