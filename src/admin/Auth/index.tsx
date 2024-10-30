import React, { useEffect, useState } from 'react';
import './Auth.scss';
import bemCreator from '../../components/bemCreator.ts';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import { INITIAL_STATE } from './utils.ts';
import { useDispatch } from "../../store.ts"; // Импортируйте ваш типизированный useDispatch
import { INPUTS_NAME } from '../../types.ts';
import { authAdmin, selectIsAuthenticated } from '../../redux/admin/index.ts';
import { validateErrors, validateLogin, validatePassword } from '../../scripts/utils.ts';
import { PAuth } from '../../redux/admin/types.ts';
import { useSelector } from 'react-redux';
import CreateAdmin from '../Create/index.tsx';

const cn = bemCreator('page-auth');

const Auth = () => {
    const [formValues, setFormValues] = useState(INITIAL_STATE);
    const [formErrors, setFormErrors] = useState(INITIAL_STATE);
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const [authError, setAuthError] = useState('');

    const dispatch = useDispatch(); // Используем типизированный useDispatch 
    const navigate = useNavigate();

    useEffect(() => {
        // Если пользователь аутентифицирован, перенаправляем на страницу /admin
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event?.target;

        let errorMessage = '';

        if (name === INPUTS_NAME.LOGIN) {
            errorMessage = validateLogin(value);
        }

        if (name === INPUTS_NAME.PASSWORD) {
            errorMessage = validatePassword(value);
        }

        setFormErrors({
            ...formErrors,
            [name]: errorMessage,
        });

        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async () => {
        const isValid = validateErrors(formErrors);
 if (!isValid) return;

        const payload: PAuth = {
            login: formValues.login,
            password: formValues.password,
        };
    
        const resultAction = await dispatch(authAdmin(payload));
    
        // Проверяем, был ли thunk выполнен успешно
        if (authAdmin.fulfilled.match(resultAction)) {
            const { token } = resultAction.payload; // Получаем токен из результата
            // Здесь вы можете сохранить токен в localStorage или в Redux
            localStorage.setItem('token', token); // Сохранение токена 
        } else {
            setAuthError('Неправильный логин или пароль');
        }
    };

    // Обработчик нажатия клавиш 
    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            handleSubmit();
        }
    };

    return (
        <div className="page-auth">
            <div className={cn('wrapper')}>
                <h2>Авторизация</h2>
                <div className={cn('inputs')}>
                    <TextField
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш 
                        value={formValues.login}
                        name="login"
                        helperText={formErrors.login}
                        error={!!formErrors.login}
                        label="Логин"
                        variant="outlined"
                        fullWidth />
                    <TextField
                        onChange={handleChange}
                        onKeyDown={handleKeyDown} // Добавляем обработчик нажатия клавиш 
                        value={formValues.password}
                        name="password"
                        type="password"
                        helperText={formErrors.password}
                        error={!!formErrors.password}
                        label="Пароль"
                        variant="outlined"
                        fullWidth
                    />
                </div>

                <div className={cn('Button')}>
                    <Button onClick={handleSubmit}>Войти</Button>
                </div>
                <div>
                    {/* Ваша форма логина */}
                    {authError && <p>{authError}</p>}
                </div>
            </div>
            {/* <CreateAdmin></CreateAdmin> */}
        </div>
    );
};

export default Auth;
