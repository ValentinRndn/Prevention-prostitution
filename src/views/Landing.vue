<template>
  <div class="bg-landing relative w-full h-screen bg-center z-10 mb-24 rounded-bl-[25%] bg-cover bg-no-repeat md:h-[50vh] md:mb-0 overflow-hidden">
    <aside class="flex items-center justify-center gap-5 mb-8 sm:hidden">
      <img src="../assets/logo_typo_blanc.png" alt="logo" class="size-1/4 mt-8" />
      <ul class="navbar flex gap-10 text-xl mt-10 font-cgothic font-bold text-white">
        <li class="menu underline">
          <router-link to="/">ACCUEIL</router-link>
        </li>
        <li class="menu">
          <router-link to="/map">CARTOGRAPHIE</router-link>
        </li>
        <li class="menu">
          <router-link to="/guide">GUIDE</router-link>
        </li>
        <li class="menu">
          <router-link to="/blog">BLOG</router-link>
        </li>
        <li class="menu">
          <router-link to="/contact">CONTACT</router-link>
        </li>
        <li v-if="isUserLoggedIn" class="relative">
          <button @click="toggleDropdown" class="menu">
            <img src="../assets/profile.png" alt="profil" class="size-6 object-cover object-center z-70">
          </button>
          <ul v-if="dropdownVisible" class="dropdown-menu absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
            <li class="menu-item p-2 hover:bg-gray-100">
              <router-link to="/backoffice/dashboard">Aller au back office</router-link>
            </li>
            <li class="menu-item p-2 hover:bg-gray-100 cursor-pointer" @click="logout">Se déconnecter</li>
          </ul>
        </li>
      </ul>
    </aside>
    <div class="header-content h-screen">
      <div class="text-header text-white text-xl font-bold flex flex-col items-center justify-center h-[50vh] md:w-full md:text-sm">
        <div class="citation-header w-[28vw] text-center md:w-1/2">
          <h1 class="citation bg-purple p-6 w-full -ml-[7.5vw]">
            INSERER UNE CITATION
          </h1>
        </div>
        <div class="sentance-header w-[28vw] text-center md:w-1/2">
          <h1 class="citation bg-purple-fonce p-6 w-full ml-[7.5vw]">
            CHOISIR ENSEMBLE MERCREDI
          </h1>
        </div>
      </div>
      <div class="agrasc-image">
        <img src="../assets/welcome/logo_agrasc.jpg" alt="logo_agrasc" class="w-[200px] object-cover absolute bottom-0 right-20 md:w-[100px] md:right-5" />
      </div>
    </div>
  </div>

  <!-- Missions et photo stop  -->
  <div class="container-presentation flex flex-wrap justify-center items-center w-full gap-8 md:text-center">
    <div class="presentation max-w-[600px]">
      <h1 class="text-2xl text-black mx-10 mt-10 mb-4 font-bold font-cgothic">
        CETTE PLATEFORME VOUS PERMET DE :
      </h1>
      <ul class="text-black mx-10 text-xl font-cgothic">
        <li class="mb-4">
          - <span>Informer, orienter et accompagner</span> les Personnes en Situation de Prostitution (PSP) vers les dispositifs de
          <span>droits communs dans les champs de la santé, du social et du médico-social</span>
        </li>
        <li class="mb-4">
          - Promouvoir la démarche de <span>réduction des risques</span> et <span>des dommages</span>
        </li>
        <li class="mb-4">
          - Favoriser la promotion, <span>l’éducation à la santé et l’accès aux dépistages</span> (VIH, IST, hépatites, cancers)
        </li>

      </ul>
    </div>
    <div class="">
      <img src="../assets/stop.jpg" alt="stop" class="rounded-tr-[50%] w-[500px] h-[500px] object-cover md:mx-2 md:w-[400px]" />
    </div>
  </div>

  <!-- Container numéros  -->
  <div class="flex items-center justify-center font-c-gothic text-white font-bold text-5xl mt-20 relative md:text-xl">
    <div class="flex flex-col items-center bg-purple rounded-2xl p-10 relative">
      <h1 class="mb-2">LES NUMÉROS À CONTACTER</h1>
      <div class="numero flex gap-36 mb-10 mt-5 md:gap-10 md:text-4xl">
        <p class="flex-grow text-center">3919</p>
        <div class="contact-mineur flex items-center justify-center gap-4 md:flex-col md:gap-0">
          <p class="flex-grow text-center">119</p>
          <p class="flex-grow text-center text-lg md:text-sm">
            Pour les mineurs
          </p>
        </div>
      </div>
      <img src="../assets/welcome/polygon.png" alt="forme1" class="absolute object-cover right-0 -mr-5 mt-40 w-[50px] md:w-[30px]" />
      <img src="../assets/welcome/polygon.png" alt="forme1" class="absolute object-cover left-0 top-0 -ml-5 -mt-5 w-[70px] md:w-[50px]" />
      <img src="../assets/welcome/polygon.png" alt="forme1" class="absolute object-cover left-0 top-0 -ml-8 mt-14 w-[40px] md:w-[20px]" />
    </div>
  </div>

  <!-- Bouton - Contact -->
  <div class="flex items-center justify-center -mt-8 font-helvetica">
    <div class="flex items-center bg-purple-fonce shadow-xl rounded-2xl gap-4 py-2 px-6 z-20 hover:scale-110 duration-200">
      <img class="w-[50px] bg-purple-fonce md:hidden" src="../assets/courriel-de-contact.png" />
      <button class="text-white h-full font-bold text-xl md:text-lg md:p-4">
        NOUS CONTACTER
      </button>
    </div>
  </div>

