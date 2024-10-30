import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { editAutosalon } from '../../../redux/admin/autosalon/index.ts'; 
import ImageUploader from '../../../components/UploadImages/index.tsx';
import { BASE_URL } from '../../../scripts/utils.ts';
import { FormDataState } from '../../../redux/admin/autosalon/types.ts';
import './Edit.scss'

const AdminAutosalonEdit = () => {
    const dispatch = useDispatch();
    const { id: salonId } = useParams(); 
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<FormDataState>({
        status: false,
        nameSalon: '',
        image: null,
        city: '',
        rating: 0,
        address: '',
        phone: '',
        site: '',
        schedule: '',
        meta_title: '',
        meta_description: '',
        meta_keywords: '',
    });
    
    

    useEffect(() => {
        const fetchAutosalon = async () => {
            try {
                const response = await fetch(`http://localhost:3001/admin/autosalons/edit/${salonId}`);
                
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const data = await response.json();
                setFormData({
                    ...data,
                    status: Boolean(data.status),
                });
            } catch (error) {
                console.error('Ошибка при загрузке данных автосалона:', error);
            }
        };
    
        fetchAutosalon();
    }, [salonId]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, type, checked, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value, 
        }));
    };

    const handleSendFiles = (files: Blob) => {
        setFormData(prevState => ({
            ...prevState,
            image: files,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true); 
        const formDataToSend = new FormData();
        
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        
        try {
            await dispatch(editAutosalon({ _id: salonId, autosalonData: formDataToSend }));
        } catch (error) {
            console.error('Ошибка при обновлении автосалона:', error);
        } finally {
            setLoading(false);
        }
    };
    

    // Проверка на загрузку данных
    if (!formData.nameSalon) {
        return <div>Загрузка...</div>;
    }
    const imageUrl = formData.image instanceof Blob
    ? URL.createObjectURL(formData.image)
    : formData.image
    ? `/uploads/autosalons/${formData.image}`
    : null;
    console.log(formData.image); 
    
    return (
        <section className='adminSalonEdit'>
            <div className="container">
                <h3>Редактировать автосалон</h3>
                <form onSubmit={handleSubmit} className='form'>
                    <div>
                        <label htmlFor="status">Статус автосалона:</label>
                        <input type="checkbox"
                            name="status"
                            id="status"
                            checked={formData.status}
                            onChange={handleChange}
                        />
                        <span>{formData.status === true ? 'Активен' : 'Неактивен'}</span>
                    </div>
                    <div>
                        <label>Название автосалона:</label>
                        <input type="text"
                            name="nameSalon"
                            value={formData.nameSalon}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className='autosalon-image'>
                        <label>Картинка:</label>
                        <ImageUploader onSendFiles={handleSendFiles}>
                            {formData.image && (
                                <img src={imageUrl} alt="AutosalonImage" />
                            )}
                        </ImageUploader>
                    </div>
                    <div>
                            <label>Рейтинг:</label>
                            <select
                                name="rating"
                                value={formData.rating}
                                onChange={handleChange}
                                required>
                                <option value="" disabled>Выбрать оценку</option>
                                <option value="1">1 Звезда</option>
                                <option value="2">2 Звезда</option>
                                <option value="3">3 Звезда</option>
                                <option value="4">4 Звезда</option>
                                <option value="5">5 Звезда</option>
                            </select>
                        </div>
                    <div>
                        <label>Город:</label>
                        <input type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Адрес:</label>
                        <input type="text"
                            name="address"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Телефон:</label>
                        <input type="text"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Сайт:</label>
                        <input type="text"
                            name="site"
                            value={formData.site}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Расписание:</label>
                        <input type="text"
                            name="schedule"
                            value={formData.schedule}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label>Meta Title:</label>
                        <input type="text"
                            name="meta_title"
                            value={formData.meta_title}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Meta Description:</label>
                        <textarea name="meta_description"
                            value={formData.meta_description}
                            onChange={handleChange}
                             />
                    </div>
                    <div>
                        <label>Meta Keywords:</label>
                        <input type="text"
                            name="meta_keywords"
                            value={formData.meta_keywords}
                            onChange={handleChange}
                            
                        />
                    </div>
                    <button type="submit">Сохранить изменения</button>
                </form>
            </div>
        </section>
    );
};

export default AdminAutosalonEdit;
