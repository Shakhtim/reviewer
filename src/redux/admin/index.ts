import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { PAuth, Admin, AdminState, AuthResponse, PRegister } from './types.ts';
import { BASE_URL } from '../../scripts/utils.ts';
import { RootState } from '../../store.ts';

// Дефолтные значения
const initialState: AdminState = {
    admins: [],
    currentAdmin: {} as Admin,
    isAuthenticated: !!localStorage.getItem('token'), 
};

// Асинхронное действие для аутентификации администратора
export const authAdmin = createAsyncThunk<AuthResponse, PAuth>(
    'admin/auth',
    async (payload: PAuth): Promise<AuthResponse> => {
        const response = await axios.post(BASE_URL + '/admin/auth', payload);

        if (response?.data?.token) {
            localStorage.setItem('token', response.data.token); 
        }

        return {
            token: response.data.token,
            admin: response.data.admin // Предполагается, что сервер возвращает объект admin
        }; 
    }
);

export const logoutAdmin = createAsyncThunk('admin/logout', async () => {
    localStorage.removeItem('token'); // Удаление токена
});

// Асинхронное действие для создания администратора
export const createAdmin = createAsyncThunk('admin/create', async (object: PRegister) => {
    const response = await axios.post(BASE_URL + '/admin/create', object);

    if (response?.data?.token) {
        localStorage.setItem('userId', String(response?.data?.token));
    }

    return response.data; // Убедитесь, что сервер возвращает все нужные данные
});


// Создание среза для управления состоянием администратора
const adminSlice = createSlice({
    name: 'admin',
    initialState,
    reducers: {
        // Здесь можно добавить обработчики действий, если это необходимо
    },
    extraReducers: (builder) => {
        builder
            .addCase(authAdmin.fulfilled, (state, action) => {
                state.currentAdmin = action.payload.admin;
                state.isAuthenticated = true; // Убедитесь, что isAuthenticated устанавливается в true
            })
            .addCase(authAdmin.rejected, (state) => {
                state.isAuthenticated = false; // Устанавливаем isAuthenticated в false при ошибке
            })
            .addCase(createAdmin.fulfilled, (state, action) => {
                state.admins.push(action.payload); // Добавляем нового администратора в список
                state.currentAdmin = action.payload; // Обновляем текущего администратора
            })
            .addCase(logoutAdmin.fulfilled, (state) => {
                state.isAuthenticated = false; // Сбрасываем состояние аутентификации state.currentAdmin = {} as Admin; // Сбрасываем текущего администратора
            });
    }
});

// Экспорт редьюсера
export default adminSlice.reducer;

// Селекторы
export const selectCurrentAdmin = (state: RootState) => state.admin.currentAdmin;
export const selectIsAuthenticated = (state: RootState) => state.admin.isAuthenticated; // Добавленный селектор
