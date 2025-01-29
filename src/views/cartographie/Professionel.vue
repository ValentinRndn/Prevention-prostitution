<template>
  <div class="page-container flex h-[700px] items-center md:flex-col ">
    <div class="categories-container bg-grey h-full px-6 flex flex-col justify-center md:h-fit md:w-full md:bg-white md:text-black">
      <h1 class="text-white text-2xl font-bold mt-6 font-cgothic md:hidden">JE RECHERCHE :</h1>
      
    <!-- Bouton pour afficher/masquer les catégories sur mobile -->
    <span 
      class="hidden md:flex md:items-center text-black cursor-pointer mb-4 md:w-fit font-semibold text-xl"
      @click="toggleVisibility"
    >
      {{ selectedCategories.length ? `${selectedCategories.length} catégories sélectionnées` : 'Catégories' }}
      <svg xmlns="http://www.w3.org/2000/svg" :class="{rotatedIcon: categoryVisible}" class="transition duration-200" width="24" height="24" viewBox="0 0 24 24">
        <path fill="currentColor" d="M12 15.5l-6-6l1.41-1.41L12 12.67l4.59-4.58L18 9.5z"/>
      </svg>
    </span>

    <!-- Liste des catégories -->
    <div class="categories-container bg-grey h-full px-6 flex flex-col justify-center md:h-fit md:w-full md:bg-white md:text-black">
    <!-- ... reste du code ... -->
    <div v-if="categoryVisible || windowWidth > 768" class="checkboxes relative flex flex-col gap-4 font-poppins text-white text-xl md:text-black">
      <div class="checkbox flex gap-3 items-center" v-for="(category, index) in categories" :key="index">
        <input 
          :id="category.key" 
          type="checkbox" 
          :checked="selectedCategories.includes(category.key)" 
          @change="updateSelectedCategories(category.key)" 
        />
        <label :for="category.key">{{ category.label }}</label>
      </div>
    </div>
  </div>

    </div>
    <div id="map" class="h-full w-full md:h-[80vh]">

    <!-- Transition et popup pour afficher la structure sélectionnée -->
    <transition name="slide-in">
      <div v-if="selectedStructure" class="structure-popup">
        <div class="popup-content flex flex-col gap-5 items-center justify-center font-cgothic">
          <img @click="closePopup" class="absolute top-5 left-5 w-[20px] cursor-pointer" src="../../assets/map/close-popup.png" alt="hide_arrow">
          <h2 class="text-3xl text-center font-bold mt-10 text-purple-fonce md:text-xl">{{ selectedStructure.antenna }}</h2>
          <p class="text-2xl text-center font-semibold md:text-xl">{{ selectedStructure.address }}</p>
          <p class="text-2xl text-purple-fonce font-bold md:text-xl">{{ selectedStructure.phone }}</p>
        </div>
      </div>
    </transition>
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
  "category-12": "grey",
  "category-13": "red",
  "category-14": "orange",
  "category-15": "green",
  "category-16": "aqua",
  "category-17": "blue",
  "category-18": "purple",
  "category-19": "fuchsia",
  "category-20": "orchid",
  "category-21": "yellowgreen",
  "category-22": "gold",
  "category-23": "teal"
};

