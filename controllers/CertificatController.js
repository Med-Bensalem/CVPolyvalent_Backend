const Certificate = require("../models/Certificat");
const User = require("../models/User");

const addCertificationToUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const { certificat, reference, dateEmission, dateExpiration } = req.body;
        const newCertification = new Certificate({ certificat, reference, dateEmission, dateExpiration ,userId });
        await newCertification.save();
        await User.findByIdAndUpdate(userId, { $push: { certifications: newCertification._id } });
        res.status(201).json({ message: 'Certification added to user successfully', certification: newCertification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error adding certification to user' });
    }
};

const getCertificatesByUser = async (req, res) => {
    try {
        const userId = req.params.userId;
        const Certificates = await Certificate.find({ userId: userId });
        res.json(Certificates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error getting certificats of user' });
    }
};

const updateCertification = async (req, res) => {
    try {
        const userId = req.params.userId;
        const certificateId = req.params.certificateId;
        const { certificat, reference, dateEmission, dateExpiration  } = req.body;
        const updatedCertification = await Certificate.findByIdAndUpdate(certificateId, { certificat, reference, dateEmission, dateExpiration }, { new: true });
        if (!updatedCertification) {
            return res.status(404).json({ error: 'Certification not found' });
        }
        res.json({ message: 'Certification updated successfully', certification: updatedCertification });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error updating certification' });
    }
};

const deleteCertification = async (req, res) => {
    try {
        const certificateId = req.params.certificateId;
        await Certificate.findByIdAndDelete(certificateId);
        res.json({ message: 'Certification deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error deleting certification' });
    }
};

module.exports = { addCertificationToUser,updateCertification,deleteCertification,getCertificatesByUser };

