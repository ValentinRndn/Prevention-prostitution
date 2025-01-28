const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Inscription d'un utilisateur
router.post('/register', async (req, res) => {
  console.log("Received POST request to /register");
  const { pseudo, email, password } = req.body;

  try {
    // Vérification si l'utilisateur existe déjà
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Création d'un nouvel utilisateur
    user = new User({
      pseudo,
      email,
      password
    });

    // Hash du mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Sauvegarde de l'utilisateur dans la base de données
    await user.save();

    // Génération du token JWT
    const payload = {
      user: {
        id: user.id,
        pseudo: user.pseudo,
        email: user.email
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Route POST pour la connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Vérifier si l'utilisateur existe dans la base de données
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
        // Vérifiez si le compte est confirmé
        if (!user.isConfirmed) {
          return res.status(403).json({ msg: 'Veuillez confirmer votre compte avant de vous connecter.' });
        }

    // Vérifier si le mot de passe correspond
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Si les identifiants sont corrects, générer un token JWT
    const payload = {
      user: {
        id: user.id,
        email: user.email,
        pseudo: user.pseudo
      }
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Retourner le token JWT au client
    res.json({ token });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


router.get('/confirm/:token', async (req, res) => {
  const { token } = req.params;

  try {
    // Vérifier le token JWT
    const decoded = jwt.verify(token, process.env.JWT_MAIL_SECRET);
    const userId = decoded.userId;

    // Chercher l'utilisateur dans la base de données
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    // Vérifier si l'utilisateur est déjà confirmé
    if (user.isConfirmed) {
      return res.status(400).json({ msg: 'Utilisateur déjà confirmé' });
    }

    // Mettre à jour l'utilisateur comme confirmé
    user.isConfirmed = true;
    await user.save();

    res.status(200).json({ msg: 'Compte confirmé avec succès. Vous pouvez maintenant vous connecter.' });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: 'Token invalide ou expiré' });
  }
});


module.exports = router;
