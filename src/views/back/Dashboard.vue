<template>
  <div class="dashboard flex bg-back-grey">

    <div class="components">

      <!-- Intégration de la barre latérale -->
      <HorizontalBar />
      <AdminBar />

    </div>


    <!-- Contenu du tableau de bord -->
    <div class="dashboard-container flex flex-wrap gap-12 overflow-auto">
      
      <!-- Tableau users -->
      <div class="posts-keys flex flex-col gap-5 w-[25%] h-[350px] bg-white p-4 mt-10 rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6">
            <h3 class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2 text-center">Gestion des utilisateurs</h3>
            <div v-for="user in lastThreeUsers" :key="user._id" class="post-field flex w-full justify-between items-center border-b border-b-solid border-light-grey pb-5 md:flex-col">
              <div class="user flex gap-2 justify-center items-center">
                <!-- <img src="../../assets/back/users/user.png" class="w-[25px]" alt="user-icon"> -->
                <p>{{user.pseudo}}</p>
              </div>
              <div class="edit-post flex gap-4 font-poppins">
              </div>
            </div>
            <router-link to="/backoffice/users" class="edit-button bg-purple text-white py-2 px-2 w-1/3 mx-auto rounded-md shadow-xl font-poppins font-bold text-center hover:scale-105 duration-200">En voir plus</router-link>
          </div>


          <!-- tableau documents-->
          <div class="posts-keys flex flex-col gap-5 w-[25%] h-[350px] bg-white p-4 mt-10 rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6">
            <h3 class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2 text-center">Mes derniers documents</h3>
            <div v-for="(doc) in lastThreeDocuments" :key="doc.id" class="post-field flex w-full justify-between border-b border-b-solid border-light-grey pb-5 md:flex-col md:items-center">
              <p>{{ doc.title }}</p>
              <div class="edit-post flex gap-4 font-poppins">
              </div>
            </div>
            <router-link to="/backoffice/documentation" class="edit-button bg-purple text-white py-2 px-2 w-1/3 mx-auto rounded-md shadow-xl font-poppins font-bold text-center hover:scale-105 duration-200">En voir plus</router-link>
          </div>

          <!-- tableau articles-->
        <div class="posts-keys flex flex-col gap-5 w-[25%] h-[350px] bg-white p-4 mt-10 rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6">
          <h3 class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2 text-center">Mes derniers articles</h3>
          <div v-for="(article) in lastThreeArticles" :key="article._id" class="post-field flex w-full justify-between border-b border-b-solid border-light-grey pb-5 md:flex-col md:items-center">
            <p>{{ article.title }}</p>
          <div class="edit-post flex gap-4 font-poppins">
        </div>
      </div>
        <router-link to="/backoffice/blog" class="edit-button bg-purple text-white py-2 px-2 w-1/3 mx-auto rounded-md shadow-xl font-poppins font-bold text-center hover:scale-105 duration-200">En voir plus</router-link>
      </div>

          <!-- tableau SEO-->
          <div class="posts-keys flex flex-col gap-5 w-[25%] h-[350px] bg-white p-4 mt-10 rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6">
            <h3 class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2 text-center">SEO</h3>
            <div class="post-field flex w-full justify-between border-b border-b-solid border-light-grey pb-5 md:flex-col md:items-center">
            <div class="edit-post flex gap-4 font-poppins">
          </div>
        </div>
          <!-- <router-link to="/backoffice/blog" class="edit-button bg-purple text-white py-2 px-2 w-1/3 mx-auto rounded-md shadow-xl font-poppins font-bold text-center hover:scale-105 duration-200">Modifier</router-link> -->
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
