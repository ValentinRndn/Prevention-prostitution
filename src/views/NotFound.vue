<template>
  <div class="not-found-container min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4">
    <!-- Error Code -->
    <div class="error-code text-purple-fonce font-cgothic font-bold text-9xl md:text-8xl sm:text-7xl mb-4 animate-pulse">
      404
    </div>

    <!-- Main Message -->
    <h1 class="text-4xl md:text-3xl sm:text-2xl font-bold text-gray-800 font-cgothic text-center mb-4">
      Page non trouvée
    </h1>

    <!-- Description -->
    <p class="text-lg md:text-base sm:text-sm text-gray-600 font-jost-sans text-center max-w-2xl mb-8">
      Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
      Nous vous invitons à retourner à l'accueil ou à utiliser les liens ci-dessous pour naviguer sur notre site.
    </p>

    <!-- Illustration -->
    <div class="illustration mb-8">
      <svg class="w-64 h-64 md:w-48 md:h-48 sm:w-40 sm:h-40" viewBox="0 0 500 500" fill="none" xmlns="http://www.w3.org/2000/svg">
        <!-- Map/Location Icon -->
        <circle cx="250" cy="250" r="200" fill="#f1b04c" opacity="0.1"/>
        <path d="M250 150C211.34 150 180 181.34 180 220C180 270 250 350 250 350C250 350 320 270 320 220C320 181.34 288.66 150 250 150Z"
              fill="#f1b04c"/>
        <circle cx="250" cy="220" r="30" fill="white"/>
        <path d="M200 400L300 400M220 420L280 420M240 440L260 440"
              stroke="#6b21a8"
              stroke-width="4"
              stroke-linecap="round"/>
      </svg>
    </div>

    <!-- Action Buttons -->
    <div class="action-buttons flex flex-wrap gap-4 justify-center">
      <router-link
        to="/"
        class="btn-primary bg-purple-fonce text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-purple transition duration-300 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
        </svg>
        Retour à l'accueil
      </router-link>

      <router-link
        to="/carte"
        class="btn-secondary bg-white text-purple-fonce font-semibold px-8 py-3 rounded-lg shadow-lg border-2 border-purple-fonce hover:bg-gray-50 transition duration-300 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        Voir la carte
      </router-link>

      <router-link
        to="/contact"
        class="btn-secondary bg-white text-purple-fonce font-semibold px-8 py-3 rounded-lg shadow-lg border-2 border-purple-fonce hover:bg-gray-50 transition duration-300 flex items-center gap-2"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
        </svg>
        Nous contacter
      </router-link>
    </div>

    <!-- Helpful Links -->
    <div class="helpful-links mt-12 text-center">
      <p class="text-gray-600 font-jost-sans mb-4">Pages utiles :</p>
      <div class="links flex flex-wrap gap-6 justify-center text-purple-fonce font-semibold">
        <router-link to="/guide" class="hover:underline">Guides</router-link>
        <router-link to="/guides/particuliers" class="hover:underline">Guides Particuliers</router-link>
        <router-link to="/guides/professionnels" class="hover:underline">Guides Professionnels</router-link>
        <router-link to="/legalNotices" class="hover:underline">Mentions légales</router-link>
      </div>
    </div>

    <!-- Search Suggestion (Optional future enhancement) -->
    <div class="search-suggestion mt-8 text-center text-gray-500 text-sm font-jost-sans">
      <p>Si vous pensez qu'il s'agit d'une erreur, n'hésitez pas à <router-link to="/contact" class="text-purple-fonce hover:underline">nous contacter</router-link>.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
  mounted() {
    // Log 404 for analytics (optional)
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: '404 - Page non trouvée',
        page_location: window.location.href,
        page_path: this.$route.path
      });
    }
  }
};
</script>

<style scoped>
/* Animation for 404 number */
@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

/* Hover effects */
.btn-primary:hover,
.btn-secondary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
}

.btn-primary,
.btn-secondary {
  transition: all 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .action-buttons {
    flex-direction: column;
    width: 100%;
  }

  .btn-primary,
  .btn-secondary {
    width: 100%;
    justify-content: center;
  }
}
</style>
