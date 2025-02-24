<template>
  <div class="relative bg-landing w-full h-[80vh] bg-center bg-cover bg-no-repeat mb-24 rounded-bl-[25%] overflow-hidden md:h-[60vh] md:mb-12 xl:h-[90vh]">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-1"></div>

    <!-- Content -->
    <div class="relative z-1 flex flex-col items-center justify-center h-full px-4 text-center md:px-6 lg:px-8 py-4">
      <!-- Heading -->
      <h1 class="text-white font-cgothic font-bold text-4xl md:text-3xl sm:text-2xl drop-shadow-md mb-4">
        Personnes en Situation de Prostitution : Accès aux Droits, Soins et Accompagnement en Normandie
      </h1>
      <!-- Paragraph -->
      <p class="text-white text-lg md:text-base sm:text-sm lg:text-lg xl:text-xl leading-relaxed mb-8 max-w-4xl sm:max-w-full">
        <strong>La prévention et l’accompagnement des Personnes en Situation de Prostitution (PSP)</strong> en Normandie sont des enjeux majeurs pour favoriser leur accès aux droits, aux soins et aux dispositifs de soutien. Que vous soyez directement concerné(e), témoin d’une situation ou un professionnel souhaitant aider, il existe des solutions adaptées pour garantir une prise en charge globale et réduire les risques liés à la prostitution.
            </p>
      <!-- Button -->
      <router-link
        to="/guide"
        class="inline-flex items-center bg-purple-fonce text-white font-semibold text-lg sm:text-base px-6 py-3 rounded-lg shadow-lg hover:bg-purple transition duration-300 group"
      >
        <span>JE ME RENSEIGNE</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          class="ml-2 transition-transform transform group-hover:translate-x-2"
        >
          <path
            fill="currentColor"
            d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q-.15.15-.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"
          />
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
