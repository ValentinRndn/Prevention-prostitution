const express = require('express');
const Structure = require('../models/Structure');
const router = express.Router();

// Route pour récupérer toutes les structures
router.get('/getAllStructures', async (req, res) => {
  try {
    const structures = await Structure.find();
    res.json(structures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

// Route pour récupérer les structures par catégorie
router.get('/:categorie', async (req, res) => {
  try {
    const structures = await Structure.find({ 
      categories: req.params.categorie 
    });
    if (!structures) {
      return res.status(404).json({ message: 'Structure non trouvée' });
    }
    res.json(structures);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

//Route pour ajouter une structure
router.post('/createStructure', async (req, res) => {
  try {
    const { antenna, address, gps, department, phone, email, categories } = req.body;
    
    // Vérification que categories est un tableau non vide
    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ message: 'Les catégories sont requises et doivent être un tableau non vide' });
    }

    const newStructure = new Structure({
      antenna,
      address,
      gps,
      department,
      phone,
      email,
      categories
    });

    const structure = await newStructure.save();
    res.json(structure);
  } catch (err) {
    console.error('Erreur lors de la création de la structure:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).send('Erreur serveur');
  }
});

// Route pour modifier une structure
router.put('/updateStructure/:id', async (req, res) => {
  try {
    const { antenna, address, gps, department, phone, email, categories } = req.body;

    // Vérification que categories est un tableau non vide
    if (!Array.isArray(categories) || categories.length === 0) {
      return res.status(400).json({ message: 'Les catégories sont requises et doivent être un tableau non vide' });
    }

    const structure = await Structure.findById(req.params.id);
    if (!structure) {
      return res.status(404).json({ message: 'Structure non trouvée' });
    }

    structure.antenna = antenna;
    structure.address = address;
    structure.gps = gps;
    structure.department = department;
    structure.phone = phone;
    structure.email = email;
    structure.categories = categories; 

    const updatedStructure = await structure.save();
    res.json(updatedStructure);
  } catch (err) {
    console.error('Erreur lors de la mise à jour de la structure:', err);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).send('Erreur serveur');
  }
});

// Route pour supprimer une structure
router.delete('/deleteStructure/:id', async (req, res) => {
  try {
    const structure = await Structure.findById(req.params.id);
    if (!structure) {
      return res.status(404).json({ message: 'Structure non trouvée' });
    }

    await Structure.findByIdAndDelete(req.params.id);
    res.json({ message: 'Structure supprimée avec succès' });
  } catch (err) {
    console.error('Erreur lors de la suppression de la structure:', err);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;