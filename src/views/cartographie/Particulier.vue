<template>
  <div class="page-container flex h-[700px] items-center md:flex-col ">
    <div class="categories-container bg-grey md:w-[1/3] h-full px-6 flex flex-col justify-center md:h-fit md:w-full md:bg-white md:text-black">
      <h1 class="text-white text-2xl font-bold mb-6 font-cgothic md:hidden">JE SOUHAITE :</h1>
      
      <!-- Bouton pour afficher/masquer les catégories sur mobile -->
      <span class="hidden md:flex md:items-center text-black cursor-pointer mb-4 md:w-fit font-semibold text-xl " @click="toggleVisibility">
        Catégories 
        <svg xmlns="http://www.w3.org/2000/svg" :class="{rotatedIcon : categoryVisible}" class="transition duration-200" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 15.5l-6-6l1.41-1.41L12 12.67l4.59-4.58L18 9.5z"/>
        </svg>
      </span>

      <!-- Liste des catégories -->
      <div v-if="categoryVisible || windowWidth > 768" class="checkboxes flex flex-col gap-4 font-poppins text-white text-xl md:text-black ">
        <div class="checkbox flex gap-3 items-center" v-for="(label, index) in categories" :key="index">
          <input :id="`category-${index}`" type="checkbox" @change="updateSelectedCategories" />
          <label :for="`category-${index}`">{{ label }}</label>
        </div>
      </div>
    </div>
    <div id="map" class="h-full w-full md:h-[80vh]"></div>

    <!-- Transition et popup pour afficher la structure sélectionnée -->
    <transition name="slide-in">
      <div v-if="selectedStructure" class="structure-popup">
        <div class="popup-content flex flex-col gap-5 items-center justify-center font-cgothic">
          <img @click="closePopup" class="absolute top-5 left-5 w-[20px] cursor-pointer" src="../../assets/map/close-popup.png" alt="hide_arrow">
          <h2 class="text-3xl text-center font-bold mt-10 text-purple-fonce">{{ selectedStructure.antenna }}</h2>
          <p class="text-2xl text-center font-semibold">{{ selectedStructure.address }}</p>
          <p class="text-2xl text-purple-fonce font-bold">{{ selectedStructure.phone }}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import NavigationBar from "../../components/NavigationBar.vue";
import NavigationBarMobile from "../../components/NavigationBarMobile.vue";
import { getAllStructures } from "../../services/StructuresService";
import { iconColors, createIcon } from "../../services/IconMap";

export default {
  data() {
    return {
      map: null,
      categoryVisible: false,
      windowWidth: window.innerWidth,
      categories: [
        "Trouver des préservatifs ou du lubrifiant",
        "Me faire dépister",
        "Accéder à un traitement d’urgence",
        "Accéder à la PReP",
        "Voir un médecin",
        "Interrompre une grossesse",
        "Trouver du matériel de drogue à moindre risque",
        "Trouver un soutien communautaire",
        "Porter plainte",
        "Parler à quelqu’un après une agression"
      ],
      selectedCategories: [],
      structures: [],
      markers: [],
      selectedMarker: null,
      selectedStructure: null,
    };
  },
  components: {
    NavigationBar,
    NavigationBarMobile,
  },
  methods: {
    toggleVisibility() {
      this.categoryVisible = !this.categoryVisible;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.categoryVisible = this.windowWidth > 768;
    },
    initMap() {
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        this.map = L.map(mapContainer).setView([49.183333, -0.35], 13);
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
        this.addMarkers();
      } catch (error) {
        console.error('Error fetching structures:', error);
      }
    },
    updateSelectedCategories() {
      this.selectedCategories = [];
      const checkboxes = document.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
          this.selectedCategories.push(checkbox.id);
        }
      });
      this.removeMarkers();
      this.addMarkers();
    },
    removeMarkers() {
      this.markers.forEach(marker => {
        this.map.removeLayer(marker);
      });
      this.markers = [];
    },
    addMarkers() {
      this.structures.forEach(structure => {
        if (structure.gps && this.selectedCategories.includes(structure.category)) {
          const [lat, lon] = structure.gps.split(',').map(coord => parseFloat(coord));
          if (!isNaN(lat) && !isNaN(lon)) {
            const color = iconColors[structure.category];
            const icon = createIcon(color); 
            const marker = L.marker([lat, lon], { icon }).addTo(this.map);
            marker.on('click', () => {
              this.selectedStructure = structure;
              this.updateMarkerStyles(marker);
            });
            this.markers.push(marker);
          } else {
            console.warn('Invalid coordinates for structure:', structure);
          }
        }
      });
    },
    updateMarkerStyles(clickedMarker) {
      if (this.selectedMarker) {
        L.DomUtil.removeClass(this.selectedMarker._icon, 'custom-icon-selected');
      }
      L.DomUtil.addClass(clickedMarker._icon, 'custom-icon-selected');
      this.selectedMarker = clickedMarker;
    },
    closePopup() {
      this.selectedStructure = null;
      if (this.selectedMarker) {
        L.DomUtil.removeClass(this.selectedMarker._icon, 'custom-icon-selected');
        this.selectedMarker = null;
      }
    },
    checkCookieConsent() {
      const consent = JSON.parse(localStorage.getItem('cookieConsent'));
      if (consent && consent.functionality) {
        this.cookieAccepted = true;
        this.$nextTick(() => {
          this.initMap();
        });
      }
    },
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);
    this.checkCookieConsent();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
};
</script>
<style scoped>
  .map-container {
    position: relative;
  }

  .structure-popup {
    position: absolute;
    top: 0;
    right: 0;
    width: 300px;
    height: 100%;
    background-color: white;
    border-left: 2px solid #ddd;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.2);
    transform: translateX(100%);
    transition: transform 0.3s ease-in-out;
    z-index: 1000;
  }

  /* Animation de glissement pour la popup */
  .slide-in-enter-active,
  .slide-in-leave-active {
    transition: transform 0.3s ease-in-out;
  }

  .slide-in-enter-from {
    transform: translateX(100%);
  }

  .slide-in-enter-to {
    transform: translateX(0);
  }

  .slide-in-leave-from {
    transform: translateX(0);
  }

  .slide-in-leave-to {
    transform: translateX(100%);
  }

  /* Style du contenu de la popup */
  .popup-content {
    position: relative;
    padding: 20px;
    z-index: 1001;
  }

  .popup-content img {
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
  }
</style>
