import expressAsyncHandler from 'express-async-handler';
import autosalonModel from '../../../model/autosalonModel.js';

const getAutosalons = expressAsyncHandler(async (req, res) => {
    const autosalons = await autosalonModel.find(); 
    res.status(200).json(autosalons); 
});

export default getAutosalons;
