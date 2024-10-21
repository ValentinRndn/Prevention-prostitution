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

// Route pour récupérer une structure par sa catégorie
router.get('/:categorie', async (req, res) => {
  try {
    const structures = await Structure.find({ categorie: req.params.categorie });
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
  const { antenna, address, gps, department, phone, email, category } = req.body;
  try {
    const newStructure = new Structure({
      antenna,
      address,
      gps,
      department,
      phone,
      email,
      category
    });

    const structure = await newStructure.save();
    res.json(structure);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});

module.exports = router;