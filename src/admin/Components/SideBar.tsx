import React from 'react';
import { Link } from 'react-router-dom';

const SideBar = () => {

    return (
        <aside className='admin-sidebar'>
            <nav>
                <ul>
                    <li>
                        <i className="fas fa-building" aria-hidden="true"></i>
                        <Link to="/admin/autosalons">Автосалоны</Link >
                    </li>
                    <li>
                        <i className="fa fa-comments" aria-hidden="true"></i>
                        <Link to="/admin/comments">Комментарии</Link >
                    </li>
                    <li>
                        <i className="fa fa-tags" aria-hidden="true"></i>
                        <Link to="/admin/tags">Теги</Link >
                    </li>
                    <li>
                        <i className="fa fa-newspaper" aria-hidden="true"></i>
                        <Link to="/admin/news">Новости</Link >
                    </li>
                </ul>
            </nav>
        </aside>
    );
};

export default SideBar;
