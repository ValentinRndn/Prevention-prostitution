<template>
  <div class="dashboard min-h-screen bg-gray-50">
    <div class="components">
      <HorizontalBar />
      <AdminBar />
    </div>

    <div class="dashboard-container p-6 xl:p-8">
      <!-- Stats générales -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-6 mb-6">
        <!-- Stats visiteurs -->
        <div class="stat-card">
          <h4 class="text-sm text-gray-600 mb-2">Visiteurs du mois</h4>
          <p class="text-2xl font-bold text-gray-800">--</p>
          <p class="text-sm text-gray-500 mt-2">En attente de Matomo</p>
        </div>

        <!-- Stats pages vues -->
        <div class="stat-card">
          <h4 class="text-sm text-gray-600 mb-2">Pages vues</h4>
          <p class="text-2xl font-bold text-gray-800">--</p>
          <p class="text-sm text-gray-500 mt-2">En attente de Matomo</p>
        </div>

        <!-- Autres stats... -->
      </div>

      <!-- Conteneurs principaux -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4 xl:gap-6">
        <!-- Gestion utilisateurs -->
        <div class="dashboard-card">
          <h3 class="card-title">Gestion des utilisateurs</h3>
          
          <div class="space-y-4 my-4">
            <div v-for="user in lastThreeUsers" :key="user._id" class="user-item">
              <p class="text-gray-700">{{ user.pseudo }}</p>
            </div>
            <div v-if="!lastThreeUsers.length" class="text-center text-gray-500 py-4">
              Aucun utilisateur
            </div>
          </div>

          <router-link to="/backoffice/users" class="dashboard-button">
            En voir plus
          </router-link>
        </div>

        <!-- Documents -->
        <div class="dashboard-card">
          <h3 class="card-title">Mes derniers documents</h3>
          
          <div class="space-y-4 my-4">
            <div v-for="doc in lastThreeDocuments" :key="doc.id" class="doc-item">
              <p class="text-gray-700">{{ doc.title }}</p>
            </div>
            <div v-if="!lastThreeDocuments.length" class="text-center text-gray-500 py-4">
              Aucun document
            </div>
          </div>

          <router-link to="/backoffice/documentation" class="dashboard-button">
            En voir plus
          </router-link>
        </div>

        <!-- SEO -->
        <div class="dashboard-card">
          <h3 class="card-title">SEO</h3>
          <div class="text-center text-gray-500 py-8">
            Intégration Matomo à venir
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import AdminBar from "../../components/backOffice/AdminBar.vue";
import HorizontalBar from "../../components/backOffice/HorizontalBar.vue";
import { getAllGuides } from "../../services/GuideService.js";
import { showAllBlogs } from "../../services/BlogsService.js";
import { getAllUsers } from "../../services/UsersService.js";

export default {
  name: 'Dashboard',
  components: {
    AdminBar,
    HorizontalBar
  },
  data() {
    return {
      documents: [],
      articles: [],
      users: [],
    }
  },
  computed: {
    lastThreeUsers() {
      return this.users.slice(-3).reverse();
    },
    lastThreeDocuments() {
      return this.documents.slice(-3).reverse();
    }
  },
  methods: {
    async getAllBlogs() {
      try {
        this.articles = await showAllBlogs();
      } catch (error) {
        console.error('Failed to fetch articles:', error);
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
    }
  },
  mounted() {
    this.getAllBlogs();
    this.showAllUsers();
    this.showAllGuides();
  }
};
</script>

<style scoped>
.dashboard {
  min-height: 100vh;
  background-color: #f9fafb;
}

.dashboard-container {
  margin-left: 250px; /* Ajustez selon la largeur de votre AdminBar */
}


/* Responsive styles */
@media (max-width: 1023px) {
  .dashboard-container {
    margin-left: 0;
    padding-top: 2rem;
  }
}

@media (max-width: 767px) {
  .dashboard-container {
    padding-left: 4rem;
  }
  
  .stat-card {
    @apply p-4;
  }
}
</style>