<template>
  <aside>
    <div class="icon-burger flex w-full items-center justify-evenly z-30" :class="{'bg-purple-fonce text-white transition-transform duration-300 ease-in-out transform': menuOpen}">
      <img v-if="!menuOpen" src="../assets/logo_typo.png" alt="logo" class="object-cover w-[300px]">
      <img v-else src="../assets/logo_typo_blanc.png" alt="close icon" @click="toggleMenu" class="object-cover w-[300px]">
  
      <svg xmlns="http://www.w3.org/2000/svg" class="text-2xl font-bold cursor-pointer" width="32" height="32" viewBox="0 0 32 32" @click="toggleMenu">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h22M5 16h22M5 24h22"/>
        </svg>
    </div>
    <ul :class="['navbar w-full flex flex-col gap-10 text-xl font-cgothic font-semibold justify-center items-center bg-purple-fonce fixed text-white py-5 transition-transform duration-300 ease-in-out transform', { 'opacity-0': !menuOpen, 'opacity-100 z-20': menuOpen }]">
      <li class="menu">
        <router-link to="/">ACCUEIL</router-link>
      </li>      
      <li class="menu">
        <router-link to="/map">CARTOGRAPHIE</router-link>
      </li>
      <li class="menu">
        <router-link to="/guide">GUIDE</router-link>
      </li>
      <li class="menu">
        <router-link to="/contact">CONTACT</router-link>
      </li>
    </ul>

    <div class="navbar-mobile flex justify-end">
       
        <ul :class="['navbar-menu', isOpen ? 'open' : '']" class="transition-transform duration-300 ease-in-out transform absolute bg-red top-0 left-0 w-full bg-red-500 text-white opacity-0 -translate-y-full text-center z-40">
          <li class="p-4"><router-link to="/" exact-active-class="active" @click="toggleMenu">Accueil</router-link></li>
          <li class="p-4"><router-link to="/gallery" exact-active-class="active" @click="toggleMenu">Galerie photos</router-link></li>
          <li class="p-4"><router-link to="/form" exact-active-class="active" @click="toggleMenu">Contact</router-link></li>
        </ul>
      </div>

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
    }
  }
}
</script>

<style>
/* Ajoutez ici vos styles personnalisés si nécessaire */
</style>
