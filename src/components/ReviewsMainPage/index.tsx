import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './ReviewsMainPage.scss';
import { formatDate, truncateText } from "../../scripts/utils.ts";
import { getBestReviews } from '../../redux/review/index.ts';
import commentAuthor from '../../../src/assets/img/author/author.webp';

const ReviewsMainPage = () => {
    const dispatch = useDispatch();
    const bestReviews = useSelector((state) => state.review.reviews);
    const settings = {
        dots: false,
        arrows: false,
        infinite: false,
        autoplay: true,
        speed: 2000,
        slidesToShow: 2,
        slidesToScroll: 2,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };

    useEffect(() => {{
        dispatch(getBestReviews());
    }}, [dispatch]);
    console.log(bestReviews);

    return (
        <>
            <section className="space testimonial-style2 ReviewsMainPage" data-bg-src="assets/img/bg/testimonial-bg-2.jpg">
                <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                    <div className="title-area white-title">
                        <span className="sec-subtitle">Лучшие отзывы</span>
                        <h2 className="sec-title h1">Здесь собраны лучшие отзывы клиентов</h2>
                    </div>
                    </div>
                </div>

                <Slider className="row vs-carousel testimonial-slider2" {...settings}>
                    {bestReviews.map((review) => (
                        <div className="col-xl-2" key={review._id}>
                            <div className="testi-style2">
                                <div className="testi-body">
                                <p className="testi-text">“{truncateText(review.text, 200)}”</p>
                                <div className="testi-rating">
                                    {Array.from({ length: review.rating }, (_, index) => (
                                        <i className="fas fa-star" key={index}></i>
                                    ))} 
                                </div>
                                <span>{formatDate(review.datePublished)}</span>
                                </div>
                                <h3 className="testi-name">{review.nameSalon}</h3>
                                <span className="testi-degi">{review.author}</span>
                                {/* <div className="testi-avater">
                                    <img src={commentAuthor} alt="Comment Author"/>
                                </div> */}
                            </div>
                        </div>
                    ))}
                </Slider>
                </div>
            </section>
        </>
    )
};

export default ReviewsMainPage;