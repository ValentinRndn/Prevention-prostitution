<template>
  <aside>
    <div class="icon-burger flex w-full items-center justify-evenly  p-4" :class="{'bg-purple-fonce text-white transition-transform duration-300 ease-in-out transform': menuOpen}">
      <router-link to="/">
        <img v-if="!menuOpen" src="../assets/logo_black.png" alt="Logo blanc" class="object-cover w-[200px]">
        <img v-else src="../assets/logo_white.png" alt="close icon" @click="toggleMenu" class="object-cover w-[200px]">
      </router-link>  
      <svg xmlns="http://www.w3.org/2000/svg" class="text-2xl font-bold cursor-pointer" width="32" height="32" viewBox="0 0 32 32" @click="toggleMenu">
        <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h22M5 16h22M5 24h22"/>
      </svg>
    </div>
    
    <!-- Menu mobile avec effet de défilement -->
    <transition name="slide-down" >
      <ul v-show="menuOpen" class="navbar w-full flex flex-col gap-5 text-xl font-cgothic font-semibold justify-center absolute items-center bg-purple-fonce  text-white py-5 transition-transform duration-300 ease-in-out transform opacity-100 ">
        <li class="menu">
          <router-link to="/map" @click="toggleMenu">CARTOGRAPHIE</router-link>
        </li>
        <li class="menu">
          <router-link to="/guide" @click="toggleMenu">GUIDE</router-link>
        </li>
        <li class="menu">
          <router-link to="/contact" @click="toggleMenu">CONTACT</router-link>
        </li>
        <li class="menu">
          <router-link to="/backoffice/dashboard" @click="toggleMenu">BACKOFFICE</router-link>
        </li>
        <li class="menu">
          <button @click="logout" class=" text-white px-4 py-2 rounded-md">SE DÉCONNECTER</button>
        </li>
      </ul>
    </transition>
  </aside>
</template>

<script>
export default {
  name: 'NavigationBarMobile',
  data() {
    return {
      menuOpen: false
    };
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
    },
    logout() {
      // Logique de déconnexion
      alert("Vous êtes déconnecté.");
      this.toggleMenu();
    }
  }
}
</script>

<style scoped>
.icon-burger {
  transition: background-color 0.3s ease, color 0.3s ease;
}

.navbar  {
  z-index: 1000;
}
.menu {
  padding: 0.5rem 1rem;
}

/* Transition de défilement du haut vers le bas */
.slide-down-enter-active, .slide-down-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-down-enter, .slide-down-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}
.slide-down-enter-to, .slide-down-leave {
  transform: translateY(0);
  opacity: 1;
}
</style>
