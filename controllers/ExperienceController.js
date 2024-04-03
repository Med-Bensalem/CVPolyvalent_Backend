const Experience = require("../models/Experience");
const User = require("../models/User");

const addExperienceToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { titre, nomEntreprise, description, dateDebut, dateFin ,disponibilite} = req.body;
        const newExperience = new Experience({ titre, nomEntreprise, description, dateDebut, dateFin,disponibilite ,userId});
        await newExperience.save();
        await User.findByIdAndUpdate(userId, { $push: { experiences: newExperience._id } });
        res.status(201).json({ message: 'Experience added to user successfully', experience: newExperience });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding experience to user' });
    }
};

const updateExperience = async (req, res) => {
    try {
        const { userId, experienceId } = req.params;
        const { titre, nomEntreprise, description, dateDebut, dateFin ,disponibilite } = req.body;
        const updatedExperience = await Experience.findByIdAndUpdate(experienceId, { titre, nomEntreprise, description, dateDebut, dateFin ,disponibilite }, { new: true });
        if (!updatedExperience) {
            return res.status(404).json({ error: 'Experience not found' });
        }
        res.json({ message: 'Experience updated successfully', experience: updatedExperience });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating experience' });
    }
};

const deleteExperience = async (req, res) => {
    try {
        const { userId, experienceId } = req.params;
        await User.findByIdAndUpdate(userId, { $pull: { experiences: experienceId } });
        await Experience.findByIdAndDelete(experienceId);
        res.json({ message: 'Experience deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting experience' });
    }
};

const getExperiencesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const Experiences = await Experience.find({ userId: userId });
        res.json(Experiences);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting experiences for user' });
    }
};

module.exports = { addExperienceToUser,deleteExperience,updateExperience,getExperiencesByUser };
