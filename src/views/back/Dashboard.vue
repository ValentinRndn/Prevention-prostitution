<template>
  <div class="dashboard flex bg-back-grey max-md:block">
    <div class="components max-md:contents">
      <HorizontalBar />
      <AdminBar />
    </div>

    <div class="dashboard-container flex-1 p-6 mt-16 max-md:p-4 max-md:mt-14 max-md:w-full">
      <!-- Header avec refresh -->
      <div class="flex justify-between items-center mb-6 max-md:flex-col max-md:gap-4 max-md:items-start">
        <h1 class="text-3xl font-bold text-gray-800 max-md:text-2xl">Tableau de bord Analytics</h1>
        <button
          @click="refreshData"
          :disabled="loading"
          class="flex items-center gap-2 px-4 py-2 bg-purple-fonce text-white rounded-md hover:bg-purple-800 transition-colors disabled:opacity-50 max-md:w-full max-md:justify-center"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5"
            :class="{ 'animate-spin': loading }"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
              clip-rule="evenodd"
            />
          </svg>
          <span>{{ loading ? 'Chargement...' : 'Rafraîchir' }}</span>
        </button>
      </div>

      <!-- Message d'erreur -->
      <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
        <p class="font-bold">Erreur</p>
        <p>{{ error }}</p>
      </div>

      <!-- Cartes statistiques principales -->
      <div class="grid grid-cols-4 gap-6 mb-8 max-lg:grid-cols-2 max-md:grid-cols-1 max-md:gap-4">
        <StatCard
          title="Visiteurs en temps réel"
          :value="realtimeUsers"
          icon="users"
          color="gold"
          subtitle="Actuellement sur le site"
        />
        <StatCard
          title="Visiteurs (30j)"
          :value="stats.totalUsers"
          icon="chart"
          color="gold-dark"
          :subtitle="`${stats.newUsers} nouveaux`"
        />
        <StatCard
          title="Pages vues (30j)"
          :value="stats.pageViews"
          icon="document"
          color="gold"
          :subtitle="`${(stats.pageViews / stats.totalUsers).toFixed(1)} par visite`"
        />
        <StatCard
          title="Durée moyenne"
          :value="formatDuration(stats.avgSessionDuration)"
          icon="clock"
          color="gold-dark"
          :subtitle="`Taux de rebond: ${(stats.bounceRate * 100).toFixed(0)}%`"
        />
      </div>

      <!-- Graphiques -->
      <div class="grid grid-cols-3 gap-6 mb-8 max-lg:grid-cols-1 max-md:gap-4">
        <div class="col-span-2 max-lg:col-span-1">
          <TrafficChart :data="trafficData" />
        </div>
        <div class="col-span-1">
          <TrafficSourcesChart :sources="trafficSources" />
        </div>
      </div>

      <!-- Consentement cookies + Top pages -->
      <div class="grid grid-cols-3 gap-6 mb-8 max-lg:grid-cols-1 max-md:gap-4">
        <!-- Consentement cookies -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Consentement Cookies</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-sm text-gray-600">Acceptés</span>
              <span class="text-lg font-bold text-green-600">{{ cookieStats.granted }}</span>
            </div>
            <div class="w-full bg-gray-200 rounded-full h-2">
              <div
                class="bg-green-500 h-2 rounded-full"
                :style="{ width: `${cookieStats.acceptanceRate}%` }"
              ></div>
            </div>
            <div class="flex justify-between items-center text-xs text-gray-500">
              <span>Refusés: {{ cookieStats.denied }}</span>
              <span>Taux: {{ cookieStats.acceptanceRate }}%</span>
            </div>
          </div>
        </div>

        <!-- Gestion utilisateurs -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Derniers utilisateurs</h3>
          <div class="space-y-3">
            <div v-for="user in lastThreeUsers" :key="user._id" class="flex items-center gap-3 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#fef7ed]">
                <svg class="w-5 h-5 text-[#f1b04c]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                </svg>
              </div>
              <p class="text-gray-800 font-medium">{{ user.pseudo }}</p>
            </div>
            <div v-if="!lastThreeUsers.length" class="text-center text-gray-500 py-8">
              Aucun utilisateur
            </div>
          </div>
          <router-link to="/backoffice/users" class="mt-4 block text-center bg-[#f1b04c] hover:bg-[#d4a159] text-white font-medium py-2 px-4 rounded-md transition-colors">
            Voir tous les utilisateurs
          </router-link>
        </div>

        <!-- Documents -->
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-lg font-bold text-gray-800 mb-4">Derniers documents</h3>
          <div class="space-y-3">
            <div v-for="doc in lastThreeDocuments" :key="doc.id" class="flex items-center gap-3 p-3 rounded-md bg-gray-50 hover:bg-gray-100 transition-colors">
              <div class="flex items-center justify-center w-10 h-10 rounded-full bg-[#fef7ed]">
                <svg class="w-5 h-5 text-[#f1b04c]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                </svg>
              </div>
              <p class="text-gray-800 font-medium">{{ doc.title }}</p>
            </div>
            <div v-if="!lastThreeDocuments.length" class="text-center text-gray-500 py-8">
              Aucun document
            </div>
          </div>
          <router-link to="/backoffice/documentation" class="mt-4 block text-center bg-[#f1b04c] hover:bg-[#d4a159] text-white font-medium py-2 px-4 rounded-md transition-colors">
            Voir tous les documents
          </router-link>
        </div>
      </div>

      <!-- Top pages -->
      <TopPagesTable :pages="topPages" />
    </div>
  </div>
