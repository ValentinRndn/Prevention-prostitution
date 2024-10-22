const express = require('express');
const Statistics = require('../models/Statistic');

const router = express.Router();


// Route pour récupérer les statistiques
router.get('/getStats', async (req, res) => {
  try {
    // Trouver le document unique pour les statistiques
    let statistics = await Statistics.findOne();

    if (!statistics) {
      // Si aucun document n'existe, créez-en un nouveau
      statistics = new Statistics({});
      await statistics.save();
    }

    res.json(statistics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});
// Route pour mettre à jour les statistiques
router.put('/updateStats', async (req, res) => {
  try {
    const { firstStats, secondStats, thirdStats, lastUpdate } = req.body;

    // Trouver le document unique pour les statistiques
    let statistics = await Statistics.findOne();

    if (!statistics) {
      // Si aucun document n'existe, créez-en un nouveau
      statistics = new Statistics({});
    }

    // Mettez à jour les valeurs
    statistics.firstStats = firstStats;
    statistics.secondStats = secondStats;
    statistics.thirdStats = thirdStats;
    statistics.lastUpdate = lastUpdate;

    // Sauvegardez les modifications
    await statistics.save();

    res.json({ msg: 'Statistiques mises à jour avec succès', statistics });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});


//Route pour créer de statistiques
router.post('/createStats', async (req, res) => {
  try {
    const { firstStats, secondStats, thirdStats, lastUpdate } = req.body;

    // Créer une nouvelle instance de statistiques
    const statistics = new Statistics({
      firstStats,
      secondStats,
      thirdStats,
      lastUpdate
    });

    // Sauvegarder les statistiques
    await statistics.save();

    res.json({ msg: 'Statistiques créées avec succès', statistics });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
});
module.exports = router;
