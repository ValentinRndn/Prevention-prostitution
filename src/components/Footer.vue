<template>
  <footer class="bg-grey text-white font-semibold border-t border-grey font-cgothic mx-auto flex flex-col items-center text-center">
    <div class="container mx-auto ">


      <!-- Bandeau blanc avec les logos -->
      <div class="bg-white py-10 w-full flex justify-center items-center gap-24 shadow-md">
        <img src="../assets/welcome/logo_agrasc.jpg" alt="Logo AGRASC" class="h-28 object-cover" />
        <img src="../assets/logo_calvados.png" alt="Logo Préfecture de Région" class="h-28  object-cover" />
        <img src="../assets/welcome/logo-region-normandie.png" alt="Logo Consortium" class="h-28  object-cover" />
      </div>
            <!-- Texte du footer -->
            <p class="text-sm mb-4">
        © 2024 AGRASC - <router-link to="/legalNotices" class="underline">Mentions légales</router-link> - Pilotage : Accueil Service & PAPSP de Caen – Création : à compléter – Maintenance : Valentin RENAUDIN – Tous droits réservés
      </p>
      
      <!-- Lien pour les préférences cookies -->
      <a href="#" @click.prevent="openCookieSettings" class="text-sm underline mb-4">Préférences Cookies</a>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    openCookieSettings() {
      this.$emit('openCookieSettings');
    },
  },
};
</script>

<style scoped>
/* Styles personnalisés */
.bg-darkpurple {
  background-color: #2a1b3d; /* Couleur sombre pour contraster avec le texte blanc */
}
footer p {
  max-width: 600px;
  line-height: 1.6;
}
</style>
