import React from 'react';
import { useSelector } from "react-redux";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './SliderSalons.scss'


const SliderSalons = () => {
    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    const { autosalons, status, error } = useSelector((state) => state.autosalon);

    return (
        <>
            <section className="space bg-light shape-mockup-wrap sliderSalons">
                <div className="container ">
                <div className="row justify-content-center text-center">
                    <div className="col-xl-6 col-lg-8 wow fadeInUp" data-wow-delay="0.3s">
                        <div className="title-area">
                            <h2 className="sec-title h1">Автосалоны Москвы</h2>
                        </div>
                    </div>
                </div>
                <Slider className="row vs-carousel" data-slide-show="4" data-arrows="false" data-lg-slide-show="3" data-md-slide-show="2"
                    data-sm-slide-show="1" {...settings}>
                    {autosalons.map((salon) => (
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
                </Slider>
                <div className="text-center pt-lg-2">
                    <Link to={'/autosalons'} className="vs-btn">Смотреть все</Link>
                </div>
                </div>
            </section>
        </>
    );
};

export default SliderSalons;