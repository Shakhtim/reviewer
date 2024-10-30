import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    login: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    surname: { type: String, required: true },
}, {
    timestamps: true,
});

const adminModel = mongoose.model('Admin', adminSchema);

export default adminModel;
