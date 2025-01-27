<template>
  <div class="dashboard flex bg-back-grey">

    <div class="components">

      <!-- Intégration de la barre latérale -->
      <HorizontalBar />
      <AdminBar />

    </div>


    <div class="dashboard-container p-6 xl:p-8 mt-16 ">
      <!-- Stats générales -->
      <div class="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-1 gap-4 xl:gap-6 mb-6 ">
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
      <div class="grid grid-cols-4 lg:grid-cols-3 gap-4 xl:gap-6">
        <!-- Gestion utilisateurs -->
        <div class="dashboard-card bg-white p-4 rounded-md">
          <h3 class="card-title border-b border-b-solid border-light-grey pb-4">Gestion des utilisateurs</h3>
          
          <div class="space-y-4 my-4">
            <div v-for="user in lastThreeUsers" :key="user._id" class="user-item">
              <p class="text-gray-700">{{ user.pseudo }}</p>
            </div>
            <div v-if="!lastThreeUsers.length" class="text-center text-gray-500 py-4">
              Aucun utilisateur
            </div>
          </div>

          <router-link to="/backoffice/users" class="dashboard-button bg-purple-fonce p-2 text-white rounded-md">
            En voir plus
          </router-link>
        </div>

        <!-- Documents -->
        <div class="dashboard-card bg-white p-4 rounded-md">
          <h3 class="card-title border-b border-b-solid border-light-grey pb-4">Mes derniers documents</h3>
          
          <div class="space-y-4 my-4">
            <div v-for="doc in lastThreeDocuments" :key="doc.id" class="doc-item">
              <p class="text-gray-700">{{ doc.title }}</p>
            </div>
            <div v-if="!lastThreeDocuments.length" class="text-center text-gray-500 py-4">
              Aucun document
            </div>
          </div>

          <router-link to="/backoffice/documentation" class="dashboard-button bg-purple-fonce p-2 text-white rounded-md ">
            En voir plus
          </router-link>
        </div>

        <!-- SEO -->
        <div class="dashboard-card bg-white p-4 rounded-md">
          <h3 class="card-title border-b border-b-solid border-light-grey pb-4">SEO</h3>
          <div class="text-center text-gray-500 py-8">
            Intégration Matomo à venir
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// Importation du composant SideBar
import AdminBar from "../../components/backOffice/AdminBar.vue";
import HorizontalBar from "../../components/backOffice/HorizontalBar.vue";
import { getAllGuides} from "../../services/GuideService.js";
import { showAllBlogs} from "../../services/BlogsService.js";
import  { getAllUsers } from "../../services/UsersService.js";



export default {
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
    lastThreeArticles() {
      return this.articles.slice(-3).reverse();
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
        console.error('Failed to fecth users:', error);
      }
    },
    async showAllGuides() {
      try {
        this.documents = await getAllGuides();
        console.log(this.documents);
      } catch (error) {
      }
    }
  },

  async mounted() {
    this.getAllBlogs();
    this.showAllUsers();
    this.showAllGuides();
  }
};
</script>

<style>
.dashboard {
  height: 100vh;
}

.dashboard-container {
    flex: 1 1 0;
    padding: 2rem;
}

@media(max-width: 768px) {
    .dashboard-container {
        padding-left: 6rem;
    }
}
</style>
