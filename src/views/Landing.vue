<template>
  <div class="relative bg-landing w-full h-[80vh] bg-center bg-cover bg-no-repeat mb-24 rounded-bl-[25%] overflow-hidden md:h-[60vh] md:mb-12 xl:h-[90vh]">
    <!-- Overlay -->
    <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-black/10 z-1"></div>

    <!-- Content -->
    <div class="relative z-1 flex flex-col items-center justify-center h-full px-4 text-center md:px-6 lg:px-8 py-4">
      <!-- Heading -->
      <h1 class="text-white font-cgothic font-bold text-4xl md:text-3xl sm:text-2xl drop-shadow-md mb-4 max-w-[80%] md:max-w-4xl ">
        Personnes en Situation de Prostitution : Accès aux Droits, Soins et Accompagnement en Normandie
            </h1>
      <!-- Paragraph -->
      <p class="text-white text-lg md:text-base sm:text-sm lg:text-lg xl:text-xl leading-relaxed mb-8 max-w-4xl sm:max-w-full">
        La prévention et l'accompagnement des Personnes en Situation de Prostitution (PSP) en Normandie sont des enjeux majeurs pour favoriser leur accès aux droits, aux soins et aux dispositifs de soutien. Que vous soyez directement concerné(e), témoin d'une situation ou un professionnel souhaitant aider, il existe des solutions adaptées pour garantir une prise en charge globale et réduire les risques liés à la prostitution.      </p>
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

  <!-- Contenu principal -->
  <div class="container mx-auto px-4 md:px-6 lg:px-8 max-w-6xl">


    <section class="mb-16 bg-gray-50 p-8 rounded-lg shadow-sm">
      <h2 class="text-3xl md:text-2xl font-semibold text-purple-fonce mb-6">
        Comprendre la Situation des Personnes en Situation de Prostitution
      </h2>
      <p class="text-gray-800 text-lg leading-relaxed">
        Les Personnes en Situation de Prostitution peuvent être confrontées à de nombreuses difficultés : précarité, violences, isolement, problèmes de santé physique et mentale. Ces situations rendent l'accès aux dispositifs de droit commun souvent complexe. C'est pourquoi des structures spécialisées en Normandie proposent un accompagnement personnalisé pour garantir une meilleure insertion sociale et professionnelle.
      </p>
    </section>

    <section class="mb-16">
  <h2 class="text-3xl md:text-2xl font-semibold text-purple-fonce mb-6 text-center">
    Quels Dispositifs d'Aide pour les Personnes en Situation de Prostitution ?
  </h2>
  <p class="text-gray-800 text-lg leading-relaxed mb-8 text-center">
    En Normandie, plusieurs dispositifs et associations sont mobilisés pour offrir des solutions adaptées :
  </p>
  
  <div class="grid grid-cols-3 md:grid-cols-1 gap-6">
    <!-- Carte 1 -->
    <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div class="bg-purple-fonce/10 p-6 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-purple-fonce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
          <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
          <path d="M9 12h6"></path>
          <path d="M9 16h6"></path>
        </svg>
      </div>
      <div class="p-6 border-t-2 border-purple-fonce">
        <h3 class="font-semibold text-xl mb-3 text-purple-fonce text-center">Accompagnement social et juridique</h3>
        <p class="text-gray-700 text-center">Aide à l'obtention de droits sociaux, accompagnement juridique pour sortir de la prostitution, soutien dans les démarches administratives.</p>
      </div>
    </div>

    <!-- Carte 2 -->
    <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div class="bg-purple-fonce/10 p-6 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-purple-fonce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
          <circle cx="12" cy="12" r="4"></circle>
        </svg>
      </div>
      <div class="p-6 border-t-2 border-purple-fonce">
        <h3 class="font-semibold text-xl mb-3 text-purple-fonce text-center">Prise en charge sanitaire</h3>
        <p class="text-gray-700 text-center">Accès aux soins médicaux, prévention des infections sexuellement transmissibles (IST), soutien psychologique.</p>
      </div>
    </div>

    <!-- Carte 3 -->
    <div class="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden">
      <div class="bg-purple-fonce/10 p-6 flex justify-center">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-16 h-16 text-purple-fonce" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
          <polyline points="9 22 9 12 15 12 15 22"></polyline>
        </svg>
      </div>
      <div class="p-6 border-t-2 border-purple-fonce">
        <h3 class="font-semibold text-xl mb-3 text-purple-fonce text-center">Réinsertion professionnelle et hébergement</h3>
        <p class="text-gray-700 text-center">Dispositifs pour aider les Personnes en Situation de Prostitution à retrouver une stabilité (formation, emploi, logement).</p>
      </div>
    </div>
  </div>
