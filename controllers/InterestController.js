const User = require("../models/User");
const Interet = require("../models/Interet");

const addInteretToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { nom } = req.body;
        const newInteret = new Interet({ nom ,userId });
        await newInteret.save();
        await User.findByIdAndUpdate(userId, { $push: { interets: newInteret._id } });
        res.status(201).json({ message: 'Interet added to user successfully', Interet: newInteret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding Interet to user' });
    }
};

const updateInteret = async (req, res) => {
    try {
        const { userId, InteretId } = req.params;
        const { nom } = req.body;
        const updatedInteret = await Interet.findByIdAndUpdate(InteretId, { nom }, { new: true });
        if (!updatedInteret) {
            return res.status(404).json({ error: 'Interet not found' });
        }
        res.json({ message: 'Interet updated successfully', Interet: updatedInteret });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating Interet' });
    }
};

const deleteInteret = async (req, res) => {
    try {
        const { userId, InteretId } = req.params;
        await User.findByIdAndUpdate(userId, { $pull: { Interets: InteretId } });
        await Interet.findByIdAndDelete(InteretId);
        res.json({ message: 'Interet deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting Interet' });
    }
};

const getInteretsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const Interets = await Interet.find({ userId: userId });
        res.json(Interets);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting Interets for user' });
    }
};

const getInteretById = async (req, res) => {
    try {
        const Interet = await Interet.findById(req.params.id);
        if (!Interet) {
            return res.status(404).json({ error: 'Interet not found' });
        }
        res.json(Interet);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting Interet by ID' });
    }
};



module.exports = { addInteretToUser ,deleteInteret,updateInteret,getInteretsByUser,getInteretById };
