import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAutosalonById } from "../../redux/admin/autosalon/index.ts"; 
import { getReviewBySalon } from "../../redux/review/index.ts"; 
import { getReviewWord } from "../../scripts/utils.ts";
import  AutosalonReviewSendForm  from "./AutosalonReviewSendForm.tsx";

import { AppDispatch } from '../../store.ts';

import ReviewList from "./ReviewList.tsx";  
const AutosalonsView = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch<AppDispatch>();
  const { selectedAutosalon, status, error } = useSelector((state) => state.autosalon);
  const { reviews } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getAutosalonById(id)); 
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedAutosalon && selectedAutosalon.nameSalon) {
      dispatch(getReviewBySalon(selectedAutosalon.nameSalon));
    }
  }, [dispatch, selectedAutosalon]);

  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка: {error}</div>;
  }

  if (!selectedAutosalon) {
    return <div>Автосалон не найден</div>; 
  }

  return (
    <>
      <section className="breadcumb-wrapper breadcumb-wrapper__autosalon-view" data-bg-src="assets/img/breadcumb/breadcumb-bg.jpg">
        <div className="container z-index-common">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">{selectedAutosalon.nameSalon}</h1>
            <div className="breadcumb-menu-wrap">
              <ul className="breadcumb-menu">
                <li><Link to={"/"}>Главная</Link></li>
                <li><Link to={"/autosalons"}>Автосалоны</Link></li>
                <li>{selectedAutosalon.nameSalon}</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="space-bottom autosalonPage">
          <div className="outer-wrap">
              <div className="container">
                  <div className="shadow-content1">
                      <div className="row">
                          <div className="col-lg-12">
                              <div className="filter-active tour-booking-active">
                                <div className="info-image autosalonPage__image">
                                    <img src={`/uploads/autosalons/${selectedAutosalon.image}`} alt={selectedAutosalon.image}/>
                                    <div className="tour-review">
                                        <ul>
                                          {Array.from({ length: 5 }, (_, index) => (
                                              <i
                                              key={index}
                                              className={index < selectedAutosalon.rating ? 'fas fa-star' : 'far fa-star'}
                                              ></i>
                                          ))}
                                          <li>({getReviewWord(reviews.length)})</li>
                                        </ul>
                                    </div>
                                  </div>
                                  <div className="info-content">
                                    <div className="filter-item tab-content1" key={selectedAutosalon._id}>
                                      <div> 
                                        <div className="row justify-content-between align-items-center">
                                          <div className="col-md-6">
                                            <h2 className="tab-title">{selectedAutosalon.nameSalon}</h2>
                                            <p className="tour-price">{selectedAutosalon.address}</p>
                                          </div>
                                        </div>
                                        <div className="product_meta">
                                            <span className="sku_wrapper">Статус: 
                                              <span className="sku" style={{ color: selectedAutosalon.status ? 'green' : 'red' }}>
                                                {selectedAutosalon.status ? 'Работает' : 'Не работает'}
                                              </span>
                                            </span>
                                            <span className="sku_wrapper">Название: <span className="sku">{selectedAutosalon.nameSalon}</span></span>
                                            <span className="sku_wrapper">Город: <span className="sku">{selectedAutosalon.city}</span></span>
                                            <span className="sku_wrapper">Адрес: <span className="sku">{selectedAutosalon.address}</span></span>
                                            <span className="sku_wrapper">Телефон: <a className="sku autosalonPage__phone" href={`tel:${selectedAutosalon.phone}`}>{selectedAutosalon.phone}</a></span>
                                            <span className="sku_wrapper">Режим работы: <span className="sku">{selectedAutosalon.schedule}</span></span>
                                            <span className="sku_wrapper">Сайт: <a href={`https://${selectedAutosalon?.site}`} className="sku autosalonPage__site">{selectedAutosalon?.site}</a></span>
                                          </div>
                                        </div>
                                      </div> 
                                      <AutosalonReviewSendForm nameSalon={selectedAutosalon.nameSalon}></AutosalonReviewSendForm>
                                  </div>
                              </div>
                          </div>
                            
                      </div>
                  </div>
              </div>
          </div>
          <div className="container autosalonPage__reviews">
            <div className="col-lg-12">
              <ReviewList reviews={reviews}></ReviewList>
            </div>
          </div>
      </section>
    </>
  );
};

export default AutosalonsView;
