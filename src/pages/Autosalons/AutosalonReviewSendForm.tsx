import React, { useState } from "react";
import {useStars} from '../../components/SendForm/SendForm.ts';

const AutosalonReviewSendForm = ({nameSalon}) => {

    const selectedStars = useStars();
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();
  
        const errors: { [key: string]: string } = {};
        if (!author) errors.author = 'Поле "Ваше имя" не может быть пустым';
        if (!text) errors.text = 'Поле "Отзыв" не может быть пустым';
        if (selectedStars === 0) errors.selectedStars = 'Пожалуйста, выберите оценку';
  
        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }
  
        const review: Review = {
            author,
            title,
            text,
            rating: selectedStars,
            nameSalon: selectedAutosalon.nameSalon,
        };
  
        dispatch(createReview(review));
  
        // очистите форму или сделайте что-то еще после отправки формы
        setAuthor('');
        setText('');
        setIsSubmitted(true); 
        setErrors({});
    };

    return (
        <>
            <div className="autosalonPage__sendform">
                <form className="hero-form2" onSubmit={handleSubmit}>
                <div>
                    <h2 className="hero-form2__title">Добавить отзыв</h2>
                </div>
                <div className="autosalonPage__sendform-form">

                        <div>
                            <div className="stars_item-parent">
                                <label className="h5">Ваше оценка</label>
                                <div className="stars_item">
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                    <i className="fas fa-star"></i>
                                </div>
                                {errors.selectedStars && <div className={`error ${isSubmitted ? 'hidden' : ''}`}>{errors.selectedStars}</div>}
                            </div>
                            <div>
                                <label className="h5">Ваше имя</label>
                                <div className="form-group ">
                                    <i className="fas fa-user"></i>
                                    <input type="text" placeholder="Имя" value={author} onChange={(e) => setAuthor(e.target.value)}/>
                                    {errors.author && <div className={`error ${isSubmitted ? 'hidden' : ''}`}>{errors.author}</div>}
                                </div>
                            </div>
                            <div>
                                <label className="h5">Тема отзыва</label>
                                <div className="form-group ">
                                    <i className="fas fa-comment"></i>
                                    <input type="text" placeholder="Тема отзыва" value={title} onChange={(e) => setTitle(e.target.value)}/>
                                    {errors.title && <div className={`error ${isSubmitted ? 'hidden' : ''}`}>{errors.title}</div>}
                                </div>
                            </div>
                            <div>
                        </div>
                    </div>

                    <div>
                        <div>
                            <label className="h5">Отзыв</label>
                                <div className="form-group">
                                <i className="fas fa-file"></i>
                                <textarea className="form-control__textarea" placeholder="Напишите подробный отзыв" value={text} onChange={(e) => setText(e.target.value)}></textarea>
                                {errors.text && <div className={`error ${isSubmitted ? 'hidden' : ''}`}>{errors.text}</div>}
                                </div>
                            </div>
                            <div>
                                <button className="vs-btn style4 hero-form2__btn">Отправить отзыв</button>
                            </div>
                        </div>

                </div>
                </form>
            </div>
        </>
    )
}

export default AutosalonReviewSendForm;