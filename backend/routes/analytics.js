const express = require('express');
const router = express.Router();
const analyticsService = require('../services/analyticsService');
const auth = require('../middleware/auth');

// Protection : toutes les routes nécessitent une authentification admin
router.use(auth);

/**
 * GET /api/analytics/realtime
 * Récupère le nombre d'utilisateurs actifs en temps réel
 */
router.get('/realtime', async (req, res) => {
  try {
    const data = await analyticsService.getRealTimeUsers();
    res.json(data);
  } catch (error) {
    console.error('Error fetching realtime users:', error);
    res.status(500).json({
      error: 'Failed to fetch realtime analytics',
      message: error.message
    });
  }
});

/**
 * GET /api/analytics/overview
 * Récupère les statistiques générales (30 derniers jours)
 */
router.get('/overview', async (req, res) => {
  try {
    const data = await analyticsService.getOverviewStats();
    res.json(data);
  } catch (error) {
    console.error('Error fetching overview stats:', error);
    res.status(500).json({
      error: 'Failed to fetch overview statistics',
      message: error.message
    });
  }
});

/**
 * GET /api/analytics/traffic-over-time
 * Récupère les données de trafic jour par jour
 * Query params: days (default: 30)
 */
router.get('/traffic-over-time', async (req, res) => {
  try {
    const days = parseInt(req.query.days) || 30;
    const data = await analyticsService.getTrafficOverTime(days);
    res.json(data);
  } catch (error) {
    console.error('Error fetching traffic over time:', error);
    res.status(500).json({
      error: 'Failed to fetch traffic data',
      message: error.message
    });
  }
});

/**
 * GET /api/analytics/top-pages
 * Récupère les 10 pages les plus visitées
 */
router.get('/top-pages', async (req, res) => {
  try {
    const data = await analyticsService.getTopPages();
    res.json(data);
  } catch (error) {
    console.error('Error fetching top pages:', error);
    res.status(500).json({
      error: 'Failed to fetch top pages',
      message: error.message
    });
  }
});

/**
 * GET /api/analytics/traffic-sources
 * Récupère les sources de trafic
 */
router.get('/traffic-sources', async (req, res) => {
  try {
    const data = await analyticsService.getTrafficSources();
    res.json(data);
  } catch (error) {
    console.error('Error fetching traffic sources:', error);
    res.status(500).json({
      error: 'Failed to fetch traffic sources',
      message: error.message
    });
  }
});

/**
 * GET /api/analytics/cookie-consent
 * Récupère les statistiques sur le consentement des cookies
 */
router.get('/cookie-consent', async (req, res) => {
  try {
    const data = await analyticsService.getCookieConsentStats();
    res.json(data);
  } catch (error) {
    console.error('Error fetching cookie consent stats:', error);
    res.status(500).json({
      error: 'Failed to fetch cookie consent statistics',
      message: error.message
    });
  }
});

module.exports = router;
