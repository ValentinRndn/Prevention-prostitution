<template>
  <div class="page-container flex flex-col">
    <!-- Entête avec titre et introduction -->
    <div class="header-section py-12 px-6   ">
      <div class="max-w-5xl mx-auto text-center">
        <h1 class="text-4xl md:text-3xl font-bold text-grey mb-6 font-cgothic ">
          Carte des Professionnels de l'Accompagnement des Personnes en Situation de Prostitution en Normandie
        </h1>
        <p class="text-gray-700 text-lg leading-relaxed mb-8">
          Vous êtes un professionnel de la santé, du droit, du social ou de la protection et vous souhaitez mieux accompagner les Personnes en Situation de Prostitution (PSP) en Normandie ? Cette carte interactive vous permet d'identifier rapidement les structures spécialisées près de chez vous.
        </p>
      </div>
    </div>

    <!-- Section carte interactive -->
    <div class="map-container relative">
      <!-- Message de consentement des cookies si non acceptés -->
      <div v-if="!cookieAccepted" class="cookie-warning bg-white p-6 rounded-lg shadow-lg max-w-4xl mx-auto my-8 border-l-4 border-orange-500">
        <div class="flex items-start">
          <div class="mr-4 text-orange-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <div>
            <h3 class="font-bold text-xl text-gray-800 mb-2">Carte non disponible</h3>
            <p class="text-gray-600 mb-4">L'affichage de la carte nécessite votre consentement pour l'utilisation de cookies fonctionnels. Veuillez accepter les cookies pour accéder à toutes les fonctionnalités.</p>
            <button @click="acceptCookies" class="bg-purple-fonce hover:bg-purple text-white font-semibold py-2 px-4 rounded transition duration-300">
              Accepter les cookies fonctionnels
            </button>
          </div>
        </div>
      </div>

      <div class="map-section flex h-[1000px]  items-stretch md:flex-col " v-if="cookieAccepted">
        <div 
            :class="[
              'categories-container bg-grey h-full text-white md:text-black px-6 flex flex-col justify-start  md:bg-white  transition-all duration-300 p-4 md:h-fit',
              windowWidth <= 767 ? (categoryVisible ? 'h-full overflow-y-auto' : 'h-0') : 'h-full'
            ]"
          >
            <h1 
              v-if="windowWidth > 767 || categoryVisible" 
              class=" text-2xl font-bold mb-6 font-cgothic text-white md:hidden"
            >
              JE SOUHAITE :
            </h1>

            <!-- Bouton pour afficher/masquer les catégories sur mobile -->
            <span 
              class="hidden md:flex md:items-center cursor-pointer mb-4 md:w-fit font-semibold text-xl"
              @click="toggleVisibility"
            >
              {{ selectedCategories.length ? `${selectedCategories.length} catégories sélectionnées` : 'Catégories' }}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                :class="{rotatedIcon: categoryVisible}" 
                class="transition duration-200 " 
                width="24" 
                height="24" 
                viewBox="0 0 24 24"
              >
                <path fill="currentColor" d="M12 15.5l-6-6l1.41-1.41L12 12.67l4.59-4.58L18 9.5z"/>
              </svg>
            </span>

                    <!-- Boutons "Tout sélectionner" et "Tout désélectionner" -->
                    <div v-if="categoryVisible || windowWidth > 767" class="mb-4 flex gap-2">
                    <button 
                      @click="selectAllCategories" 
                      class="px-4 py-2 text-sm font-semibold bg-purple-fonce text-white rounded-full hover:bg-purple transition duration-300"
                    >
                      Tout sélectionner
                    </button>
                    <button 
                      @click="deselectAllCategories" 
                      class="px-4 py-2 text-sm font-semibold bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300 transition duration-300"
                    >
                      Tout désélectionner
                    </button>
                  </div>

          <!-- Liste des catégories -->
          <div 
            v-if="categoryVisible || windowWidth > 767" 
            class="checkboxes flex flex-col gap-4 font-poppins  text-xl  pr-2"
          >
            <div 
              v-for="(category, index) in categories" 
              :key="index" 
              class="flex gap-3 items-center p-2 rounded-md transition-all duration-300 hover:bg-gray-500 md:hover:bg-gray-100"
            >
              <input 
                :id="category.key" 
                type="checkbox" 
                :checked="selectedCategories.includes(category.key)" 
                @change="updateSelectedCategories(category.key)" 
                class="h-5 w-5 accent-purple-fonce"
              />
              <label :for="category.key" class="cursor-pointer flex-1">{{ category.label }}</label>
              <div 
                class="w-4 h-4 rounded-full" 
                :style="`background-color: ${iconColors[category.key]}`"
              ></div>
            </div>
          </div>

          <!-- Légende visible seulement en mode desktop -->
          <div class="mt-auto block md:hidden text-white md:text-black text-sm opacity-80 pt-4 pb-2">
            <p>Sélectionnez une ou plusieurs catégories pour afficher les structures correspondantes sur la carte.</p>
          </div>
        </div>
        
        <div id="map" class="h-full w-full md:h-[80vh] relative">
          <!-- Overlay de chargement -->
          <div v-if="isLoading" class="absolute inset-0 bg-white/80 flex items-center justify-center z-50" style="z-index: 9999">
            <div class="loading-spinner"></div>
          </div>

          <!-- Message si aucun marqueur n'est affiché -->
          <div v-if="!isLoading && markers.length === 0 && selectedCategories.length > 0" class="absolute inset-0 flex items-center justify-center pointer-events-none" style="z-index: 9999;">
            <!-- Overlay semi-transparent pour griser la carte -->
            <div class="absolute inset-0 bg-black/30"></div>
            
            <div class="bg-white p-5 rounded-lg shadow-lg text-center max-w-xs pointer-events-auto relative z-10">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 mx-auto text-orange-500 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              <p class="text-gray-700 font-medium">Aucune structure trouvée pour les catégories sélectionnées.</p>
              <p class="text-sm text-gray-500 mt-2">Essayez de sélectionner d'autres catégories.</p>
            </div>
          </div>
          <!-- Guide d'utilisation si aucune catégorie n'est sélectionnée -->
          <div v-if="!isLoading && showSearchGuide" class="absolute inset-0 flex items-center justify-center" style="z-index: 9999;">
          <!-- Overlay gris semi-transparent -->
          <div class="absolute inset-0 bg-black/50"></div>
          
          <div class="bg-white p-6 rounded-lg shadow-md text-center max-w-sm relative z-10">
            <!-- Bouton fermer -->
            <button @click="closeSearchGuide" class="absolute top-2 right-2 text-gray-500 hover:text-gray-800 transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto text-purple-fonce mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 class="font-bold text-lg text-gray-800 mb-2">Commencez votre recherche</h3>
            <p class="text-gray-600 mb-3">Sélectionnez une ou plusieurs catégories sur la gauche pour afficher les structures correspondantes sur la carte.</p>
            <button @click="selectRecommendedCategories" class="bg-purple-fonce hover:bg-purple text-white font-semibold py-2 px-4 rounded transition duration-300">
              Sélection recommandée
            </button>
          </div>
        </div>

          <!-- Transition et popup pour afficher la structure sélectionnée -->
          <transition name="slide-in">
            <div v-if="selectedStructure" class="structure-popup">
              <div class="popup-content flex flex-col gap-5 items-start p-6">
                <div class="flex justify-between w-full items-center">
                  <button @click="closePopup" class="close-btn absolute left-2">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
                <h2 class="text-xl font-bold text-purple-fonce mt-6">{{ selectedStructure.antenna }}</h2>
                <div class="structure-info">
                  <div class="mb-4">
                    <h3 class="text-sm text-gray-500 uppercase mb-1">Adresse</h3>
                    <p class="text-base">{{ selectedStructure.address }}</p>
                  </div>
                  <div class="mb-4">
                    <h3 class="text-sm text-gray-500 uppercase mb-1">Téléphone</h3>
                    <p class="text-base text-purple-fonce font-bold">{{ selectedStructure.phone }}</p>
                  </div>
                  <div v-if="selectedStructure.email">
                    <h3 class="text-sm text-gray-500 uppercase mb-1">Email</h3>
                    <p class="text-base">{{ selectedStructure.email }}</p>
                  </div>
                </div>
                <div class="mt-4 flex justify-between w-full">
                  <a v-if="selectedStructure.website" :href="selectedStructure.website" target="_blank" class="text-purple hover:underline text-sm flex items-center">
                    <span>Visiter le site web</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <button class="text-gray-500 hover:text-purple text-sm flex items-center" @click="getDirections">
                    <span>Itinéraire</span>
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </div>

    <!-- Sections d'information -->
    <div class="max-w-6xl mx-auto px-6 py-12">
      <div class="info-card bg-purple-fonce/5 p-6 rounded-lg border-l-4 border-purple-fonce mb-10 shadow-md">
        <h2 class="text-2xl font-semibold text-purple-fonce mb-4">
          Pourquoi une Cartographie des Professionnels ?
        </h2>
        <p class="text-gray-700 mb-4">
          La prise en charge des Personnes en Situation de Prostitution nécessite une approche pluridisciplinaire. Grâce à cette cartographie, vous pourrez :
        </p>
        <ul class="space-y-2 text-gray-700">
          <li class="flex items-start">
            <svg class="w-5 h-5 text-purple-fonce mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Repérer les acteurs locaux : associations, services de santé, dispositifs sociaux, structures d'accompagnement juridique.</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-purple-fonce mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Faciliter l'orientation et la mise en réseau : en tant que professionnel, vous pouvez collaborer avec d'autres intervenants pour offrir un suivi complet et adapté.</span>
          </li>
          <li class="flex items-start">
            <svg class="w-5 h-5 text-purple-fonce mt-1 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
            </svg>
            <span>Accéder rapidement aux ressources : coordonnées, domaines d'intervention et services proposés par chaque organisme.</span>
          </li>
        </ul>
      </div>
      
      <div class="grid grid-cols-1  gap-6 mb-10">
        <div class="bg-white rounded-lg  p-5 border-t-4 border-purple-fonce shadow-md">
          <h2 class="text-xl font-semibold text-purple-fonce mb-3">
            Quels Types de Professionnels y Trouver ?
          </h2>
          <ul class="space-y-3 text-gray-700">
            <li class="flex items-start">
              <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-fonce text-white font-bold mr-3 flex-shrink-0">1</span>
              <span><strong class="text-purple">Services de santé :</strong> consultations médicales, dépistage des infections sexuellement transmissibles (IST), accompagnement psychologique.</span>
            </li>
            <li class="flex items-start">
              <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-fonce text-white font-bold mr-3 flex-shrink-0">2</span>
              <span><strong class="text-purple">Structures sociales et associatives :</strong> accompagnement administratif, soutien à la réinsertion sociale et professionnelle.</span>
            </li>
            <li class="flex items-start">
              <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-fonce text-white font-bold mr-3 flex-shrink-0">3</span>
              <span><strong class="text-purple">Professionnels du droit :</strong> avocats, juristes spécialisés en protection des droits des Personnes en Situation de Prostitution.</span>
            </li>
            <li class="flex items-start">
              <span class="inline-flex items-center justify-center h-6 w-6 rounded-full bg-purple-fonce text-white font-bold mr-3 flex-shrink-0">4</span>
              <span><strong class="text-purple">Dispositifs d'hébergement et d'accueil :</strong> solutions d'urgence ou de long terme pour favoriser une sortie de la prostitution.</span>
            </li>
          </ul>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-5 border-t-4 border-purple-fonce flex flex-col justify-between">
          <div>
            <p class="text-lg text-gray-700 mb-5">
              Pour mieux accompagner les personnes en situation de prostitution, utilisez cette carte interactive afin de trouver rapidement les ressources disponibles dans votre région.
            </p>
            <p class="text-sm text-gray-600 italic mb-4">
              Notez que toutes les structures référencées sont régulièrement mises à jour pour garantir la fiabilité des informations.
            </p>
          </div>
          <div class="text-center">
            <button @click="scrollToMap" class="bg-purple-fonce hover:bg-purple text-white font-bold py-3 px-6 rounded-lg transition duration-300 shadow-sm flex items-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
              Explorer la carte
            </button>
          </div>
        </div>
      </div>
      <div class="mb-4">
          <h2 class="text-lg font-semibold text-gray-800">
            Dispositif National d'Accueil et de Protection des victimes de la traite "Ac.Sé"
          </h2>
          <p class="text-gray-700 mb-2">
            Il a pour mission la mise en sécurité, par un éloignement géographique, les personnes victimes de traite des êtres humains ou de proxénétisme. Nous ne pouvons pas communiquer la liste des partenaires qui accueillent ces personnes.
          </p>
          <p class="text-gray-700 mb-2">
            Néanmoins, Ac.Sé étant un pôle ressource pour toutes les questions en lien avec la traite et le proxénétisme, vous trouverez ci-dessous les coordonnées mail et téléphoniques, afin de répondre à vos questions.
          </p>
          <p class="text-gray-700 mb-2">
            Leur ligne téléphonique est ouverte à toutes personnes, professionnels, particuliers et victimes.
          </p>
          <p class="text-gray-700">
            <span class="font-semibold"><a href="tel:0492151051">04 92 15 10 51</a></span> / <a href="mailto:ac.se@association-alc.org" class="text-purple-fonce">ac.se@association-alc.org</a>
          </p>
        </div>
    </div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import NavigationBar from "../../components/NavigationBar.vue";
