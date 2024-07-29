const Contact = require("../models/Contact");

const addContact = async (req, res) => {
    try {
        const { nom, prenom, email, phone, message } = req.body;

        const newContact = new Contact({
            nom,
            prenom,
            email,
            phone,
            message
        });

        const savedContact = await newContact.save();
        res.status(201).json(savedContact);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const getAllContacts = async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

const markAsRead = async (req, res) => {
    try {
        const contactId = req.params.id;
        const updatedContact = await Contact.findByIdAndUpdate(contactId, { read: true }, { new: true });
        res.status(200).json(updatedContact);
    } catch (error) {
        res.status(500).json({ message: 'Erreur serveur', error });
    }
};

module.exports = { addContact, getAllContacts, markAsRead };
