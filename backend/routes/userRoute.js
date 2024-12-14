const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const router = express.Router();
const bcrypt = require('bcryptjs');
const multer = require('multer');
const jwt = require('jsonwebtoken'); 

const  sendConfirmationEmail  = require('../services/mailer');



// Route pour récupérer les informations de l'utilisateur connecté
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour récupérer tous les utilisateurs
router.get('/getAllUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour créer un nouvel utilisateur
router.post('/createUser', async (req, res) => {
  const { pseudo, password, email } = req.body;

  console.log('Tentative de création d\'un utilisateur avec les données :', { pseudo, email });

  try {
    // Vérifier si l'utilisateur existe déjà par pseudo ou email
    let user = await User.findOne({ $or: [{ pseudo }, { email }] });
    if (user) {
      console.log('L\'utilisateur existe déjà.');
      return res.status(400).json({ msg: 'Le pseudo ou l\'email existe déjà' });
    }

    // Créer une nouvelle instance de l'utilisateur
    user = new User({
      pseudo,
      password,
      email
    });

    // Hasher le mot de passe
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // Sauvegarder l'utilisateur
    await user.save();
    console.log('Utilisateur créé avec succès dans la base de données.');

    // Créer un token JWT pour la confirmation
    const token = jwt.sign({ userId: user._id }, process.env.JWT_MAIL_SECRET, {
      expiresIn: process.env.JWT_EXPIRATION,
    });

    // Envoyer l'email de confirmation
    console.log('Tentative d\'envoi d\'email à :', email);
    await sendConfirmationEmail(email, pseudo, token);
    console.log('Email envoyé avec succès à :', email);

    res.json({ msg: 'Utilisateur créé avec succès, veuillez regarder vos mails pour confirmer la création du compte', user });
  } catch (err) {
    console.error('Erreur lors de la création de l\'utilisateur :', err.message);
    res.status(500).send('Erreur serveur');
  }
});


// Route pour mettre à jour un utilisateur
router.put('/updateUser/:id', auth, async (req, res) => {
  const { pseudo, password, email } = req.body;

  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    // Vérifier si l'email est déjà utilisé par un autre utilisateur
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ msg: 'Cet email est déjà utilisé' });
      }
      user.email = email;
    }

    // Mettre à jour le pseudo et/ou le mot de passe si fournis
    if (pseudo) user.pseudo = pseudo;
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    // Sauvegarder les modifications
    await user.save();

    res.json({ msg: 'Utilisateur mis à jour avec succès', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});


// Route pour supprimer un utilisateur
router.delete('/deleteUser/:id', auth, async (req, res) => {
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Utilisateur non trouvé' });
    }

    // Supprimer l'utilisateur
    await User.findByIdAndDelete(req.params.id);

    res.json({ msg: 'Utilisateur supprimé avec succès' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});






module.exports = router;
