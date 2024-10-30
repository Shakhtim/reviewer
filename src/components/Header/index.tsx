import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAutosalons } from "../../redux/admin/autosalon/index.ts"; 
import "./Header.scss";
import logoHeader from '../../assets/img/logo.svg';
import { Link } from "react-router-dom";

const Header = () => {
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [showResults, setShowResults] = useState(false);

    // Получаем автосалоны из Redux
    const autosalons = useSelector(state => state.autosalon.autosalons); 

    useEffect(() => {
        dispatch(getAutosalons()); 
    }, [dispatch]);

    useEffect(() => {
        if (searchQuery) {
            const results = autosalons.filter(salon =>
                salon.nameSalon.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setSearchResults(results);
            setShowResults(true);
        } else {
            setShowResults(false);
        }
    }, [searchQuery, autosalons]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const handleSearchFocus = () => {
        if (searchQuery) {
            setShowResults(true);
        }
    };

    const handleResultClick = (salon) => {
        console.log("Выбран автосалон:", salon);
        setSearchQuery(""); 
        setShowResults(false); 
    };

    return (
        <header className="vs-header header-layout3">
            <div className="container">
                <div className="header-top"></div>
            </div>
            <div className="sticky-wrapper">
                <div className="sticky-active">
                    <div className="container position-relative z-index-common">
                        <div className="row align-items-center justify-content-between">
                            <div className="col-auto">
                                <div className="vs-logo">
                                    <Link to="/"><img src={logoHeader} alt="logo" /></Link>
                                </div>
                            </div>
                            <div className="col text-end text-xl-center">
                                <nav className="main-menu menu-style1 d-none d-lg-block">
                                    <ul>
                                        <li><Link to="/autosalons">Автосалоны</Link></li>
                                        <li><Link to="/reviews">Отзывы</Link></li>
                                        <li><Link to="/news">Новости</Link></li>
                                        <li><Link to="/contacts">Контакты</Link></li>
                                    </ul>
                                </nav>
                                <button className="vs-menu-toggle d-inline-block d-lg-none"><i className="fal fa-bars"></i></button>
                            </div>
                            <div className="col-auto d-none d-xl-block">
                                <div className="header-btns">
                                    <div className="search-container">
                                        <input
                                            type="text"
                                            placeholder="Поиск..."
                                            value={searchQuery}
                                            onChange={handleSearchChange}
                                            onFocus={handleSearchFocus}
                                        />
                                        {showResults && (
                                            <div className="search-results">
                                                {searchResults.length > 0 ? (
                                                    searchResults.map(salon => ( // Отображаем все результаты
                                                        <Link 
                                                            to={"/autosalons/"+salon._id}
                                                            key={salon._id}
                                                            className="search-result-item"
                                                            onClick={() => handleResultClick(salon)}
                                                        >
                                                            {salon.nameSalon}
                                                        </Link>
                                                    ))
                                                ) : (
                                                    <div className="search-result-item">Нет результатов</div>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;
