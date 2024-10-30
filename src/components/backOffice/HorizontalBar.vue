<template>
  <header class="w-full bg-purple-fonce items-center absolute top-0 left-0 right-0">
    <div class="">
      <!-- Contenu de votre barre horizontale -->
      <div class="flex justify-between text-white mx-4">
        <!-- Contenu gauche -->
        <div class="flex ">
          <!-- Ajoutez ici le contenu de la partie gauche de la barre horizontale -->
          <router-link class="button flex items-center gap-2 text-white" to="/">
            <img src="../../assets/logo_back.svg" alt="logo" class="material-icons w-[2rem] mt-4 mb-4">
            <span class="text underline">Retour au site</span>
          </router-link>
        </div>
        <!-- Contenu droit -->
        <div class="flex items-center">
          <!-- Ajoutez ici le contenu de la partie droite de la barre horizontale -->
            <!-- <span class="">Bonjour {{ user.pseudo }}</span> -->
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HorizontalBar',

  data() {
    return {
      user: {
        pseudo: ''
      }
    };
  },

  mounted() {
    this.decodeToken();
  },

  methods: {
    decodeToken() {
      const token = localStorage.getItem('token');
      if (token) {
        const user = this.parseJwt(token);
        this.user = user;
      }
    },

    parseJwt(token) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    }
  }
};
</script>

<style scoped>
/* Vos styles CSS ici */
</style>
