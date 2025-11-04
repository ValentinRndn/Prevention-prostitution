<template>
  <aside class="mobile-nav relative">
    <!-- Barre de navigation fixe -->
    <div 
      class="nav-header flex items-center justify-between px-6 py-4 transition-all duration-300"
      :class="{'bg-purple-fonce shadow-lg': menuOpen, 'bg-white': !menuOpen}"
    >
      <router-link to="/">
        <img v-if="!menuOpen" src="../assets/logo_typo.png" alt="Logo blanc" class="object-cover w-[200px]">
        <img v-else src="../assets/logo_typo_blanc.png" alt="Logo blanc" class="object-cover w-[200px]">
      </router-link>

      <!-- Bouton hamburger avec animation -->
      <button 
        class="hamburger-btn z-20 relative w-10 h-10 flex items-center justify-center focus:outline-none"
        @click="toggleMenu"
        aria-label="Menu"
      >
        <span 
          class="hamburger-line absolute h-0.5 w-6 transition-all duration-300 ease-in-out"
          :class="{'bg-white translate-y-0 rotate-45': menuOpen, 'bg-gray-700 -translate-y-2': !menuOpen}"
        ></span>
        
        <span 
          class="hamburger-line absolute h-0.5 w-6 transition-all duration-300 ease-in-out"
          :class="{'bg-white opacity-0': menuOpen, 'bg-gray-700 opacity-100': !menuOpen}"
        ></span>
        
        <span 
          class="hamburger-line absolute h-0.5 w-6 transition-all duration-300 ease-in-out"
          :class="{'bg-white translate-y-0 -rotate-45': menuOpen, 'bg-gray-700 translate-y-2': !menuOpen}"
        ></span>
      </button>
    </div>

    <!-- Espace sous la navbar fixe -->
    <div class="h-[68px]"></div>

    <!-- Overlay du menu -->
    <transition name="fade-slide">
      <div v-if="menuOpen" class="menu-overlay fixed inset-0 bg-purple-fonce z-10 pt-[68px]">
        <div class="h-full w-full flex flex-col pt-8 pb-10 px-8">
          <!-- Navigation menu -->
          <nav class="flex-1">
            <ul class="space-y-5 text-center flex flex-col mt-8">
              <li class="menu-item relative py-2" :class="{'active-menu': currentRoute === '/carte' || currentRoute === '/map'}">
                <router-link
                  to="/carte"
                  class="text-white text-xl font-cgothic inline-block"
                  @click="toggleMenu"
                >
                  CARTOGRAPHIE
                </router-link>
              </li>
              
              <li class="menu-item relative py-2" :class="{'active-menu': currentRoute === '/guide'}">
                <router-link 
                  to="/guide" 
                  class="text-white text-xl font-cgothic inline-block"
                  @click="toggleMenu"
                >
                  GUIDE
                </router-link>
              </li>
              
              <li class="menu-item relative py-2" :class="{'active-menu': currentRoute === '/contact'}">
                <router-link 
                  to="/contact" 
                  class="text-white text-xl font-cgothic inline-block"
                  @click="toggleMenu"
                >
                  CONTACT
                </router-link>
              </li>
              
              <!-- Options réservées aux utilisateurs connectés -->
              <li v-if="isUserLoggedIn" class="menu-item relative py-2" :class="{'active-menu': currentRoute.includes('/backoffice')}">
                <router-link 
                  to="/backoffice/dashboard" 
                  class="text-white text-xl font-cgothic inline-block"
                  @click="toggleMenu"
                >
                  BACKOFFICE
                </router-link>
              </li>
            </ul>
          </nav>

          <!-- Liens d'action en bas -->
          <div class="mt-auto pt-6 flex flex-col items-center space-y-4">
            <a 
              v-if="isUserLoggedIn" 
              @click="logout" 
              class="text-white font-semibold px-8 py-3 border-2 border-white rounded-full hover:bg-white hover:text-purple-fonce transition-colors duration-300 cursor-pointer"
            >
              SE DÉCONNECTER
            </a>
            <a 
              href="https://google.com" 
              class="text-purple font-semibold px-8 py-3 bg-white rounded-full hover:bg-grey-50 transition-colors duration-300"
            >
              SORTIE RAPIDE
            </a>
          </div>
        </div>
      </div>
    </transition>
  </aside>
</template>

<script>
export default {
  name: 'NavigationBarMobile',
  data() {
    return {
      menuOpen: false,
      isUserLoggedIn: localStorage.getItem("token") !== null
    };
  },
  computed: {
    currentRoute() {
      return this.$route.path;
    }
  },
  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen;
      // Empêcher le défilement du body quand le menu est ouvert
      document.body.style.overflow = this.menuOpen ? 'hidden' : '';
    },
    logout() {
      localStorage.removeItem("token");
      this.isUserLoggedIn = false;
      this.toggleMenu();
      this.$router.push('/');
    }
  },
  beforeUnmount() {
    // Restaurer le défilement quand le composant est détruit
    document.body.style.overflow = '';
  }
}
</script>

<style scoped>
/* Style de base */
.mobile-nav {
  position: relative;
  width: 100%;
  z-index: 50;
}

.nav-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 40;
}

/* Animation pour le menu overlay */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

/* Style des items du menu */
.menu-item {
  position: relative;
  display: inline-block;
  padding: 0.75rem 0;
}

.menu-item a {
  position: relative;
  transition: color 0.3s ease;
}

/* Effet de soulignement animé */
.menu-item a::after {
  content: "";
  position: absolute;
  bottom: -8px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: #f1b04c;
  transition: width 0.3s ease;
}

.menu-item:hover a::after {
  width: 60%;
}

.menu-item a:hover {
  color: #f1b04c;
}

/* Style pour le menu actif */
.active-menu a {
  color: lightgray;
}

.active-menu a::after {
  width: 60%;
  background-color: #f1b04c;
}

/* Style pour les coins arrondis et les effets d'ombre */
.menu-overlay {
  clip-path: circle(150% at 100% 0);
  animation: revealMenu 0.5s ease forwards;
}

@keyframes revealMenu {
  0% {
    clip-path: circle(0% at 90% 10%);
  }
  100% {
    clip-path: circle(150% at 50% 50%);
  }
}
</style>