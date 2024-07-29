const User = require("../models/User");
const Interest = require("../models/Interest");

const addInterestToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { nom } = req.body;
        const newInterest = new Interest({ nom ,userId });
        await newInterest.save();
        await User.findByIdAndUpdate(userId, { $push: { interests: newInterest._id } });
        res.status(201).json({ message: 'Interest added to user successfully', Interest: newInterest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding Interest to user' });
    }
};

const updateInterest = async (req, res) => {
    try {
        const { userId, InterestId } = req.params;
        const { nom } = req.body;
        const updatedInterest = await Interest.findByIdAndUpdate(InterestId, { nom }, { new: true });
        if (!updatedInterest) {
            return res.status(404).json({ error: 'Interest not found' });
        }
        res.json({ message: 'Interest updated successfully', Interest: updatedInterest });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating Interest' });
    }
};

const deleteInterest = async (req, res) => {
    try {
        const { userId, interestId } = req.params;
        await User.findByIdAndUpdate(userId, { $pull: { interests: interestId } });
        await Interest.findByIdAndDelete(interestId);
        res.json({ message: 'Interest deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting Interest' });
    }
};

const getInterestsByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const Interests = await Interest.find({ userId: userId });
        res.json(Interests);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting Interests for user' });
    }
};

const getInterestById = async (req, res) => {
    try {
        const Interest = await Interest.findById(req.params.id);
        if (!Interest) {
            return res.status(404).json({ error: 'Interest not found' });
        }
        res.json(Interest);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting Interest by ID' });
    }
};



module.exports = { addInterestToUser ,deleteInterest,updateInterest,getInterestsByUser,getInterestById };
