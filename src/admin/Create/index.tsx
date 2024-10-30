import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createAdmin, selectCurrentAdmin, selectIsAuthenticated } from '../../redux/admin/index.ts';
import { AppDispatch } from '../../store.ts';

const CreateAdmin = () => {
    const dispatch = useDispatch<AppDispatch>();
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const isAuthenticated = useSelector(selectIsAuthenticated);
    const currentAdmin = useSelector(selectCurrentAdmin);
    const [email, setEmail] = useState('');
    const [username, setName] = useState('');
    const [surname, setSurname] = useState('');

    const handleCreateAdmin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (login.length < 3 || password.length < 6) {
            setError('Логин должен содержать не менее 3 символов, а пароль - не менее 6 символов.');
            return;
        }

        try {
            const newAdmin = await dispatch(createAdmin({ login, password, email, username, surname })).unwrap();
            setSuccess('Администратор создан успешно!');
            setLogin('');
            setPassword('');
            setEmail('');
            setName('');
            setSurname('');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.errorMessage) {
                setError(err.response.data.errorMessage);
            } else {
                setError('Ошибка при создании администратора');
            }
        }
    };


    return (
        <div>
            <h1>Админка</h1>
            <form onSubmit={handleCreateAdmin}>
                <div>
                    <label>Логин:</label>
                    <input type="text"
                        value={login}
                        onChange={(e) => setLogin(e.target.value)}
                        required />
                </div>
                <div>
                    <label>Пароль:</label>
                    <input type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required />
                </div>
                <div>
                    <label>Имя:</label>
                    <input type="text"
                        value={username}
                        onChange={(e) => setName(e.target.value)}
                        required />
                </div>
                <div>
                    <label>Фамилия:</label>
                    <input type="text"
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                        required />
                </div>
                <button type="submit">Создать администратора</button>
            </form>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
    );
};

export default CreateAdmin;
