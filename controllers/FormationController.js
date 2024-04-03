const Formation = require("../models/Formation");
const User = require("../models/User");

const addEducationToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { diplome, etablissement, dateDebut, dateFin, enCours } = req.body;
        const newEducation = new Formation({ diplome, etablissement, dateDebut, dateFin, enCours ,userId });
        await newEducation.save();
        await User.findByIdAndUpdate(userId, { $push: { educations: newEducation._id } });
        res.status(201).json({ message: 'Education added to user successfully', education: newEducation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding education to user' });
    }
};

const updateEducation = async (req, res) => {
    try {
        const { userId, formationId } = req.params;
        const { diplome, etablissement, dateDebut, dateFin, enCours } = req.body;
        const updatedEducation = await Formation.findByIdAndUpdate(formationId, { diplome, etablissement, dateDebut, dateFin, enCours }, { new: true });
        if (!updatedEducation) {
            return res.status(404).json({ error: 'Education not found' });
        }
        res.json({ message: 'Education updated successfully', education: updatedEducation });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating education' });
    }
};

const deleteEducation = async (req, res) => {
    try {
        const { userId, formationId } = req.params;
        await User.findByIdAndUpdate(userId, { $pull: { educations: formationId } });
        await Formation.findByIdAndDelete(formationId);
        res.json({ message: 'Education deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting education' });
    }
};

const getFormationsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const Formations = await Formation.find({ userId: userId });
        res.json(Formations);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting formations for user' });
    }
};

module.exports = { addEducationToUser,updateEducation,deleteEducation ,getFormationsByUser};
