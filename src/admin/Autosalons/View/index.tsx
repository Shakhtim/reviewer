import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './View.scss';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import { deleteAutosalon, getAutosalons } from '../../../redux/admin/autosalon/index.ts';

const CustomButtonAdd = styled(Button)(({ theme }) => ({
    '&:hover': {
        backgroundColor: 'darkgreen',
        color: '#fff',
    },
}));

const AdminAutosalonsView = () => {
    const dispatch = useDispatch();
    const { autosalons, status, error } = useSelector((state) => state.autosalon);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);

    useEffect(() => {
        dispatch(getAutosalons());
    }, [dispatch]);

    const handleDelete = async (_id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот автосалон?')) {
            try {
                await dispatch(deleteAutosalon(_id));
            } catch (error) {
                console.error('Ошибка при удалении автосалона:', error);
            }
        }
    };

    // Определяем общее количество страниц
    const totalPages = Math.ceil(autosalons.length / itemsPerPage);

    // Определяем индекс первого и последнего элемента для текущей страницы
    const indexOfLastSalon = currentPage * itemsPerPage;
    const indexOfFirstSalon = indexOfLastSalon - itemsPerPage;
    const currentSalons = autosalons.slice(indexOfFirstSalon, indexOfLastSalon);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Обработчик изменения количества элементов на странице
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Сброс страницы на первую при изменении количества элементов
    };

    // Обработка состояния загрузки и ошибок
    if (status === 'loading') {
        return <div>Загрузка...</div>;
    }

    if (status === 'failed') {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <section className="adminSalons">
            <div className="adminSalons__header">
                <h5>Список автосалонов</h5>
                <CustomButtonAdd variant="contained" href="/admin/autosalons/create" color="success">Добавить</CustomButtonAdd>
            </div>
            <div className="adminSalons__body">
                <div className="pagination-top">
                    <div className="itemsPerPage">
                        <label htmlFor="itemsPerPage">Элементов на странице: </label>
                        <select id="itemsPerPage" value={itemsPerPage} onChange={handleItemsPerPageChange}>
                            <option value={10}>10</option>
                            <option value={25}>25</option>
                            <option value={50}>50</option>
                            <option value={100}>100</option>
                        </select>
                    </div>
                    <div className="pagination">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button 
                                key={index + 1} 
                                onClick={() => handlePageChange(index + 1)} 
                                disabled={currentPage === index + 1}
                            >
                                {index + 1}
                            </button>
                        ))}
                    </div>
                </div>
                <table className='table-bordered table-striped'>
                    <thead>
                        <tr>
                            <td>ID</td>
                            <td>Статус</td>
                            <td>Рейтинг</td>
                            <td>Название</td>
                            <td>Картинка</td>
                            <td>Действия</td>
                        </tr>
                    </thead>
                    <tbody>
                        {currentSalons.map((salon) => (
                            <tr key={salon._id}>
                                <td id="salonId">{salon._id}</td>
                                <td id="salonStatus" style={{ backgroundColor: salon.status ? 'green' : 'red', color: '#fff', textAlign: 'center' }}>
                                    {salon.status ? 'Активен' : 'Неактивен'}
                                </td>
                                <td id="salonName">{salon.rating}</td>
                                <td id="salonName">{salon.nameSalon}</td>
                                <td id="salonImage">
                                    {salon.image && (
                                        <img src={`http://localhost:3000/uploads/autosalons/${salon.image}`} alt={salon.nameSalon} style={{ width: '100px' }} />
                                    )}
                                </td>
                                <td id="salonAction"> 
                                    <Link to={`/admin/autosalon/edit/${salon._id}`} title='Изменить'>
                                        <i className="fa fa-pencil" aria-hidden="true"></i>
                                    </Link>
                                    <button title='Удалить' onClick={() => handleDelete(salon._id)}>
                                        <i className="fa fa-times" aria-hidden="true"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="pagination">
                {Array.from({ length: totalPages }, (_, index) => (
                    <button 
                        key={index + 1} 
                        onClick={() => handlePageChange(index + 1)} 
                        disabled={currentPage === index + 1}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </section>
    );
};

export default AdminAutosalonsView;
