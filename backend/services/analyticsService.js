// Service pour récupérer les données Google Analytics 4
const { BetaAnalyticsDataClient } = require('@google-analytics/data');

class AnalyticsService {
  constructor() {
    this.useMockData = !process.env.GA4_PROPERTY_ID; // Utilise mock si pas de config

    // Initialiser le client GA4 si les credentials sont configurés
    if (!this.useMockData) {
      this.analyticsDataClient = new BetaAnalyticsDataClient({
        keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
      });
      console.log('✅ Google Analytics 4 API initialisée');
    } else {
      console.log('⚠️  Mode MOCK activé - GA4_PROPERTY_ID non configuré');
    }
  }

  /**
   * Récupère le nombre d'utilisateurs actifs en temps réel
   */
  async getRealTimeUsers() {
    if (this.useMockData) {
      // Données mock pour test
      return {
        activeUsers: Math.floor(Math.random() * 10) + 1
      };
    }

    const [response] = await this.analyticsDataClient.runRealtimeReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      metrics: [{ name: 'activeUsers' }],
    });

    return {
      activeUsers: parseInt(response.rows?.[0]?.metricValues?.[0]?.value || 0)
    };
  }

  /**
   * Récupère les statistiques générales (30 derniers jours)
   */
  async getOverviewStats() {
    if (this.useMockData) {
      // Données mock pour test
      return {
        totalUsers: 1245,
        pageViews: 3780,
        avgSessionDuration: 165, // en secondes
        bounceRate: 0.48,
        sessionsPerUser: 1.8,
        newUsers: 890,
      };
    }

    const [response] = await this.analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
        { name: 'averageSessionDuration' },
        { name: 'bounceRate' },
        { name: 'sessionsPerUser' },
        { name: 'newUsers' },
      ],
    });

    const row = response.rows?.[0];
    return {
      totalUsers: parseInt(row?.metricValues?.[0]?.value || 0),
      pageViews: parseInt(row?.metricValues?.[1]?.value || 0),
      avgSessionDuration: parseInt(row?.metricValues?.[2]?.value || 0),
      bounceRate: parseFloat(row?.metricValues?.[3]?.value || 0),
      sessionsPerUser: parseFloat(row?.metricValues?.[4]?.value || 0),
      newUsers: parseInt(row?.metricValues?.[5]?.value || 0),
    };
  }

  /**
   * Récupère les données de trafic jour par jour (pour graphique)
   */
  async getTrafficOverTime(days = 30) {
    if (this.useMockData) {
      // Générer des données mock pour les N derniers jours
      const data = [];
      const today = new Date();

      for (let i = days - 1; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        data.push({
          date: dateStr,
          users: Math.floor(Math.random() * 100) + 20,
          pageViews: Math.floor(Math.random() * 300) + 50,
        });
      }

      return data;
    }

    const [response] = await this.analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: `${days}daysAgo`, endDate: 'today' }],
      dimensions: [{ name: 'date' }],
      metrics: [
        { name: 'activeUsers' },
        { name: 'screenPageViews' },
      ],
      orderBys: [{ dimension: { dimensionName: 'date' } }],
    });

    return response.rows?.map(row => {
      const dateStr = row.dimensionValues[0].value; // Format: YYYYMMDD
      // Convertir YYYYMMDD en YYYY-MM-DD
      const formattedDate = `${dateStr.substring(0, 4)}-${dateStr.substring(4, 6)}-${dateStr.substring(6, 8)}`;
      return {
        date: formattedDate,
        users: parseInt(row.metricValues[0].value),
        pageViews: parseInt(row.metricValues[1].value),
      };
    }) || [];
  }

  /**
   * Récupère les top 10 pages visitées
   */
  async getTopPages() {
    if (this.useMockData) {
      return [
        { path: '/', views: 1200, title: 'Accueil' },
        { path: '/guides/particuliers', views: 450, title: 'Guides Particuliers' },
        { path: '/carte', views: 380, title: 'Carte interactive' },
        { path: '/guides/professionnels', views: 320, title: 'Guides Professionnels' },
        { path: '/contact', views: 210, title: 'Contact' },
        { path: '/guide', views: 180, title: 'Guides' },
        { path: '/propos', views: 150, title: 'À propos' },
        { path: '/legalNotices', views: 95, title: 'Mentions légales' },
        { path: '/cartographie/particulier', views: 85, title: 'Carto Particuliers' },
        { path: '/cartographie/professionnel', views: 70, title: 'Carto Professionnels' },
      ];
    }

    const [response] = await this.analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [
        { name: 'pagePath' },
        { name: 'pageTitle' },
      ],
      metrics: [{ name: 'screenPageViews' }],
      orderBys: [{ metric: { metricName: 'screenPageViews' }, desc: true }],
      limit: 10,
    });

    return response.rows?.map(row => ({
      path: row.dimensionValues[0].value,
      title: row.dimensionValues[1].value,
      views: parseInt(row.metricValues[0].value),
    })) || [];
  }

  /**
   * Récupère les sources de trafic
   */
  async getTrafficSources() {
    if (this.useMockData) {
      return [
        { source: 'google', users: 810, percentage: 65 },
        { source: 'direct', users: 310, percentage: 25 },
        { source: 'social', users: 125, percentage: 10 },
      ];
    }

    const [response] = await this.analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'sessionSource' }],
      metrics: [{ name: 'activeUsers' }],
      orderBys: [{ metric: { metricName: 'activeUsers' }, desc: true }],
    });

    const total = response.rows?.reduce((sum, row) => sum + parseInt(row.metricValues[0].value), 0) || 1;

    return response.rows?.map(row => {
      const users = parseInt(row.metricValues[0].value);
      let sourceName = row.dimensionValues[0].value;

      // Remplacer "(not set)" par "Direct"
      if (sourceName === '(not set)' || sourceName === '(direct)') {
        sourceName = 'direct';
      }

      return {
        source: sourceName,
        users: users,
        percentage: Math.round((users / total) * 100),
      };
    }) || [];
  }

  /**
   * Récupère les statistiques sur le consentement des cookies
   */
  async getCookieConsentStats() {
    if (this.useMockData) {
      return {
        granted: 850,
        denied: 275,
        customized: 120,
        totalEvents: 1245,
        acceptanceRate: 68,
      };
    }

    const [response] = await this.analyticsDataClient.runReport({
      property: `properties/${process.env.GA4_PROPERTY_ID}`,
      dateRanges: [{ startDate: '30daysAgo', endDate: 'today' }],
      dimensions: [{ name: 'eventName' }],
      metrics: [{ name: 'eventCount' }],
      dimensionFilter: {
        filter: {
          fieldName: 'eventName',
          stringFilter: {
            matchType: 'CONTAINS',
            value: 'cookie_consent',
          },
        },
      },
    });

    let granted = 0, denied = 0;
    response.rows?.forEach(row => {
      const eventName = row.dimensionValues[0].value;
      const count = parseInt(row.metricValues[0].value);

      if (eventName.includes('granted')) granted = count;
      if (eventName.includes('denied')) denied = count;
    });

    const total = granted + denied;
    return {
      granted,
      denied,
      customized: 0, // À calculer si vous trackez les personnalisations
      totalEvents: total,
      acceptanceRate: total > 0 ? Math.round((granted / total) * 100) : 0,
    };
  }
}

module.exports = new AnalyticsService();
