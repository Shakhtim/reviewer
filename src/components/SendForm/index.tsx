import React, { useEffect, useState } from "react";
import './SendForm.ts';
import {useStars} from './SendForm.ts';
import { useDispatch } from "react-redux";
import { submitReview } from "../../redux/review/index.ts";
import { AppDispatch } from '../../store.ts';
import { Review } from "../../redux/review/types.ts";

const SendForm = () => {
    const selectedStars = useStars();
    const dispatch = useDispatch<AppDispatch>();
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [autosalon, setAutosalon] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [errors, setErrors] = useState({});

    const handleSubmit = (event) => {
        event.preventDefault();

        const errors: { [key: string]: string } = {};
        if (!author) errors.author = 'Поле "Ваше имя" не может быть пустым';
        if (!text) errors.text = 'Поле "Отзыв" не может быть пустым';
        if (selectedStars === 0) errors.selectedStars = 'Пожалуйста, выберите оценку';
        if (!autosalon) errors.autosalon = 'Пожалуйста, выберите автосалон';

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const review: Review = {
            id: Date.now(),
            author,
            title,
            text,
            rating: selectedStars,
            autosalon,
        };

        dispatch(submitReview(review));

        // очистите форму или сделайте что-то еще после отправки формы
        setName('');
        setText('');
        setAutosalon('');
        setIsSubmitted(true); 
        setErrors({});
    };
    
    return (<>
        <div className="col-lg-6">
            <form className="hero-form2" onSubmit={handleSubmit}>
            <div>
                <h2 className="hero-form2__title">Добавить отзыв</h2>
            </div>
            <div>
                <label className="h5">Выберите автосалон</label>
                <div className="form-group">
                <i className="fas fa-building"></i>
                <select className="form-select form-group__salons" name="name" value={autosalon} onChange={(e) => setAutosalon(e.target.value)}>
                    <option value="" selected>Автосалон</option>
                    <option value="dbr">АЦ Добролюбова</option>
                    <option value="major">Major</option>
                    <option value="bereg">АЦ Береговой</option>
                </select>
                {errors.autosalon && <div className={`error ${isSubmitted ? 'hidden' : ''}`}>{errors.autosalon}</div>}
                </div>
            </div>
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
            </form>
        </div>
    </>);
}
 
export default SendForm;