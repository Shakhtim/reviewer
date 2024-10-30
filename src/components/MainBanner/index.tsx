import React from "react";
import './MainBanner.scss'
import './_hero.scss'
import SendForm from "../SendForm/index.tsx";


const MainBanner = () => {
    return (<>
        <section className="hero-layout1">
            <div>
            <div className="vs-carousel hero-slider2" data-slide-show="1" data-fade="true">
                <div className="hero-slide hero-mask" data-bg-src="assets/img/banner/hero2-bg.jpg">
                <div className="container">
                    <div className="row align-items-center justify-content-between">
                    <div className="col-lg-6">
                        <div className="hero-content">
                        {/* <span className="hero-subtitle">Let's Go Now</span> */}
                        <h1 className="hero-title">Реальные отзывы покупателей про автосалоны Москвы</h1>
                        <p className="hero-text">Мы размещаем у себя отзывы реальных клиентов автосалонов, которые делятся опытом и впечатлением от покупки автомобиля у автодилеров Москвы и России</p>
                        {/* <a href="about.html" className="vs-btn style4">Read More</a> */}
                        </div>
                    </div>
                    <SendForm></SendForm>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </section>
    </>);
}
 
export default MainBanner;