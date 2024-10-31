import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAutosalonById } from "../../redux/admin/autosalon/index.ts"; 

const AutosalonsView = () => {
  const { id } = useParams(); 
  console.log(id);
  
  const dispatch = useDispatch();
  const { selectedAutosalon, status, error } = useSelector((state) => state.autosalon);

  useEffect(() => {
    dispatch(getAutosalonById(id)); 
  }, [dispatch, id]);

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
                          <div className="col-lg-9">
                              <div className="filter-active tour-booking-active">
                                  <div className="filter-item tab-content1" key={selectedAutosalon._id}>
                                    <div className="info-image autosalonPage__image">
                                      <img src={`/uploads/autosalons/${selectedAutosalon.image}`} alt="tours-img"/>
                                    </div>
                                    <div className="tour-review">
                                        <ul>
                                          {Array.from({ length: 5 }, (_, index) => (
                                              <i
                                              key={index}
                                              className={index < selectedAutosalon.rating ? 'fas fa-star' : 'far fa-star'}
                                              ></i>
                                          ))}
                                          <li>(3 Отзыва)</li>
                                        </ul>
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
                      </div>
                  </div>
              </div>
          </div>
          <div className="autosalonPage__reviews">
            <ul>
              <li>Отзывы</li>
              <li>Отзывы</li>
              <li>Отзывы</li>
              <li>Отзывы</li>
            </ul>
          </div>
      </section>
    </>
  );
};

export default AutosalonsView;
