<template>
    <footer class="text-grey font-semibold pt-8 pb-2 font-cgothic mx-auto flex justify-center items-center">
      <div class="container">
        <div class="links h-10">
          <img src="../assets/logo_typo.png" alt="logo-reseaux" class="h-[100px] w-[100] mx-auto mb-2 hidden sm:block" />
          <ul class="text-sm flex gap-5 justify-center items-center sm:flex-col">
            <li><router-link to="/">ACCUEIL</router-link></li>
            <li><router-link to="/map">CARTOGRAPHIE</router-link></li>
            <li><router-link to="/guide">GUIDE</router-link></li>
            <li><router-link to="/blog">BLOG</router-link></li>
            <li><router-link to="/contact">CONTACT</router-link></li>
            <li><router-link to="/legalNotices">MENTIONS LÉGALES</router-link></li>
            <li><a href="#" @click.prevent="openCookieSettings">PRÉFÉRENCES COOKIES</a></li>
          </ul>
        </div>
        <img src="../assets/logo_typo.png" alt="logo-reseaux" class="w-1/5 object-cover mx-auto sm:hidden" />
        <p class="text-center text-xs mt-4 font-cgothic sm:hidden">© 2024 Prévention Prostitution. Tous droits réservés.</p>
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
  /* Ajoutez ici des styles personnalisés si nécessaire */
  </style>
  