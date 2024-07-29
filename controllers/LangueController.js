const Langue = require("../models/Langue");
const User = require("../models/User");
const Experience = require("../models/Experience");

const addLanguageToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { nom } = req.body;
        const newLanguage = new Langue({ nom ,userId });
        await newLanguage.save();
        res.status(201).json({ message: 'Language added to user successfully', language: newLanguage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding language to user' });
    }
};

const updateLanguage = async (req, res) => {
    try {
        const { userId, languageId } = req.params;
        const { nom } = req.body;
        const updatedLanguage = await Langue.findByIdAndUpdate(languageId, { nom }, { new: true });
        if (!updatedLanguage) {
            return res.status(404).json({ error: 'Language not found' });
        }
        res.json({ message: 'Language updated successfully', language: updatedLanguage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating language' });
    }
};

const deleteLanguage = async (req, res) => {
    try {
        const { userId, languageId } = req.params;
        await User.findByIdAndUpdate(userId, { $pull: { langues: languageId } });
        await Langue.findByIdAndDelete(languageId);
        res.json({ message: 'Langue deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting langue' });
    }
};

const getLanguesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const Langues = await Langue.find({ userId: userId });
        res.json(Langues);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting langues for user' });
    }
};

module.exports = { addLanguageToUser,updateLanguage,deleteLanguage,getLanguesByUser };
