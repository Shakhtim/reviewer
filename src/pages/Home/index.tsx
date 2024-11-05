import React from "react";
import MainBanner from "../../components/MainBanner/index.tsx";
import SliderSalons from "../../components/SliderSalons/index.tsx";
import ReviewsMainPage from "../../components/ReviewsMainPage/index.tsx";
import News from "../../components/News/index.tsx";

const Home = () => {
    return (
        <>
        <h1>Отзовик</h1>
        <MainBanner />
        <SliderSalons />
        <ReviewsMainPage />
        <News />
        </>
    );
}
 
export default Home;