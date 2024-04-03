const Competence = require("../models/Competence");
const User = require("../models/User");

const addSkillToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { nom } = req.body;
        const newSkill = new Competence({ nom ,userId });
        await newSkill.save();
        await User.findByIdAndUpdate(userId, { $push: { skills: newSkill._id } });
        res.status(201).json({ message: 'Skill added to user successfully', skill: newSkill });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding skill to user' });
    }
};

const updateSkill = async (req, res) => {
    try {
        const { userId, competenceId } = req.params;
        const { nom } = req.body;
        const updatedSkill = await Competence.findByIdAndUpdate(competenceId, { nom }, { new: true });
        if (!updatedSkill) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        res.json({ message: 'Skill updated successfully', skill: updatedSkill });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating skill' });
    }
};

const deleteSkill = async (req, res) => {
    try {
        const { userId, competenceId } = req.params;
        await User.findByIdAndUpdate(userId, { $pull: { skills: competenceId } });
        await Competence.findByIdAndDelete(competenceId);
        res.json({ message: 'Skill deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting skill' });
    }
};

const getCompetencesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const Competences = await Competence.find({ userId: userId });
        res.json(Competences);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting competences for user' });
    }
};

const getCompetenceById = async (req, res) => {
    try {
        const competence = await Competence.findById(req.params.id);
        if (!competence) {
            return res.status(404).json({ error: 'Skill not found' });
        }
        res.json(competence);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting skill by ID' });
    }
};



module.exports = { addSkillToUser ,deleteSkill,updateSkill,getCompetencesByUser,getCompetenceById };