</template>

<script>
import AdminBar from "../../components/backOffice/AdminBar.vue";
import HorizontalBar from "../../components/backOffice/HorizontalBar.vue";
import StatCard from "../../components/dashboard/StatCard.vue";
import TrafficChart from "../../components/dashboard/TrafficChart.vue";
import TrafficSourcesChart from "../../components/dashboard/TrafficSourcesChart.vue";
import TopPagesTable from "../../components/dashboard/TopPagesTable.vue";
import { getAllGuides } from "../../services/GuideService.js";
import { getAllUsers } from "../../services/UsersService.js";
import axios from 'axios';

const apiUrl = import.meta.env.VITE_API_URL;

export default {
  components: {
    AdminBar,
    HorizontalBar,
    StatCard,
    TrafficChart,
    TrafficSourcesChart,
    TopPagesTable,
  },
  data() {
    return {
      loading: false,
      error: null,
      documents: [],
      users: [],
      // Analytics data
      realtimeUsers: 0,
      stats: {
        totalUsers: 0,
        pageViews: 0,
        avgSessionDuration: 0,
        bounceRate: 0,
        newUsers: 0,
      },
      trafficData: [],
      topPages: [],
      trafficSources: [],
      cookieStats: {
        granted: 0,
        denied: 0,
        acceptanceRate: 0,
      },
    };
  },
  computed: {
    lastThreeUsers() {
      return this.users.slice(-3).reverse();
    },
    lastThreeDocuments() {
      return this.documents.slice(-3).reverse();
    },
  },
  methods: {
    formatDuration(seconds) {
      if (!seconds) return '0s';
      const minutes = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return minutes > 0 ? `${minutes}m ${secs}s` : `${secs}s`;
    },

    async loadAnalyticsData() {
      this.loading = true;
      this.error = null;

      try {
        const token = localStorage.getItem('token');
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };

        // Charger toutes les données analytics en parallèle
        const [realtime, overview, trafficOverTime, topPages, sources, cookieConsent] = await Promise.all([
          axios.get(`${apiUrl}/api/analytics/realtime`, config),
          axios.get(`${apiUrl}/api/analytics/overview`, config),
          axios.get(`${apiUrl}/api/analytics/traffic-over-time?days=30`, config),
          axios.get(`${apiUrl}/api/analytics/top-pages`, config),
          axios.get(`${apiUrl}/api/analytics/traffic-sources`, config),
          axios.get(`${apiUrl}/api/analytics/cookie-consent`, config),
        ]);

        this.realtimeUsers = realtime.data.activeUsers;
        this.stats = overview.data;
        this.trafficData = trafficOverTime.data;
        this.topPages = topPages.data;
        this.trafficSources = sources.data;
        this.cookieStats = cookieConsent.data;

      } catch (error) {
        console.error('Erreur lors du chargement des analytics:', error);
        this.error = 'Impossible de charger les données analytics. ' + (error.response?.data?.message || error.message);
      } finally {
        this.loading = false;
      }
    },

    async showAllUsers() {
      try {
        this.users = await getAllUsers();
      } catch (error) {
        console.error('Failed to fetch users:', error);
      }
    },

    async showAllGuides() {
      try {
        this.documents = await getAllGuides();
      } catch (error) {
        console.error('Failed to fetch guides:', error);
      }
    },

    async refreshData() {
      await Promise.all([
        this.loadAnalyticsData(),
        this.showAllUsers(),
        this.showAllGuides(),
      ]);
    },
  },

  async mounted() {
    // Charger les données initiales
    await this.refreshData();

    // Rafraîchir les données temps réel toutes les 30 secondes
    this.realtimeInterval = setInterval(async () => {
      try {
        const token = localStorage.getItem('token');
        const config = { headers: { Authorization: `Bearer ${token}` } };
        const response = await axios.get(`${apiUrl}/api/analytics/realtime`, config);
        this.realtimeUsers = response.data.activeUsers;
      } catch (error) {
        console.error('Erreur rafraîchissement temps réel:', error);
      }
    }, 30000);
  },

  beforeUnmount() {
    if (this.realtimeInterval) {
      clearInterval(this.realtimeInterval);
    }
  },
};
</script>

<style scoped>
.dashboard {
  height: 100vh;
  overflow: hidden;
}

.dashboard-container {
  flex: 1 1 0;
  overflow-y: auto;
}
</style>