<!-- Conteneur de l'arrière-plan -->
<div class="bg-alveoles h-auto z-0 bg-cover relative p-10">

<!-- Chiffres clés -->
<div class="relative top-32 w-full flex gap-12 justify-center items-center md:flex-col md:gap-6 md:text-xl md:top-16">
  <div v-for="number in numbers" :key="number.id" class="information flex flex-col justify-center items-center">
    <p class="chiffre text-6xl font-cgothic">{{ number.firstStats }}</p>
    <div class="information flex flex-col justify-center items-center">
      <p class="text font-jost-sans text-purple-fonce">Personnes rencontrées</p>
    </div>
  </div>
  <div class="separator">
    <p class="text text-6xl text-yellow md:hidden">|</p>
  </div>
  <div v-for="number in numbers" :key="number.id" class="information flex flex-col justify-center items-center">
    <p class="chiffre text-6xl font-cgothic">{{ number.secondStats }}</p>
    <div class="information flex flex-col justify-center items-center">
      <p class="text font-jost-sans text-purple-fonce">Maraudes effectuées</p>
    </div>
  </div>
  <div class="separator">
    <p class="text text-6xl text-yellow md:hidden">|</p>
  </div>
  <div v-for="number in numbers" :key="number.id" class="information flex flex-col justify-center items-center">
    <p class="chiffre text-6xl font-cgothic">{{ number.thirdStats }}</p>
    <div class="information flex flex-col justify-center items-center">
      <p class="text font-jost-sans text-purple-fonce">Préservatifs distribués</p>
    </div>
  </div>
</div>

<!-- Derniers articles -->
<div class=" font-cgothic my-12 mt-[200px]">
  <h2 class="text-center text-2xl font-bold mb-8">Nos articles épinglés</h2>
  <div class="header-content flex gap-12 justify-center items-center mx-auto mt-6">
    <div v-for="article in pinnedArticles" :key="article._id" class="card w-[300px] h-[375px] bg-white object-cover rounded-[25px] overflow-hidden p-4 shadow-xl border border-solid border-slate-300 relative">
      <img :src="`../backend/${article.image}`" alt="article image" class="rounded-t-[25px] h-[180px] w-full object-cover" />
      <p class="text-3xl font-bold font-c-gothic text-post-grey">{{ article.title }}</p>
      <p class="text text-grey font-jost-sans absolute bottom-4">{{ formatDate(article.date) }}</p>
      <router-link :to="{ name: 'BlogDetail', params: { id: article._id } }" class="arrow text-xl text-grey absolute bottom-3 right-4 font-bold bg-light-beige p-2 px-3 rounded-full">
        >
      </router-link>
    </div>
  </div>
</div>


</div>


  <!-- Pied de page -->
  <Footer />
</template>
<script>
import Footer from "../components/Footer.vue";
import NavigationBarMobile from "../components/NavigationBarMobile.vue";
import { showAllBlogs } from "../services/BlogsService.js";
import { showNumbers } from "../services/StatistiquesService.js";
import { ref, onMounted, computed } from 'vue';

export default {
  components: {
    Footer,
    NavigationBarMobile,
  },
  setup() {
    const isUserLoggedIn = ref(localStorage.getItem('token') !== null);
    const dropdownVisible = ref(false);
    const numbers = ref([]);
    const articles = ref([]);

    const toggleDropdown = () => {
      dropdownVisible.value = !dropdownVisible.value;
    };

    const logout = () => {
      localStorage.removeItem("token");
      isUserLoggedIn.value = false;
    };

    const fetchNumbers = async () => {
      try {
        const response = await showNumbers();
        numbers.value = response;
      } catch (error) {
        console.error("Erreur lors de la récupération des statistiques :", error);
      }
    };

    const fetchAllBlogs = async () => {
      try {
        const response = await showAllBlogs();
        articles.value = response;
      } catch (error) {
        console.error("Erreur lors de la récupération des articles :", error);
      }
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    };

    // Computed property pour les articles épinglés
    const pinnedArticles = computed(() => {
      return articles.value.filter((article) => article.pin);
    });

    onMounted(() => {
      fetchNumbers();
      fetchAllBlogs();
    });

    return {
      isUserLoggedIn,
      dropdownVisible,
      numbers,
      articles,
      toggleDropdown,
      logout,
      formatDate,
      pinnedArticles, 
    };
  },
};


</script>


<style>
.logo-container {
  height: 250px;
  overflow: hidden;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-content {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  animation: scroll 80s linear infinite;
}

.logo-content img {
  height: 120px; 
  width: auto; 
  margin: 0 25px; 
}

.dropdown-menu {
  z-index: 50;
}

@keyframes scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