import NavigationBarMobile from "../../components/NavigationBarMobile.vue";
import { getAllStructures } from "../../services/StructuresService";

// Couleurs pour chaque catégorie
const iconColors = {
  "category-12": "#6B7280", // grey
  "category-13": "#EF4444", // red
  "category-14": "#F97316", // orange
  "category-15": "#22C55E", // green
  "category-16": "#06B6D4", // cyan/aqua
  "category-17": "#3B82F6", // blue
  "category-18": "#8B5CF6", // purple
  "category-19": "#D946EF", // fuchsia
  "category-20": "#DA70D6", // orchid
  "category-21": "#9ACD32", // yellowgreen
  "category-22": "#FFD700", // gold
  "category-23": "#008080",  // teal
  "category-24": "#FF6347", // tomato
};

function createIcon(color) {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        position: relative; 
        width: 32px; 
        height: 32px; 
        background-color: ${color}; 
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 3px 8px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s ease-out;
        ">
        <span style="
          width: 10px; 
          height: 10px; 
          background-color: white; 
          border-radius: 50%;
        "></span>
      </div>
      <div style="
        position: absolute; 
        bottom: -8px; 
        left: 50%; 
        width: 0; 
        height: 0; 
        border-top: 10px solid ${color}; 
        border-left: 5px solid transparent;
        border-right: 5px solid transparent;
        transform: translateX(-50%);
      "></div>
    `,
    iconSize: [32, 44],
    iconAnchor: [16, 44],
  });
}

export default {
  data() {
    return {
      map: null,
      categoryVisible: false,
      windowWidth: window.innerWidth,
      cookieAccepted: false,
      isLoading: true,
      categories: [
        { key: "category-12", label: "Une structure d'accès aux soins" },
        { key: "category-13", label: "Une structures d'accès aux droits de santé" },
        { key: "category-14", label: "Une structure proposant des dépistages" },
        { key: "category-15", label: "Un service d'urgence" },
        { key: "category-16", label: "Une structure d'écoute" },
        { key: "category-17", label: "Une structure en santé sexuelle" },
        { key: "category-18", label: "Une structure communautaire" },
        { key: "category-19", label: "Une structure d'accompagnement psychologique" },
        // { key: "category-20", label: "Une association accompagnant la sortie d'un réseau d'exploitation sexuelle" },
        { key: "category-21", label: "Un structure d'aller-vers, de prévention par la réduction des risques et d'accompagnement" },
        { key: "category-22", label: "Une structure de prévention et réduction des risques pour les usagers de drogues" },
        { key: "category-23", label: "Un commissariat" },
        { key: "category-24", label: "Une structure d'aller-vers, de prévention par la réduction des risques et d'accompagnement des personnes en situation de    "},

      ],
      selectedCategories: [],
      structures: [],
      markers: [],
      selectedMarker: null,
      selectedStructure: null,
      showPopup: false,
      showSearchGuide: true,
      iconColors
    };
  },
  components: {
    NavigationBar,
    NavigationBarMobile,
  },
  methods: {
    closeSearchGuide() {
    this.showSearchGuide = false;
  },
  
    toggleVisibility() {
      this.categoryVisible = !this.categoryVisible;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth > 768) {
        this.categoryVisible = true;
      }
    },
    acceptCookies() {
      localStorage.setItem('cookieConsent', JSON.stringify({ functionality: true }));
      this.cookieAccepted = true;
      this.$nextTick(() => {
        this.initMap();
      });
    },
    initMap() {
      this.isLoading = true;
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        this.map = L.map(mapContainer, {
          zoomControl: false, // Désactiver le contrôle de zoom par défaut
        }).setView([49.183333, -0.35], 10);
        
        // Ajouter le contrôle de zoom en haut à droite
        L.control.zoom({
          position: 'topright'
        }).addTo(this.map);
        
        L.tileLayer("https://cartodb-basemaps-a.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="https://carto.com/attributions">CARTO</a> &mdash; ' +
            'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(this.map);
        
        this.showStructures();
      }
    },
    async showStructures() {
      try {
        const structures = await getAllStructures();
        this.structures = structures;
        this.isLoading = false;
        
        // Si aucune catégorie n'est sélectionnée, on n'affiche pas les marqueurs
        if (this.selectedCategories.length > 0) {
          this.addMarkers();
        }
      } catch (error) {
        console.error('Error fetching structures:', error);
        this.isLoading = false;
      }
    },
    updateSelectedCategories(categoryKey) {
      if (this.selectedCategories.includes(categoryKey)) {
        this.selectedCategories = this.selectedCategories.filter(id => id !== categoryKey);
      } else {
        this.selectedCategories.push(categoryKey);
      }
      this.removeMarkers();
      this.addMarkers();
    },
    selectAllCategories() {
      this.selectedCategories = this.categories.map(cat => cat.key);
      this.removeMarkers();
      this.addMarkers();
    },
    deselectAllCategories() {
      this.selectedCategories = [];
      this.removeMarkers();
      this.closePopup();
    },
    selectRecommendedCategories() {
      // Sélection des catégories les plus pertinentes (exemple)
      this.selectedCategories = [
        "category-13",
        "category-16",
        "category-19",
        "category-20"
      ];
      this.removeMarkers();
      this.addMarkers();
      this.closeSearchGuide();
    },
    removeMarkers() {
      if (this.map) {
        this.markers.forEach(marker => {
          this.map.removeLayer(marker);
        });
        this.markers = [];
      }
    },
    addMarkers() {
  if (!this.map) return;
  
  let markersAdded = 0;
  let structuresWithSelectedCategories = 0;
  
  this.structures.forEach(structure => {
    // Vérifions si la structure a des catégories qui correspondent à notre sélection
    let shouldAddMarker = false;
    
    // Vérifier d'abord le tableau categories (nouvelle version)
    if (structure.categories && Array.isArray(structure.categories)) {
      shouldAddMarker = structure.categories.some(cat => 
        this.selectedCategories.includes(cat)
      );
      
      if (shouldAddMarker) {
        structuresWithSelectedCategories++;
      }
    } 
    
    // Si aucune correspondance trouvée dans le tableau, vérifier le champ category (ancienne version)
    if (!shouldAddMarker && structure.category) {
      shouldAddMarker = this.selectedCategories.includes(structure.category);
      
      if (shouldAddMarker) {
        structuresWithSelectedCategories++;
      }
    }
    
    if (structure.gps && shouldAddMarker) {
      const [lat, lon] = structure.gps.split(',').map(coord => parseFloat(coord.trim()));
      
      if (!isNaN(lat) && !isNaN(lon)) {
        // Déterminer quelle catégorie utiliser pour la couleur
        let categoryForColor;
        
        // Si la structure a plusieurs catégories, prendre la première catégorie sélectionnée
        if (structure.categories && Array.isArray(structure.categories)) {
          categoryForColor = structure.categories.find(cat => this.selectedCategories.includes(cat));
        }
        
        // Si aucune catégorie trouvée dans le tableau ou si le tableau n'existe pas, utiliser le champ category
        if (!categoryForColor) {
          categoryForColor = structure.category;
        }
        
        // Si toujours pas de catégorie, utiliser une catégorie par défaut
        if (!categoryForColor || !iconColors[categoryForColor]) {
          categoryForColor = "category-12"; // Catégorie par défaut
        }
        
        const color = iconColors[categoryForColor];
        const icon = createIcon(color);
        const marker = L.marker([lat, lon], { icon }).addTo(this.map);
        
        // Ajouter une propriété personnalisée au marqueur
        marker.structureData = structure;
        
        marker.on('click', () => {
          this.selectedStructure = structure;
          this.selectedMarker = marker;
          
          // Centrer la carte sur le marqueur avec une animation
          this.map.flyTo([lat, lon], 13, {
            animate: true,
            duration: 0.5
          });
        });
        
        this.markers.push(marker);
        markersAdded++;
      } else {
        console.warn("Coordonnées GPS invalides:", structure.antenna, structure.gps);
      }
    }
  });
  
  
  // Ajuster la vue de la carte pour englober tous les marqueurs
  if (this.markers.length > 0) {
    const group = L.featureGroup(this.markers);
    this.map.fitBounds(group.getBounds(), {
      padding: [50, 50]
    });
  }
},
    closePopup() {
      this.selectedStructure = null;
      this.selectedMarker = null;
    },
    getDirections() {
      if (!this.selectedStructure || !this.selectedStructure.gps) return;
      
      const [lat, lon] = this.selectedStructure.gps.split(',');
      const url = `https://www.google.com/maps/dir/?api=1&destination=${lat},${lon}`;
      window.open(url, '_blank');
    },
    scrollToMap() {
      const mapSection = document.querySelector('.map-section');
      if (mapSection) {
        mapSection.scrollIntoView({ behavior: 'smooth' });
      }
    },
    checkCookieConsent() {
      const consent = localStorage.getItem('cookieConsent');
      if (consent) {
        try {
          const parsed = JSON.parse(consent);
          if (parsed && parsed.functionality) {
            this.cookieAccepted = true;
            this.$nextTick(() => {
              this.initMap();
            });
          }
        } catch (e) {
          console.error('Error parsing cookie consent', e);
        }
      }
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    this.checkCookieConsent();
    
    // Si pas de cookie après 2 secondes, on affiche quand même les sections informatives
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
    
    // Définir categoryVisible sur true pour les écrans larges
    if (window.innerWidth > 768) {
      this.categoryVisible = true;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>

<style scoped>

.popup-instruction {
  z-index: 1500;

}

.search-guide-container > div {
  background-color: rgba(255, 255, 255, 0.95);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.map-container {
  position: relative;
}

.checkbox {
  transition: all 0.3s ease;
  cursor: pointer;
  border-radius: 0.375rem;
  padding: 0.5rem;
}

.checkbox:hover {
  background-color: rgba(106, 27, 154, 0.05);
}

.checkbox label {
  cursor: pointer;
  user-select: none;
}

input[type="checkbox"] {
  cursor: pointer;
  height: 1.25rem;
  width: 1.25rem;
  border-radius: 0.25rem;
}

.structure-popup {
  position: absolute;
  top: 0;
  right: 0;
  width: 300px;
  height: 100%;
  background-color: white;
  border-left: 1px solid #e5e7eb;
  box-shadow: -4px 0 15px rgba(0, 0, 0, 0.1);
  z-index: 600;
  overflow-y: auto;
}

.slide-in-enter-active,
.slide-in-leave-active {
  transition: transform 0.3s ease-out;
}

.slide-in-enter-from,
.slide-in-leave-to {
  transform: translateX(100%);
}

.color-tag {
  width: 8px;
  height: 24px;
  border-radius: 4px;
}

.close-btn {
  color: #6B7280;
  transition: color 0.2s;
  background-color: white;
}

.close-btn:hover {
  color: #111827;
}

.structure-info {
  width: 100%;
  background-color: #F9FAFB;
  border-radius: 8px;
  padding: 12px;
}

.rotatedIcon {
  transform: rotate(180deg);
}

/* Barre de défilement personnalisée pour les catégories */
.checkboxes::-webkit-scrollbar {
  width: 6px;
}

.checkboxes::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 8px;
}

.checkboxes::-webkit-scrollbar-thumb {
  background: #d1d5db;
  border-radius: 8px;
}

.checkboxes::-webkit-scrollbar-thumb:hover {
  background: #9CA3AF;
}

/* Loading spinner */
.loading-spinner {
  width: 40px;
  height: 40px;
  border: 4px solid #e5e7eb;
  border-top: 4px solid #f1b04c;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Styles pour les catégories avec couleurs correspondantes */
#category-12 { accent-color: #6B7280; }
#category-13 { accent-color: #EF4444; }
#category-14 { accent-color: #F97316; }
#category-15 { accent-color: #22C55E; }
#category-16 { accent-color: #06B6D4; }
#category-17 { accent-color: #3B82F6; }
#category-18 { accent-color: #8B5CF6; }
#category-19 { accent-color: #D946EF; }
#category-20 { accent-color: #DA70D6; }
#category-21 { accent-color: #9ACD32; }
#category-22 { accent-color: #FFD700; }
#category-23 { accent-color: #008080; }
#category-24 { accent-color: #FF6347; }

@media (max-width: 768px) {
  .structure-popup {
    width: 100%;
    height: auto;
    max-height: 60%;
    top: auto;
    bottom: 0;
    border-top: 1px solid #e5e7eb;
    border-left: none;
    border-radius: 16px 16px 0 0;
  }
  
  .map-section {
    flex-direction: column-reverse;
  }
  
  .categories-container {
    border-top: 1px solid #e5e7eb;
  }
}
</style>