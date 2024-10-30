import mongoose from 'mongoose';

const autosalonSchema = new mongoose.Schema({
    status: { type: Boolean, required: true },
    nameSalon: { type: String, required: true },
    image: { type: String, required: true },
    city: { type: String, required: true },
    rating: { type: Number, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true },
    site: { type: String, required: true },
    schedule: { type: String, required: true },
    meta_title: { type: String, required: false },
    meta_description: { type: String, required: false },
    meta_keywords: { type: String, required: false },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const autosalonModel = mongoose.model('Autosalon', autosalonSchema);

export default autosalonModel;
