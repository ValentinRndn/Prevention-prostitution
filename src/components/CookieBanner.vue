<template>
    <div v-if="isVisible" class="cookie-banner fixed flex flex-col items-center gap-4 justify-center bottom-0 left-0 w-fit bg-purple-fonce text-white p-6 z-100 max-w-[450px] rounded-lg">
      <span class="text-center text-white textShadow   font-bold text-xl">POUVONS-NOUS UTILISER LES COOKIES ?</span>
      <p class="max-w-full text-center text-grey text-lg font-semibold">
        Ce site utilise des cookies pour améliorer votre expérience de navigation. En continuant à utiliser ce site, vous acceptez notre utilisation des cookies conformément à notre politique de confidentialité.
      </p>
      <div class="flex-col items-center justify-center gap-4 ">
        <div class="choices-container flex w-full gap-12 mb-8">
          <div class="accept-container flex items-center gap-2 bg-white text-purple-fonce px-2 py-1 rounded w-fit rounded-r-full cursor-pointer" @click="acceptAll">
            <button class="text-xl">oui</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/></svg>
          </div>
          <div @click="openSettings" class="refuse-container flex items-center justify-center gap-2 bg-white text-purple-fonce px-2 py-1 rounded w-fit rounded-r-full cursor-pointer">
            <button class="text-xl">non</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"><path d="M5.47 5.47a.75.75 0 0 1 1.06 0l12 12a.75.75 0 1 1-1.06 1.06l-12-12a.75.75 0 0 1 0-1.06"/><path d="M18.53 5.47a.75.75 0 0 1 0 1.06l-12 12a.75.75 0 0 1-1.06-1.06l12-12a.75.75 0 0 1 1.06 0"/></g></svg>
          </div>
        </div>
        <button @click="openSettings" class="text-white text-center w-full underline font-semibold text-lg">Customiser</button>
      </div>
      <div v-if="showSettings" class="mt-4 p-4 rounded-lg text-grey w-full">
        <h3 class="font-bold text-xl text-center mb-4 text-white textShadow">GESTION DES COOKIES</h3>
        <div class="flex flex-col gap-4">
          <div class="flex items-center gap-2">
            <input type="checkbox" id="necessary" disabled checked class="accent-white" />
            <label for="necessary" class="text-lg">Cookies strictement nécessaires (toujours activés)</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="performance" v-model="cookieSettings.performance" class="accent-grey" />
            <label for="performance" class="text-lg">Cookies de performance</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="functionality" v-model="cookieSettings.functionality" class="accent-grey" />
            <label for="functionality" class="text-lg">Cookies de fonctionnalité (carte interactive)</label>
          </div>
          <div class="flex items-center gap-2">
            <input type="checkbox" id="advertising" v-model="cookieSettings.advertising" class="accent-grey" />
            <label for="advertising" class="text-lg">Cookies de publicité</label>
          </div>
        </div>
        <div class="flex justify-between gap-4 mt-4">
          <button @click="saveSettings" class="bg-white text-purple-fonce font-bold py-2 px-4 rounded-md  transition duration-200">SAUVEGARDER</button>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        isVisible: false,
        showSettings: false,
        cookieSettings: {
          performance: false,
          functionality: false,
          advertising: false,
        },
      };
    },
    methods: {
      checkCookieConsent() {
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
          this.isVisible = true;
        } else {
          this.cookieSettings = JSON.parse(consent);
          this.applyCookieSettings();
        }
      },
      acceptAll() {
        const settings = {
          performance: true,
          functionality: true,
          advertising: true,
        };
        localStorage.setItem('cookieConsent', JSON.stringify(settings));
        this.applyCookieSettings();
        this.isVisible = false;
      },
      openSettings() {
        this.showSettings = true;
        const consent = localStorage.getItem('cookieConsent');
        if (!consent) {
          this.cookieSettings = {
            performance: false,
            functionality: false,
            advertising: false,
          };
        }
      },
      saveSettings() {
        localStorage.setItem('cookieConsent', JSON.stringify(this.cookieSettings));
        this.applyCookieSettings();
        this.isVisible = false;
        this.showSettings = false;
      },
      rejectAll() {
        this.cookieSettings = {
          performance: false,
          functionality: false,
          advertising: false,
        };
        localStorage.setItem('cookieConsent', JSON.stringify(this.cookieSettings));
        this.applyCookieSettings();
        this.isVisible = false;
        this.showSettings = false;
      },
      applyCookieSettings() {
        if (this.cookieSettings.performance) {
          this.initializeAnalytics();
        } else {
          this.disableAnalytics();
        }
        if (this.cookieSettings.functionality) {
          this.initializeMap();
        } else {
          this.disableMap();
        }
        if (this.cookieSettings.advertising) {
          // Code pour gérer les publicités si applicable
        } else {
          this.disableAdvertising();
        }
      },
      initializeAnalytics() {
        console.log("Google Analytics initialized");
      },
      disableAnalytics() {
        console.log("Google Analytics disabled");
      },
      initializeMap() {
        console.log("Leaflet map initialized");
      },
      disableMap() {
        console.log("Leaflet map disabled");
      },
      disableAdvertising() {
        console.log("Advertising disabled");
      },
    },
    mounted() {
      this.checkCookieConsent();
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles if needed */
  </style>
  