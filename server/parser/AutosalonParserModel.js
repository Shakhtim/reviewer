import mongoose from 'mongoose';

const autosalonSchema = new mongoose.Schema({
    nameSalon: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    site: { type: String, required: true },
    image: { type: String, required: false },
    status: { type: Boolean, default: true },
    city: { type: String, default: 'Moscow' },
    schedule: { type: String, default: 'с 09:00 - 21:00' },
    meta_title: { type: String, default: '' },
    meta_description: { type: String, default: '' },
    meta_keywords: { type: String, default: '' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

// Обновляем updated_at при каждом обновлении документа
autosalonSchema.pre('save', function(next) {
    this.updated_at = Date.now();
    next();
});

const autosalonParserModel = mongoose.model('Autosalon', autosalonSchema);

export default autosalonParserModel;
