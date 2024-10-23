<template>
  <div class="page-container flex h-[700px] items-center">
    <div class="categories-container bg-purple-fonce w-[1/3] h-full px-6 flex flex-col justify-center">
      <h1 class="text-white text-2xl font-bold mb-6 font-cgothic">PAPSP VOUS ORIENTE :</h1>
      <div class="checkboxes flex flex-col gap-3 text-white text-xl">
        <div class="checkboxes flex flex-col gap-4 font-poppins relative">
          <div v-if="showPopup" class="popup">
            <div class="popup-content text-black relative">
              <p class="md:mt-7">
                La cartographie du programme de prévention & d’accompagnement des personnes en situation de prostitution vous permet de trouver un établissement adapté à vos besoins dans toute la région Normande
              </p>
              <img @click="hidePopup" class="absolute top-5 right-5 w-[20px] cursor-pointer" src="../../assets/map/close-popup.png" alt="hide_arrow">
            </div>
          </div>

          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="medecine-generale" name="scales" @change="updateSelectedCategories" />
            <label for="scales">Médecine générale</label>
          </div>

          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="depistage" name="scales" @change="updateSelectedCategories" />
            <label for="scales">Me faire dépister</label>
          </div>

          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="sante-sexuelle" name="scales" @change="updateSelectedCategories" />
            <label for="scales">Santé sexuelle</label>
          </div>

          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="soutien" name="scales" @change="updateSelectedCategories" />
            <label for="scales">Soutien</label>
          </div>

          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="accompagnement-psychologique" name="scales" @change="updateSelectedCategories" />
            <label for="scales">Accompagnement psychologique</label>
          </div>

          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="sortie-prostitution" name="scales" @change="updateSelectedCategories" />
            <label for="scales">Accueil de jour - Parcours sortie de prostitution</label>
          </div>

          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="preservatif" name="scales" @change="updateSelectedCategories" />
            <label for="scales">Distribution préservatifs - Accompagnement - Soutien</label>
          </div>

          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="plainte" name="scales" @change="updateSelectedCategories" />
            <label for="scales">Dépôt de plainte</label>
          </div>

          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="droit-sante" name="scales" @change="updateSelectedCategories" />
            <label for="scales">Accès aux droits de santé</label>
          </div>
        </div>
      </div>
    </div>
    <div id="map-container" class="h-full w-full relative">
      <div v-if="!cookieAccepted" class="cookie-message flex items-center justify-center h-full bg-gray-100">
        <p>Veuillez accepter les cookies de fonctionnalité pour afficher la carte interactive.</p>
      </div>
      <div v-else id="map" class="h-full w-full"></div>
      <transition name="slide">
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
  </div>
</template>


<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import Footer from "../../components/Footer.vue";
import { getAllStructures } from "../../services/StructuresService";
import { iconColors, createIcon } from "../../services/IconMap";

export default {
  data() {
    return {
      map: null,
      structures: [],
      showPopup: false,
      selectedCategories: [],
      markers: [],
      selectedStructure: null,
      selectedMarker: null,
      cookieAccepted: false,
    };
  },
  methods: {
    initMap() {
      const mapContainer = document.getElementById("map");
      if (mapContainer) {
        this.map = L.map(mapContainer).setView([49.183333, -0.35], 13);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        }).addTo(this.map);
        this.showStructures(); // Appel de la fonction pour charger les structures après l'initialisation de la carte
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
            const category = structure.category;
            const color = iconColors[category];
            const icon = createIcon(color);
            const marker = L.marker([lat, lon], { icon: icon }).addTo(this.map);
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
    hidePopup() {
      this.showPopup = false;
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
          this.initMap(); // Initialise la carte après que le DOM est mis à jour
        });
      }
    },
  },
  mounted() {
    this.checkCookieConsent();
    this.showPopup = true;
  },
  components: {
  },
};
</script>



<style>
.cookie-message {
  font-size: 1.2rem;
}

.page-container {
  position: relative;
  overflow: hidden; 
}

.structure-popup {
  position: absolute;
  top: 0;
  right: 0;
  width: 30%;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.5);
  z-index: 1000;
  transform: translateX(0%);
  transition: transform 0.3s ease-in-out;
}

.structure-popup .popup-content {
  padding: 20px;
}

.structure-popup .close-btn {
  margin-top: 20px;
  padding: 10px 15px;
  background-color: #f44336;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease-in-out;
}

.slide-enter, 
.slide-leave-to {
  transform: translateX(100%); /* La popup glisse depuis et vers la droite */
}

.slide-enter-to {
  transform: translateX(0); /* La popup reste visible au-dessus de la carte */
}

.slide-leave-to {
  transform: translateX(100%); /* La popup disparaît vers la droite */
}


/* Styles pour la popup initiale */
.popup {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.popup button {
  margin-top: 10px;
}

input[type="checkbox"] {
  transform: scale(1.5);
}

/* Couleurs des cases à cocher */
#medecine-generale { accent-color: grey; }
#depistage { accent-color: red; }
#sante-sexuelle { accent-color: orange; }
#soutien { accent-color: green; }
#accompagnement-psychologique { accent-color: aqua; }
#sortie-prostitution { accent-color: blue; }
#preservatif { accent-color: purple; }
#plainte { accent-color: fuchsia; }
#droit-sante { accent-color: orchid; }

/* Styles pour les icônes personnalisées */
.custom-icon {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-icon div {
  width: 25px;
  height: 25px;
  border-radius: 20%;
}

.custom-icon-selected {
  border: 3px solid ;
  border-radius: 100%; 
}
</style>
