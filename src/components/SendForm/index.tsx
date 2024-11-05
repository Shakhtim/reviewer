import React, { useEffect, useState } from "react";
import './SendForm.ts';
import {useStars} from './SendForm.ts';
import { useDispatch, useSelector } from "react-redux";
import { createReview } from "../../redux/review/index.ts";
import { AppDispatch } from '../../store.ts';
import { Review } from "../../redux/review/types.ts";
import { getAutosalons } from '../../redux/admin/autosalon/index.ts';

const SendForm = () => {
    const selectedStars = useStars();
    const dispatch = useDispatch<AppDispatch>();
    const [author, setAuthor] = useState('');
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [nameSalon, setNameSalon] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { autosalons, status, error } = useSelector((state) => state.autosalon);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        dispatch(getAutosalons());
    }, [dispatch]);
    const handleSubmit = (event) => {
        event.preventDefault();

        const errors: { [key: string]: string } = {};
        if (!author) errors.author = 'Поле "Ваше имя" не может быть пустым';
        if (!text) errors.text = 'Поле "Отзыв" не может быть пустым';
        if (selectedStars === 0) errors.selectedStars = 'Пожалуйста, выберите оценку';
        if (!nameSalon) errors.nameSalon = 'Пожалуйста, выберите автосалон';

        if (Object.keys(errors).length > 0) {
            setErrors(errors);
            return;
        }

        const review: Review = {
            author,
            title,
            text,
            rating: selectedStars,
            nameSalon,
        };

        dispatch(createReview(review));

        setAuthor('');
        setText('');
        setNameSalon('');
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
                <select className="form-select form-group__salons" name="name" value={nameSalon} onChange={(e) => setNameSalon(e.target.value)}>
                    <option value="empty" selected>Автосалон</option>
                    {autosalons.map((salon) => (
                        <option value={salon.nameSalon} selected>{salon.nameSalon}</option>
                    ))}
                </select>
                {errors.nameSalon && <div className={`error ${isSubmitted ? 'hidden' : ''}`}>{errors.nameSalon}</div>}
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