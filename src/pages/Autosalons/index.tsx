import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Autosalons.scss';
import { Link } from 'react-router-dom';
import { deleteAutosalon, getAutosalons } from '../../redux/admin/autosalon/index.ts';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';

const CustomButtonAdd = styled(Button)(({ theme }) => ({
    '&:hover': {
        backgroundColor: 'darkgreen',
        color: '#fff',
    },
}));

const Autosalons = () => {
    const dispatch = useDispatch();
    const { autosalons, status, error } = useSelector((state) => state.autosalon);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(25);
    const [searchTerm, setSearchTerm] = useState('');

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

    // Фильтрация автосалонов по поисковому запросу
    const filteredSalons = autosalons.filter(salon =>
        salon.nameSalon.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Определяем общее количество страниц
    const totalPages = Math.ceil(filteredSalons.length / itemsPerPage);

    // Определяем индекс первого и последнего элемента для текущей страницы
    const indexOfLastSalon = currentPage * itemsPerPage;
    const indexOfFirstSalon = indexOfLastSalon - itemsPerPage;
    const currentSalons = filteredSalons.slice(indexOfFirstSalon, indexOfLastSalon);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Обработчик изменения количества элементов на странице
    const handleItemsPerPageChange = (event) => {
        setItemsPerPage(Number(event.target.value));
        setCurrentPage(1); // Сброс страницы на первую при изменении количества элементов
    };

    // Обработчик изменения значения поиска
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1); // Сброс страницы на первую при изменении значения поиска
    };

    // Обработка состояния загрузки и ошибок
    if (status === 'loading') {
        return <div>Загрузка...</div>;
    }

    if (status === 'failed') {
        return <div>Ошибка: {error}</div>;
    }

    return (
        <>  
            <div className="breadcumb-wrapper" data-bg-src="assets/img/breadcumb/breadcumb-bg.jpg">
                <div className="container z-index-common">
                    <div className="breadcumb-content">
                        <h1 className="breadcumb-title">Все автосалоны</h1>
                    </div>
                </div>
            </div>
            <section className="space-bottom autosalonsPage">
                <div className="outer-wrap">
                    <div className="container">
                        <div className="shadow-content1">
                            <div className="row">
                                <div className="col-lg-9">
                                    <div className="row filter-active tours-active">
                                        {currentSalons.map((salon) => (
                                            <div className="col-xl-4 col-lg-6 col-sm-6 filter-item hightTolow" key={salon._id}>
                                                <div className="package-style1">
                                                    <div className="package-img autosalonsPage__image">
                                                        <Link to={`/autosalons/${salon._id}`}>
                                                            <img src={`/uploads/autosalons/${salon.image}`} alt={salon.nameSalon} />
                                                        </Link>
                                                    </div>
                                                    <div className="package-content">
                                                        <div className="package-review">
                                                            {Array.from({ length: 5 }, (_, index) => (
                                                                <i
                                                                key={index}
                                                                className={index < salon.rating ? 'fas fa-star' : 'far fa-star'}
                                                                ></i>
                                                            ))}
                                                        </div>
                                                        <h3 className="package-title">
                                                            <Link className=' autosalonsPage__name' to={`/autosalon/${salon._id}`}>{salon.nameSalon}</Link>
                                                        </h3>
                                                        <p className="package-text autosalonsPage__address">{salon.address}</p>
                                                        <div className="package-meta">
                                                            <a href={`tel:${salon.phone}`} className='autosalonsPage__phone'>
                                                                <i className="fas fa-phone"></i>{salon.phone}
                                                            </a>
                                                        </div>
                                                        <div className="package-footer">
                                                            <Link to={`/autosalons/${salon._id}`} className="vs-btn autosalonsPage__btn">Подробнее</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="vs-pagination pt-lg-2">
                                        <ul>
                                            <li>
                                                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                                                    <i className="fas fa-chevron-left"></i>
                                                </button>
                                            </li>
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <li key={index + 1}>
                                                    <button onClick={() => handlePageChange(index + 1)} disabled={currentPage === index + 1}>
                                                        {index + 1}
                                                    </button>
                                                </li>
                                            ))}
                                            <li>
                                                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                                    <i className="fas fa-chevron-right"></i>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="col-lg-3">
                                    <div className="sidebar-area tours-sidebar">
                                        <div className="widget">
                                            <h3 className="widget_title">Найти автосалон</h3>
                                            <form className="booking-form">
                                                <div className="form-group">
                                                    <i className="fas fa-search"></i>
                                                    <input
                                                        type="text"
                                                        placeholder="Поиск"
                                                        value={searchTerm}
                                                        onChange={handleSearchChange}
                                                    />
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Autosalons;
