const express = require('express');
const Guide = require('../models/Guide');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

// Configuration de multer pour stocker les fichiers PDF et images avec validation
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Vérifiez si le fichier est un PDF ou une image pour le stocker dans le bon dossier
    if (file.mimetype === 'application/pdf') {
      cb(null, 'uploads/guides/pdf/');
    } else if (file.mimetype.startsWith('image/')) {
      cb(null, 'uploads/guides/images/');
    } else {
      cb(new Error('Type de fichier non autorisé'), false);
    }
  },
  filename: (req, file, cb) => {
    // Nettoyer le nom de fichier pour éviter les problèmes de sécurité
    const sanitizedFilename = file.originalname.replace(/[^a-zA-Z0-9.-]/g, '_');
    cb(null, `${Date.now()}_${sanitizedFilename}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // Limite de 10MB (plus grande pour les PDFs)
  },
  fileFilter: (req, file, cb) => {
    const allowedMimeTypes = [
      'application/pdf',
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/gif',
      'image/webp'
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Type de fichier non autorisé. Seuls les PDF et images (JPEG, PNG, GIF, WebP) sont acceptés.'));
    }
  }
});

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

// Route pour ajouter un guide avec un fichier PDF et une image (protégée par authentification)
router.post('/createGuide', auth, upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
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
router.put('/updateGuide/:id', auth, upload.fields([{ name: 'pdf', maxCount: 1 }, { name: 'image', maxCount: 1 }]), async (req, res) => {
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

// Route pour supprimer un guide (protégée par authentification)
router.delete('/deleteGuide/:id', auth, async (req, res) => {
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