</section>

    <section class="mb-16 bg-gray-50 p-8 rounded-lg shadow-sm">
      <h2 class="text-3xl md:text-2xl font-semibold text-purple-fonce mb-6">
        Réduction des Risques et Prévention
      </h2>
      <p class="text-gray-800 text-lg leading-relaxed mb-6">
        Les associations et structures spécialisées travaillent également sur la réduction des risques en proposant :
      </p>
      <ul class="space-y-4 text-gray-800">
        <li class="flex items-start">
          <svg class="w-5 h-5 text-purple-fonce mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          <span>Des espaces d'accueil et d'écoute, confidentiels et sécurisés.</span>
        </li>
        <li class="flex items-start">
          <svg class="w-5 h-5 text-purple-fonce mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          <span>Une distribution de matériel de prévention (préservatifs, conseils en santé sexuelle, kits de réduction des risques).</span>
        </li>
        <li class="flex items-start">
          <svg class="w-5 h-5 text-purple-fonce mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg>
          <span>Un accompagnement vers une sortie de la prostitution, en lien avec les services sociaux et professionnels compétents.</span>
        </li>
      </ul>
    </section>

    <section class="mb-16">
      <h2 class="text-3xl md:text-2xl font-semibold text-purple-fonce mb-6 text-center">
        Comment Contacter un Dispositif d'Aide en Normandie ?
      </h2>
      <p class="text-gray-800 text-lg leading-relaxed mb-6 text-center">
        Si vous êtes une Personne en Situation de Prostitution ou un témoin souhaitant apporter son aide, il existe des plateformes et associations spécialisées en Normandie. Ces structures permettent de garantir un accompagnement bienveillant et sans jugement.
      </p>
      <p class="text-gray-800 text-lg leading-relaxed font-medium text-center">
        N'hésitez pas à consulter les ressources disponibles et à vous orienter vers les professionnels qui sauront vous guider dans vos démarches.
      </p>
      <div class="mt-10 flex justify-center ">
        <router-link
          to="/contact"
          class="inline-flex items-center bg-purple-fonce text-white font-semibold text-lg px-6 py-3 rounded-lg shadow-lg hover:bg-purple transition duration-300 group"
        >
          <span class="">CONTACTER UN DISPOSITIF D'AIDE</span>
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
    </section>
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
  mounted() {
    // Ajouter le structured data JSON-LD au head
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "GovernmentOrganization",
      "name": "Prévention Prostitution Normandie - PAPSP",
      "alternateName": "PAPSP",
      "url": "https://preventionprostitutionnormandie.com",
      "logo": "https://preventionprostitutionnormandie.com/logo.png",
      "description": "Plateforme d'accompagnement et de prévention pour les personnes en situation de prostitution en Normandie. Services d'aide sociale, médicale et juridique.",
      "areaServed": {
        "@type": "Place",
        "name": "Normandie",
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "Normandie",
          "addressCountry": "FR"
        }
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+33626592637",
        "contactType": "Support",
        "email": "maraudeinnormandie@gmail.fr",
        "availableLanguage": ["French"],
        "areaServed": "FR-NOR"
      },
      "serviceType": [
        "Accompagnement social",
        "Aide juridique",
        "Prise en charge sanitaire",
        "Réinsertion professionnelle",
        "Hébergement d'urgence",
        "Réduction des risques"
      ],
      "knowsAbout": [
        "Prostitution",
        "Prévention",
        "Travail social",
        "Réduction des risques",
        "Accompagnement juridique"
      ]
    });
    document.head.appendChild(script);
  }
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

/* Ajout de styles pour le nouveau contenu */
.text-purple-fonce {
  color: #6A1B9A;
}

.text-purple {
  color: #9C27B0;
}

.bg-purple-fonce {
  background-color: #6A1B9A;
}

.bg-purple {
  background-color: #9C27B0;
}

.border-purple-fonce {
  border-color: #6A1B9A;
}
</style>