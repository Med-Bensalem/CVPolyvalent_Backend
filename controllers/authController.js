const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Enregistrement d'un nouvel utilisateur
const register = async (req, res) => {
    try {
        const { password, email, nom, prenom, role, secteur } = req.body;
        // Vérifier si l'email existe déjà
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Adresse email existe déjà" });
        }

        // Créer un nouvel utilisateur en fonction du rôle
        let newUser;
        let approuver = role === 'candidat' ? true : false;
        if (role === 'candidat') {
            newUser = new User({ password, email, nom, prenom, role, approuver });
        } else if (role === 'entreprise') {
            newUser = new User({ password, email, nom, role, secteur, approuver });
        } else {
            return res.status(400).json({ message: "Invalid role" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        newUser.password = hashedPassword;
        await newUser.save();
        res.status(201).send("User registered successfully");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error registering user");
    }
};



// Connexion d'un utilisateur existant
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: "Email ou mot de passe invalide" });
        }

        // Vérifie si l'utilisateur est approuvé avant de permettre la connexion
        if (!user.approuver) {
            return res.status(401).json({ message: "Utilisateur pas encore approuvé" });
        }

        const token = jwt.sign({ userId: user._id.toString(), email: user.email,role:user.role }, 'your_secret_key', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error logging in");
    }
};


// Récupération d'un utilisateur par son ID
const getUserById = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching user details" });
    }
};

const getUsersByRole = async (req, res) => {
    try {
        // Récupérer les utilisateurs avec le rôle d'entreprise
        const users = await User.find({ role: 'entreprise' });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users by role" });
    }
};

const getUsersApproved = async (req, res) => {
    try {
        // Récupérer les utilisateurs avec le rôle d'entreprise
        const users = await User.find({ role: 'entreprise', approuver: true });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users Approved" });
    }
};

const getUsersNotApproved = async (req, res) => {
    try {
        // Récupérer les utilisateurs avec le rôle d'entreprise
        const users = await User.find({ role: 'entreprise', approuver: false });

        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching users Not Approved" });
    }
};


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Specify the directory where uploaded files will be stored
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original filename for the uploaded file
    }
});

const upload = multer({ storage: storage });

// Mise à jour des champs spécifiés de l'utilisateur
const completeProfile = async (req, res) => {
    try {
        const { adress, dateOfBirth, dateDispo, gender, phone, contrat,poste } = req.body;
        const { userId } = req.params;

        // Recherche de l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Mise à jour des champs supplémentaires du profil
        user.adress = adress;
        user.dateOfBirth = dateOfBirth;
        user.dateDispo = dateDispo;
        user.gender = gender;
        user.phone = phone;
        user.contrat = contrat;
        user.poste=poste;

        // Si une image a été téléchargée, enregistrez son URL dans le profil de l'utilisateur
        if (req.file) {
            user.image = '/uploads/' + req.file.filename; // Assuming the images are stored in the 'uploads' directory
        }

        // Sauvegarde des modifications dans la base de données
        await user.save();

        res.status(200).json({ message: "Profile updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating profile");
    }
};

const approveUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.approuver = true;

        await user.save();

        res.status(200).json({ message: 'User approved successfully' });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ message: 'Failed to approve user' });
    }
};

const rejectUser = async (req, res) => {
    const userId = req.params.userId;

    try {
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.approuver = false;

        await user.save();

        res.status(200).json({ message: 'User reject successfully' });
    } catch (error) {
        console.error('Error approving user:', error);
        res.status(500).json({ message: 'Failed to reject user' });
    }
};

const updateUserViews = async (req, res) => {
    try {
        const { userId } = req.params;

        // Recherche de l'utilisateur dans la base de données
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Incrémentation du nombre de vues
        user.views += 1;

        // Sauvegarde des modifications dans la base de données
        await user.save();

        res.status(200).json({ message: "User views updated successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating user views");
    }
};

const changePassword = async (req, res) => {
    try {
        const { userId } = req.params;
        const { currentPassword, newPassword } = req.body;

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if the current password matches
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Ce mot de passe est incorrect" });
        }

        // Hash the new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: "Le mot de passe a été changé avec succès." });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error changing password");
    }
};


module.exports = { register, login, completeProfile, getUserById ,upload ,getUsersByRole,approveUser,getUsersApproved,getUsersNotApproved,rejectUser,updateUserViews,changePassword};
