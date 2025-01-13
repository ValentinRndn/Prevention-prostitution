<template>
  <div class="relative bg-landing w-full h-[80vh] 2xl:h-[90vh] bg-center bg-cover bg-no-repeat mb-24 rounded-bl-[25%] overflow-hidden md:h-[60vh] md:mb-12 xl:h-[90vh]">
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-1"></div>

    <div class="relative z-20 flex flex-col items-center justify-center h-full px-6 text-center md:px-12 py-4 ">
      <h1 class="text-white font-cgothic yfont-bold text-5xl md:text-2xl lg:text-2xl xl:text-5xl drop-shadow-md mb-4">
        Prévention Accompagnement Prostitution Normandie
      </h1>
      <p class="text-white text-lg md:text-base lg:text-lg xl:text-xl leading-relaxed mb-8 max-w-4xl md:max-w-full md:w-full">
        Bienvenue sur le site Prévention Accompagnement Prostitution Normandie. Cette plateforme s’adresse aux Personnes en Situation de Prostitution (PSP), aux personnes qui en sont témoins, aux collectivités locales et aux professionnels de la protection, du droit, de la santé et de l’aide sociale. Il a pour objectif d’orienter vers les acteurs et dispositifs de prise en charge de droit commun afin de favoriser l’accès aux droits et aux soins et ainsi de contribuer à la réduction des risques.
      </p>
      <router-link to="/guide" class="inline-flex items-center bg-purple-fonce text-white font-semibold text-lg md:text-base px-6 py-3 rounded-lg shadow-lg hover:bg-purple transition duration-300 group">
        <span>JE ME RENSEIGNE</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="ml-2 transition-transform transform group-hover:translate-x-2">
          <path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q-.15.15-.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
        </svg>
      </router-link>
    </div>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import NavigationBarMobile from "../components/NavigationBarMobile.vue";

export default {
  components: {
    Footer,
    NavigationBarMobile,
  },
};
</script>

<style>

.textShadow {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.6);
}

.router-link svg {
  transition: transform 0.3s ease-in-out;
}

.group:hover svg {
  transform: translateX(4px);
}


</style>