function createIcon(color) {
  return L.divIcon({
    className: "custom-marker",
    html: `
      <div style="
        position: relative; 
        width: 30px; 
        height: 30px; 
        background-color: ${color}; 
        border: 2px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
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
    iconSize: [30, 42],
    iconAnchor: [15, 42],
  });
}

export default {
  data() {
    return {
      map: null,
      categoryVisible: false,
      windowWidth: window.innerWidth,
      categories: [
        { key: "category-12", label: "Une structure d'accès aux soins" },
        { key: "category-13", label: "Une structures d'accès aux droits de santé" },
        { key: "category-14", label: "Une structure proposant des dépistages" },
        { key: "category-15", label: "Un service d'urgence" },
        { key: "category-16", label: "Une structure d'écoute" },
        { key: "category-17", label: "Une structure en santé sexuelle" },
        { key: "category-18", label: "Une structure communautaire" },
        { key: "category-19", label: "Une structure d'accompagnement psychologique" },
        { key: "category-20", label: "Une association accompagnant la sortie d'un réseau d'exploitation sexuelle" },
        { key: "category-21", label: "Un structure d'aller-vers, de prévention par la réduction des risques et d'accompagnement" },
        { key: "category-22", label: "Une structure de prévention et réduction des risques pour les usagers de drogues" },
        { key: "category-23", label: "Un commissariat" }

      ],
      selectedCategories: [],
      structures: [],
      markers: [],
      selectedMarker: null,
      selectedStructure: null,
      showPopup: false,
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
        this.map = L.map(mapContainer).setView([49.183333, -0.35], 10);
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
    updateSelectedCategories(categoryKey) {
      if (this.selectedCategories.includes(categoryKey)) {
        this.selectedCategories = this.selectedCategories.filter(id => id !== categoryKey);
      } else {
        this.selectedCategories.push(categoryKey);
      }
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
    // Vérifier si la structure a des catégories
    if (!structure.categories || !structure.gps) {
      return;
    }

    // S'assurer que categories est un tableau
    const categories = Array.isArray(structure.categories) ? structure.categories : [structure.categories];

    // Vérifier si au moins une des catégories de la structure est sélectionnée
    // Modifié ici : on retire la condition qui affiche tout quand aucune catégorie n'est sélectionnée
    const hasSelectedCategory = categories.some(category => 
      this.selectedCategories.includes(category)
    );
      
    if (hasSelectedCategory) {
      const [lat, lon] = structure.gps.split(',').map(coord => parseFloat(coord.trim()));
      
      if (!isNaN(lat) && !isNaN(lon)) {
        const matchingCategory = categories.find(category => 
          this.selectedCategories.includes(category)
        ) || categories[0];

        const color = iconColors[matchingCategory] || 'grey';
        const icon = createIcon(color);
        
        const marker = L.marker([lat, lon], { icon }).addTo(this.map);
        
        marker.on('click', () => {
          this.selectedStructure = {
            ...structure,
            categoriesList: categories.map(cat => {
              const category = this.categories.find(c => c.key === cat);
              return category ? category.label : '';
            }).filter(Boolean)
          };
        });

        this.markers.push(marker);
      }
    }
  });
},
    hidePopup() {
      this.showPopup = false;
    },
    closePopup() {
      this.selectedStructure = null;
      if (this.selectedMarker) {
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
    this.showPopup = true;
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

  .checkbox {
  transition: all 0.3s ease;
  cursor: pointer;
}
/* Pointer cursor sur les labels des checkboxes */
.checkbox label {
  cursor: pointer;
}


/* Ajout du curseur pointer pour l'input également */
input[type="checkbox"] {
  cursor: pointer;
}
.checkbox:hover {
  background-color: rgba(0, 0, 0, 0.05);
  transform: translateY(-2px);
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
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
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
    z-index: 600;

  }

  .slide-in-enter-active {
    transition: transform 0.3s ease-in-out;
  }

  .slide-in-enter-from {
    transform: translateX(100%);
  }

  .slide-in-enter-to {
    transform: translateX(0);
  }

  .popup-content {
    position: relative;
    padding: 20px;
    z-index: 1001;
  }

  /* Couleurs des cases à cocher */
  #category-12 { accent-color: grey; }
  #category-13 { accent-color: red; }
  #category-14 { accent-color: orange; }
  #category-15 { accent-color: green; }
  #category-16 { accent-color: aqua; }
  #category-17 { accent-color: blue; }
  #category-18 { accent-color: purple; }
  #category-19 { accent-color: fuchsia; }
  #category-20 { accent-color: orchid; }
  #category-21 { accent-color: yellowgreen; }
  #category-22 { accent-color: gold; }
  #category-23 { accent-color: teal; }

  @media (max-width: 768px) {
  .structure-popup {
    width: 200px;
  } 
}
</style>
