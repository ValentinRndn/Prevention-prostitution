<template>
    <div v-if="isVisible" class="cookie-banner fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 z-50">
      <p>Nous utilisons des cookies pour améliorer votre expérience. En continuant à naviguer, vous acceptez notre utilisation des cookies.</p>
      <div class="flex gap-2 mt-4">
        <button @click="acceptAll" class="bg-green-500 px-4 py-2 rounded">Accepter tous les cookies</button>
        <button @click="openSettings" class="bg-blue-500 px-4 py-2 rounded">Gérer les préférences</button>
        <button @click="rejectAll" class="bg-red-500 px-4 py-2 rounded">Refuser tous les cookies</button>
      </div>
      <div v-if="showSettings" class="mt-4 p-4 bg-white text-black rounded">
        <h3>Gestion des cookies</h3>
        <div class="flex flex-col gap-2">
          <div>
            <input type="checkbox" id="necessary" disabled checked />
            <label for="necessary">Cookies strictement nécessaires (toujours activés)</label>
          </div>
          <div>
            <input type="checkbox" id="performance" v-model="cookieSettings.performance" />
            <label for="performance">Cookies de performance</label>
          </div>
          <div>
            <input type="checkbox" id="functionality" v-model="cookieSettings.functionality" />
            <label for="functionality">Cookies de fonctionnalité (carte interactive)</label>
          </div>
          <div>
            <input type="checkbox" id="advertising" v-model="cookieSettings.advertising" />
            <label for="advertising">Cookies de publicité</label>
          </div>
        </div>
        <div class="flex gap-4 mt-4">
          <button @click="saveSettings" class="bg-green-500 px-4 py-2 rounded">Sauvegarder mes choix</button>
          <button @click="rejectAll" class="bg-red-500 px-4 py-2 rounded">Refuser tous les cookies</button>
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
        // Désactive tous les cookies, sauf ceux strictement nécessaires
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
  .cookie-banner {
    background-color: rgba(0, 0, 0, 0.9);
  }
  </style>
  