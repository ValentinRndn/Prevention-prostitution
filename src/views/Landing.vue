<template>
  <div class="bg-landing relative w-full h-[70vh] bg-center mb-24 rounded-bl-[25%] bg-cover bg-no-repeat md:h-[50vh] md:mb-0 overflow-hidden xl:h-[90vh] ">
    <div class="header-content flex flex-col justify-center h-full">
      <div class="text-header text-white font-semibold w-1/2 m-48 md:w-full md:m-0">
      <h1 class="text-6xl  lg:text-4xl w-full mb-6 textShadow xl:text-4xl xl:text-center">
        Prévention Accompagnement Prostitution Normandie
      </h1>
      <p class="w-full text-2xl mb-6 textShadow xl:text-md xl:text-center">Bienvenue sur le site Prévention Accompagnement Prostitution Normandie. Cette plateforme s’adresse aux Personnes en Situation de Prostitution (PSP), aux personnes qui en sont témoins, aux collectivités locales et aux professionnels de la protection, du droit, de la santé et de l’aide sociale. Il a pour objectif d’orienter vers les acteurs et dispositifs de prise en charge de droit commun afin de favoriser l’accès aux droits et aux soins et ainsi de contribuer à la réduction des risques.</p>
      <button class="bg-purple-fonce text-white flex items-center drop-shadow-lg border-2 border-grey justify-center gap-2 font-jost-sans font-semibold text-xl py-3 rounded-md px-6 hover:bg-purple transition-colors duration-300 group">
    <router-link to="/guide">
        JE ME RENSEIGNE
      </router-link>
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"  viewBox="0 0 24 24" class="transition-transform duration-300 transform group-hover:translate-x-2">
      <path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
    </svg>
  </button>
    </div>

    </div>
  </div>

  <!-- Missions et photo stop  -->
  <!-- <div class="container-presentation flex flex-wrap justify-center items-center w-full gap-8 md:text-center">
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
  </div> -->

  <!-- Container numéros  -->
  <!-- <div class="flex items-center justify-center font-c-gothic text-white font-bold text-5xl mt-20 relative md:text-xl">
    <div class="flex flex-col items-center bg-purple rounded-2xl p-10 relative">
      <h1 class="mb-2">LES NUMÉROS À CONTACTER</h1>
      <div class="numero flex gap-36 mb-10 mt-5 md:gap-10 md:text-4xl">
        <a href="tel:3919">
        <p class="flex-grow text-center">3919</p>
      </a>
        <div class="contact-mineur flex items-center justify-center gap-4 md:flex-col md:gap-0">
          <a href="tel:119">
          <p class="flex-grow text-center">119</p>
          </a>
          <p class="flex-grow text-center text-lg md:text-sm">
            Pour les mineurs
          </p>
        </div>
      </div>
      <img src="../assets/welcome/polygon.png" alt="forme1" class="absolute object-cover right-0 -mr-5 mt-40 w-[50px] md:w-[30px]" />
      <img src="../assets/welcome/polygon.png" alt="forme1" class="absolute object-cover left-0 top-0 -ml-5 -mt-5 w-[70px] md:w-[50px]" />
      <img src="../assets/welcome/polygon.png" alt="forme1" class="absolute object-cover left-0 top-0 -ml-8 mt-14 w-[40px] md:w-[20px]" />
    </div>
  </div> -->

  <!-- Bouton - Contact -->
  <!-- <div class="flex items-center justify-center -mt-8 font-helvetica">
    <div class="flex items-center bg-purple-fonce shadow-xl rounded-2xl gap-4 py-2 px-6 z-20 hover:scale-110 duration-200">
      <img class="w-[50px] bg-purple-fonce md:hidden" src="../assets/courriel-de-contact.png" />
      <router-link to="/contact">
      <button class="text-white h-full font-bold text-xl md:text-lg md:p-4">
        NOUS CONTACTER
      </button>
    </router-link>
    </div>
  </div> -->

<!-- Conteneur de l'arrière-plan -->
<!-- <div class="bg-alveoles h-auto z-0 bg-cover relative  my-12 "> -->

  <!-- Key Figures Section -->
  <!-- <div class=" z-0 bg-cover relative my-32 ">
      <div class="relative  w-full flex gap-12 justify-center items-center md:flex-col md:gap-6 md:text-xl md:top-16">
        <div class="information flex flex-col justify-center items-center">
          <p class="chiffre text-8xl font-cgothic">{{ numbers.firstStats }}</p>
          <p class="text text-xl font-jost-sans text-purple-fonce">Personnes rencontrées</p>
        </div>
        <div class="separator">
          <p class="text text-8xl text-purple md:hidden">|</p>
        </div>
        <div class="information flex flex-col justify-center items-center">
          <p class="chiffre text-8xl font-cgothic">{{ numbers.secondStats }}</p>
          <p class="text text-xl  font-jost-sans text-purple-fonce">Maraudes effectuées</p>
        </div>
        <div class="separator">
          <p class="text text-8xl text-purple md:hidden">|</p>
        </div>
        <div class="information flex flex-col justify-center items-center">
          <p class="chiffre text-8xl font-cgothic">{{ numbers.thirdStats }}</p>
          <p class="text text-xl  font-jost-sans text-purple-fonce">Préservatifs distribués</p>
        </div>
      </div>
    </div> -->

<!-- Derniers articles -->
<!-- <div class=" font-cgothic "> -->
  <!-- <h2 class="text-center text-4xl font-bold mb-8">Nos articles épinglés</h2>
  <div class="header-content flex gap-12 justify-center items-center mx-auto mt-6">
    <div v-for="article in pinnedArticles" :key="article._id" class="card w-[300px] h-[375px] bg-white object-cover rounded-[25px] overflow-hidden p-4 shadow-xl border border-solid border-slate-300 relative">
      <img :src="`../backend/${article.image}`" alt="article image" class="rounded-t-[25px] h-[180px] w-full object-cover" />
      <p class="text-3xl font-bold font-c-gothic text-post-grey">{{ article.title }}</p>
      <p class="text text-grey font-jost-sans absolute bottom-4">{{ formatDate(article.date) }}</p>
      <router-link :to="{ name: 'BlogDetail', params: { id: article._id } }" class="arrow text-xl text-grey absolute bottom-3 right-4 font-bold bg-light-beige p-2 px-3 rounded-full">
        >
      </router-link>
    </div> -->
  <!-- </div> -->
<!-- </div> -->
<!-- </div> -->
</template>
<script>
import Footer from "../components/Footer.vue";
import NavigationBarMobile from "../components/NavigationBarMobile.vue";

export default {
  components: {
    Footer,
    NavigationBarMobile,
  }
};

</script>


<style>


.dropdown-menu {
  z-index: 50;
}

.textShadow {
  text-shadow: 2px 2px 2px rgba(0, 0, 0, 0.5);
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
