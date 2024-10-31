import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAutosalonById } from "../../redux/admin/autosalon/index.ts"; 
import { getReviewBySalon } from "../../redux/review/index.ts"; 
import { getReviewWord, getRandomItems } from "../../scripts/utils.ts";

import ReviewList from "./ReviewList.tsx";  
const AutosalonsView = () => {
  const { id } = useParams(); 
  const dispatch = useDispatch();
  const { selectedAutosalon, autosalons, status, error } = useSelector((state) => state.autosalon);
  const { reviews } = useSelector((state) => state.review);

  useEffect(() => {
    dispatch(getAutosalonById(id)); 
    dispatch(getReviewBySalon(selectedAutosalon.nameSalon));
  }, [dispatch, id, selectedAutosalon.nameSalon]);

  const randomAutosalons = getRandomItems(autosalons, 3);
  console.log(autosalons);

  if (status === 'loading') {
    return <div>Загрузка...</div>;
  }

  if (status === 'failed') {
    return <div>Ошибка: {error}</div>;
  }

  if (!selectedAutosalon) {
    return <div>Автосалон не найден</div>; 
  }
  console.log(reviews);

  return (
    <>
      <div className="breadcumb-wrapper" data-bg-src="assets/img/breadcumb/breadcumb-bg.jpg">
        <div className="container z-index-common">
          <div className="breadcumb-content">
            <h1 className="breadcumb-title">{selectedAutosalon.nameSalon}</h1>
          </div>
        </div>
      </div>
      <section className="space-bottom autosalonPage">
          <div className="outer-wrap">
              <div className="container">
                  <div className="shadow-content1">
                      <div className="row">
                          <div className="col-lg-8">
                              <div className="filter-active tour-booking-active">
                                  <div className="filter-item tab-content1" key={selectedAutosalon._id}>
                                    <div className="info-image autosalonPage__image">
                                      <img src={`/uploads/autosalons/${selectedAutosalon.image}`} alt="tours-img"/>
                                    
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
                                    <div className="product_meta">
                                      <span className="sku_wrapper">SKU: <span className="sku">02</span>
                                      </span>
                                      <span className="posted_in">Category: <a href="#" rel="tag">Accessories</a>
                                      </span>
                                      <span>Tags: <a href="#" rel="tag">Camping</a><a href="#" rel="tag">Summer</a><a href="#" rel="tag">Vintage</a></span>
                                    </div>
                                    <div className="row justify-content-between align-items-center">
                                      <div className="col-md-6">
                                        <h2 className="tab-title">{selectedAutosalon.nameSalon}</h2>
                                      </div>
                                      <div className="col-auto">
                                        <p className="tour-price">{selectedAutosalon.city}</p>
                                      </div>
                                    </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-lg-4 autosalonPage__similar">
                            <div className="sidebar-area">
                            <div className="widget">
                              <h3 className="widget_title">Похожие автосалоны</h3>
                              {randomAutosalons.map((similarSalon) => (
                                <div className="recent-post-wrap" key={similarSalon._id}>
                                  <div className="recent-post">
                                    <div className="media-img">
                                      <Link to={`/autosalons/${similarSalon._id}`}>
                                        <img src={`/uploads/autosalons/${similarSalon.image}`} alt={similarSalon.nameSalon}/>
                                      </Link>
                                    </div>
                                    <div className="media-body">
                                      <h4 className="post-title">
                                        <Link className="text-inherit" to={`/autosalons/${similarSalon._id}`}>{similarSalon.nameSalon}</Link>
                                      </h4>
                                      <div className="recent-post-meta">
                                        <i className="fas fa-location-arrow"></i>
                                        <Link to={`/autosalons/${similarSalon._id}`}>{similarSalon.address}</Link>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
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
