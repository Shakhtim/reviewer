import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <>
            <footer className="footer-wrapper footer-layout1" data-bg-src="assets/img/bg/footer-bg.jpg">
                <div className="footer-top">
                <div className="shadow-color"></div>
                
                </div>
                <div className="widget-area">
                <div className="container">
                    <div className="row g-5 justify-content-between">
                    <div className="col-md-6 col-xl-3">
                        <div className="widget footer-widget">
                        <div className="vs-widget-about">
                            <div className="footer-logo">
                            <a href="index.html"><img src="assets/img/white-logo.svg" alt="Travolo" className="logo" /></a>
                            </div>
                            <p className="footer-text">Curabitur aliquet quam id dui bandit posuere blandit. Vivamfdsus magna justo
                            blandit aliquet.</p>
                            <div className="social-style1">
                            <a href="#" target="_blank"><i className="fab fa-facebook-f"></i></a>
                            <a href="#" target="_blank"><i className="fab fa-instagram"></i></a>
                            <a href="#" target="_blank"><i className="fab fa-pinterest-p"></i></a>
                            <a href="#" target="_blank"><i className="fab fa-twitter"></i></a>
                            </div>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-2">
                        <div className="widget widget_nav_menu footer-widget">
                        <h3 className="widget_title">Useful Links</h3>
                        <div className="menu-all-pages-container">
                            <ul className='menu'>
                                <li>
                                    <Link to="/autosalons">Автосалоны</Link >
                                </li>
                                <li>
                                    <Link to="/reviews">Отзывы</Link >
                                </li>
                                <li>
                                    <Link to="/news">Новости</Link >
                                </li>
                                <li>
                                    <Link to="/contacts">Контакты</Link >
                                </li>
                            </ul>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="widget footer-widget">
                        <h4 className="widget_title">Our Instagram</h4>
                        <div className="sidebar-gallery">
                            <a href="assets/img/footer/insta1.jpg" className="popup-image"><img src="assets/img/footer/insta1.jpg"
                                alt="Gallery Image" className="w-100" />
                            </a>
                            <a href="assets/img/footer/insta2.jpg" className="popup-image"><img src="assets/img/footer/insta2.jpg"
                                alt="Gallery Image" className="w-100" />
                            </a>
                            <a href="assets/img/footer/insta3.jpg" className="popup-image"><img src="assets/img/footer/insta3.jpg"
                                alt="Gallery Image" className="w-100" />
                            </a>
                            <a href="assets/img/footer/insta4.jpg" className="popup-image"><img src="assets/img/footer/insta4.jpg"
                                alt="Gallery Image" className="w-100" />
                            </a>
                            <a href="assets/img/footer/insta5.jpg" className="popup-image"><img src="assets/img/footer/insta5.jpg"
                                alt="Gallery Image" className="w-100" />
                            </a>
                            <a href="assets/img/footer/insta6.jpg" className="popup-image"><img src="assets/img/footer/insta6.jpg"
                                alt="Gallery Image" className="w-100" />
                            </a>
                        </div>
                        </div>
                    </div>
                    <div className="col-md-6 col-xl-3">
                        <div className="widget footer-widget">
                        <h4 className="widget_title">Subscribe</h4>
                        <form className="newsletter-form">
                            <p className="form_text">Subscribe Our Newsletter For Getting Quick Updates</p>
                            <input className="form-control" type="email" placeholder="Your Email Address" />
                            <button type="submit" className="vs-btn">Subscribe</button>
                        </form>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
                <div className="container">
                <div className="copyright-wrap">
                    <div className="row justify-content-between align-items-center">
                    <div className="col-lg-auto">
                        <p className="copyright-text">Реальные отзывы покупателей про автосалоны Москвы © 2024 </p>
                    </div>
                    </div>
                </div>
                </div>
            </footer>
        </>
    );
}
 
export default Footer;