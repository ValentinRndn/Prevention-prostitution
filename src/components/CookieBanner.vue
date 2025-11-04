<template>
    <div v-if="isVisible" class="cookie-banner fixed flex flex-col items-center gap-4 justify-center bottom-0 left-0 w-fit bg-purple-fonce text-white p-6 z-20 max-w-[450px] rounded-lg m-4">
      <span class="text-center text-white textShadow font-bold text-xl">POUVONS-NOUS UTILISER LES COOKIES ?</span>
      <p class="max-w-full text-center text-grey text-lg font-semibold">
        Ce site utilise des cookies pour améliorer votre expérience de navigation. En continuant à utiliser ce site, vous acceptez notre utilisation des cookies conformément à notre
        <router-link to="/legalNotices" class="underline text-white hover:text-purple">politique de confidentialité</router-link>.
      </p>
      <div class="flex-col items-center justify-center gap-4 ">
        <div class="choices-container flex w-full gap-12 mb-8">
          <div class="accept-container flex items-center gap-2 bg-white text-purple-fonce px-2 py-1 rounded w-fit rounded-r-full cursor-pointer" @click="acceptAll">
            <button class="text-xl">oui</button>
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m9.55 18l-5.7-5.7l1.425-1.425L9.55 15.15l9.175-9.175L20.15 7.4z"/></svg>
          </div>
          <div @click="rejectAll" class="refuse-container flex items-center justify-center gap-2 bg-white text-purple-fonce px-2 py-1 rounded w-fit rounded-r-full cursor-pointer">
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
          advertising: false, // Pas de pub sur le site
        };
        localStorage.setItem('cookieConsent', JSON.stringify(settings));
        this.cookieSettings = settings;
        this.applyCookieSettings();
        this.isVisible = false;
        this.showSettings = false;
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
        // Gestion de Google Analytics
        if (this.cookieSettings.performance) {
          this.initializeAnalytics();
        } else {
          this.disableAnalytics();
        }

        // Gestion de Leaflet (carte interactive)
        if (this.cookieSettings.functionality) {
          this.enableLeafletMap();
        } else {
          this.disableLeafletMap();
        }

        // Emit event pour informer l'app du changement de consentement
        window.dispatchEvent(new CustomEvent('cookie-consent-changed', {
          detail: this.cookieSettings
        }));
      },

      // === GOOGLE TAG MANAGER ===
      initializeAnalytics() {
        const currentPath = window.location.pathname;
        console.log("Google Tag Manager: Tentative d'initialisation sur", currentPath);

        // Ne pas tracker les pages du backoffice
        if (currentPath.startsWith('/backoffice')) {
          console.log("Google Tag Manager: Désactivé pour le backoffice");
          return;
        }

        // Vérifier si GTM est déjà chargé
        if (window.dataLayer) {
          console.log("Google Tag Manager: Déjà chargé, activation du tracking");
          window.dataLayer.push({
            'event': 'cookie_consent_granted',
            'consent': {
              'analytics_storage': 'granted',
              'ad_storage': 'denied'
            }
          });
          return;
        }

        console.log("Google Tag Manager: Chargement du script GTM...");

        // Charger Google Tag Manager
        const GTM_ID = 'GTM-TG55LTR2';

        // Initialiser dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          'gtm.start': new Date().getTime(),
          event: 'gtm.js'
        });

        // Créer le script GTM
        const gtmScript = document.createElement('script');
        gtmScript.async = true;
        gtmScript.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`;
        gtmScript.id = 'gtm-script';

        // Ajouter le script au head
        const firstScript = document.getElementsByTagName('script')[0];
        firstScript.parentNode.insertBefore(gtmScript, firstScript);

        // Push consent event
        window.dataLayer.push({
          'event': 'cookie_consent_granted',
          'consent': {
            'analytics_storage': 'granted',
            'ad_storage': 'denied'
          }
        });

        console.log("Google Tag Manager: Initialisé avec consentement");
      },

      disableAnalytics() {
        if (window.dataLayer) {
          // Désactiver le tracking via dataLayer
          window.dataLayer.push({
            'event': 'cookie_consent_denied',
            'consent': {
              'analytics_storage': 'denied',
              'ad_storage': 'denied'
            }
          });
          console.log("Google Tag Manager: Tracking désactivé");
        }

        // Supprimer les cookies Google Analytics et GTM
        this.deleteCookie('_ga');
        this.deleteCookie('_gid');
        this.deleteCookie('_gat');
        this.deleteCookie('_gat_gtag_' + 'GTM_TG55LTR2');
      },

      // === LEAFLET MAP ===
      enableLeafletMap() {
        // Stocker le consentement pour Leaflet (carte interactive)
        // Les vues de cartographie vérifient déjà cookieConsent.functionality
        console.log("Leaflet Map: Autorisée (consentement accordé)");
      },

      disableLeafletMap() {
        console.log("Leaflet Map: Désactivée (consentement refusé)");
        // La carte ne se chargera pas car les vues vérifient cookieConsent.functionality
      },

      // === UTILITAIRES ===
      deleteCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=.' + window.location.hostname + ';';
      },

      disableAdvertising() {
        // Pas de publicité sur ce site pour l'instant
        console.log("Publicités: Désactivées (pas de pub sur le site)");
      },

      handleRouteChange() {
        const consent = localStorage.getItem('cookieConsent');
        if (consent) {
          const settings = JSON.parse(consent);
          if (settings.performance) {
            const currentPath = window.location.pathname;

            // Si on est sur le backoffice, s'assurer que le tracking est désactivé
            if (currentPath.startsWith('/backoffice')) {
              this.disableAnalytics();
            }
            // Sinon, s'assurer que le tracking est activé
            else if (window.dataLayer) {
              // Ne réactiver que si dataLayer existe déjà
              window.dataLayer.push({
                'event': 'cookie_consent_granted',
                'consent': {
                  'analytics_storage': 'granted',
                  'ad_storage': 'denied'
                }
              });
            }
          }
        }
      },
    },
    mounted() {
      this.checkCookieConsent();

      // Surveiller les changements de route pour activer/désactiver GTM
      // Utiliser un observer sur l'historique plutôt que le router
      const originalPushState = window.history.pushState;
      const originalReplaceState = window.history.replaceState;
      const self = this;

      window.history.pushState = function(...args) {
        originalPushState.apply(this, args);
        self.handleRouteChange();
      };

      window.history.replaceState = function(...args) {
        originalReplaceState.apply(this, args);
        self.handleRouteChange();
      };

      // Écouter également les événements popstate
      window.addEventListener('popstate', () => {
        self.handleRouteChange();
      });
    },
  };
  </script>
  
  <style scoped>
  /* Add your custom styles if needed */
  </style>
  