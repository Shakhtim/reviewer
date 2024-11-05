import React from 'react';
import { Link } from 'react-router-dom';

const News = () => {
    return (
        <section className="space space-extra-bottom blog-wrapper">
            <div className="container">
            <div className="row justify-content-center text-center">
                <div className="col-xl-6 col-lg-8 wow fadeInUp" data-wow-delay="0.3s">
                <div className="title-area">
                    <span className="sec-subtitle">Советы покупателю</span>
                    <h2 className="sec-title h1">Новости и полезные статьи</h2>
                </div>
                </div>
            </div>
            <div className="row vs-carousel" data-slide-show="3" data-arrows="false" data-lg-slide-show="2" data-md-slide-show="2"
                data-sm-slide-show="1">
                <div className="col-xl-4">
                <div className="vs-blog blog-style3">
                    <div className="blog-img">
                    <a href="blog-details.html"><img src="assets/img/blog/blog-h-1-1.jpg" alt="blog image"/></a>
                    </div>
                    <div className="blog-content">
                    <h2 className="blog-title"><a href="blog-details.html">We Are Giving Amazing Experience For VIP</a></h2>
                    <p className="blog-text">Lorem ipsum dolor sit amet, adipiscfvdg fgjnving consectetur adipiscing elit. dolor
                        sit amet.</p>
                    <div className="blog-bottom">
                        <a className="blog-date" href="blog-details.html"><i className="fas fa-calendar-alt"></i> July 22, 2023</a>
                        <a className="vs-btn style4" href="blog-details.html">Read More <i className="fal fa-arrow-right"></i></a>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-xl-4">
                <div className="vs-blog blog-style3">
                    <div className="blog-img">
                    <a href="blog-details.html"><img src="assets/img/blog/blog-h-1-2.jpg" alt="blog image"/></a>
                    </div>
                    <div className="blog-content">
                    <h2 className="blog-title"><a href="blog-details.html">Uncharted Territories Are Exploring The Unknown</a>
                    </h2>
                    <p className="blog-text">Lorem ipsum dolor sit amet, adipiscfvdg fgjnving consectetur adipiscing elit. dolor
                        sit amet.</p>
                    <div className="blog-bottom">
                        <a className="blog-date" href="blog-details.html"><i className="fas fa-calendar-alt"></i> July 24, 2023</a>
                        <a className="vs-btn style4" href="blog-details.html">Read More <i className="fal fa-arrow-right"></i></a>
                    </div>
                    </div>
                </div>
                </div>
                <div className="col-xl-4">
                <div className="vs-blog blog-style3">
                    <div className="blog-img">
                    <a href="blog-details.html"><img src="assets/img/blog/blog-h-1-3.jpg" alt="blog image"/></a>
                    </div>
                    <div className="blog-content">
                    <h2 className="blog-title"><a href="blog-details.html">Roam And Revel Captivating Destinations Explored</a>
                    </h2>
                    <p className="blog-text">Lorem ipsum dolor sit amet, adipiscfvdg fgjnving consectetur adipiscing elit. dolor
                        sit amet.</p>
                    <div className="blog-bottom">
                        <a className="blog-date" href="blog-details.html"><i className="fas fa-calendar-alt"></i> Aug 21, 2023</a>
                        <a className="vs-btn style4" href="blog-details.html">Read More <i className="fal fa-arrow-right"></i></a>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            <div className="text-center mb-30 wow fadeInUp pt-lg-2" data-wow-delay="0.7s">
                <a href="blog-grid.html" className="vs-btn">Все новости</a>
            </div>
            </div>
        </section>
    );
};

export default News;