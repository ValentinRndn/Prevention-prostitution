const express = require('express');
const Guide = require('../models/Guide');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Configuration de multer pour stocker les fichiers PDF et images
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Vérifiez si le fichier est un PDF ou une image pour le stocker dans le bon dossier
    if (file.mimetype === 'application/pdf') {
      cb(null, 'uploads/guides/pdf/');
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/guides/Images/');
    } else {
      cb(new Error('Invalid file type'), false);
    }
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  }
});

const upload = multer({ storage });

// Route pour récupérer tous les guides
router.get('/getAllGuides', async (req, res) => {
  try {
    const guides = await Guide.find();
    res.json(guides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour récupérer un guide par sa catégorie
router.get('/getFileByCategory/:category', async (req, res) => {
  try {
    const guides = await Guide.find({ category: req.params.category });
    if (!guides) {
      return res.status(404).json({ message: 'Guide non trouvé' });
    }
    res.json(guides);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour ajouter un guide avec un fichier PDF et une image
router.post('/createGuide', upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const pdf = req.files['pdf'] ? req.files['pdf'][0].path : null;
    const image = req.files['image'] ? req.files['image'][0].path : null;

    const guide = new Guide({
      title,
      description,
      category,
      pdf,
      image
    });
    await guide.save();
    res.json(guide);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour modifier un guide avec un fichier PDF et une image
router.put('/updateGuide/:id', upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
  try {
    const { title, description, category } = req.body;
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: 'Guide non trouvé' });
    }

    guide.title = title;
    guide.description = description;
    guide.category = category;

    if (req.files['pdf']) {
      guide.pdf = req.files['pdf'][0].path;
    }

    if (req.files['image']) {
      guide.image = req.files['image'][0].path;
    }

    await guide.save();
    res.json(guide);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour supprimer un guide
router.delete('/deleteGuide/:id', async (req, res) => {
  try {
    const guide = await Guide.findById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: 'Guide non trouvé' });
    }

    // Supprimer le guide de la base de données
    await Guide.findByIdAndDelete(req.params.id);
    res.json({ message: 'Guide supprimé' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;
