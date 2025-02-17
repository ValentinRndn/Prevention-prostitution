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
  
<!-- Additional Content -->
<div class="px-6 py-12 max-w-4xl mx-auto text-gray-800">
  <div class="space-y-12">
    <!-- Section Comprendre -->
     <div class="top-section flex w-full">
    <div class="bg-white rounded-xl shadow-lg p-8 transform transition duration-300 hover:-translate-y-1">
      <div class="flex items-center mb-6">
        <div class="bg-gray-100 p-3 rounded-lg">
          <!-- Users Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-fonce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold ml-4 text-purple-fonce">Comprendre la Situation des PSP</h2>
      </div>
      <p class="text-gray-600 leading-relaxed">
        Les Personnes en Situation de Prostitution peuvent être confrontées à de nombreuses difficultés : précarité, violences, isolement, problèmes de santé physique et mentale. Ces situations rendent l'accès aux dispositifs de droit commun souvent complexe. C'est pourquoi des structures spécialisées en Normandie proposent un accompagnement personnalisé.
      </p>
    </div>

    <!-- Section Dispositifs -->
    <div class="bg-white rounded-xl shadow-lg p-8 transform transition duration-300 hover:-translate-y-1">
      <div class="flex items-center mb-6">
        <div class="bg-gray-100 p-3 rounded-lg">
          <!-- Heart Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-fonce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold ml-4 text-purple-fonce">Dispositifs d'Aide</h2>
      </div>
      <div class="space-y-4">
        <div class="flex items-start">
          <span class="h-2 w-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <p class="text-gray-600">
            <span class="font-semibold">Accompagnement social et juridique :</span> 
            Aide à l'obtention de droits sociaux, accompagnement juridique, soutien administratif.
          </p>
        </div>
        <div class="flex items-start">
          <span class="h-2 w-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <p class="text-gray-600">
            <span class="font-semibold">Prise en charge sanitaire :</span>
            Accès aux soins médicaux, prévention IST, soutien psychologique.
          </p>
        </div>
        <div class="flex items-start">
          <span class="h-2 w-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
          <p class="text-gray-600">
            <span class="font-semibold">Réinsertion et hébergement :</span>
            Formation, emploi, logement et accompagnement vers la stabilité.
          </p>
        </div>
      </div>
    </div>
    </div>

    <!-- Section Prévention -->
    <div class="bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl p-8">
      <div class="flex items-center mb-6">
        <div class="bg-white p-3 rounded-lg">
          <!-- Book Icon -->
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-fonce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
            <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
          </svg>
        </div>
        <h2 class="text-2xl font-semibold ml-4 text-purple-fonce">Réduction des Risques et Prévention</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h3 class="font-semibold mb-3 text-purple-fonce">Espaces d'accueil</h3>
          <p class="text-gray-600">Accueil confidentiel et sécurisé pour l'écoute et le soutien</p>
        </div>
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h3 class="font-semibold mb-3 text-purple-fonce">Matériel de prévention</h3>
          <p class="text-gray-600">Distribution de préservatifs et conseils en santé sexuelle</p>
        </div>
        <div class="bg-white rounded-lg p-6 shadow-sm">
          <h3 class="font-semibold mb-3 text-purple-fonce">Accompagnement</h3>
          <p class="text-gray-600">Soutien personnalisé vers la sortie de la prostitution</p>
        </div>
      </div>
    </div>

    <!-- Section Contact -->
    <div class="text-center">
      <div class="inline-flex items-center justify-center bg-purple-100 p-3 rounded-lg mb-6">
        <!-- Phone Icon -->
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-fonce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </div>
      <h2 class="text-2xl font-semibold mb-4 text-purple-fonce">Comment Contacter un Dispositif d'Aide en Normandie ?</h2>
      <p class="text-gray-600 max-w-2xl mx-auto leading-relaxed">
        Des plateformes et associations spécialisées sont à votre disposition en Normandie pour garantir un accompagnement bienveillant et sans jugement. N'hésitez pas à consulter les ressources disponibles et à vous orienter vers les professionnels qui sauront vous guider dans vos démarches.
      </p>
    </div>
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
