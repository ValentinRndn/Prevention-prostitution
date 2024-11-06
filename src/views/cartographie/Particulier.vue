<template>
  <div class="page-container flex h-[700px] items-center md:flex-col ">
    <div class="categories-container bg-grey md:w-[1/3] h-full px-6 flex flex-col justify-center md:h-fit md:w-full md:bg-white md:text-black">
      <h1 class="text-white text-2xl font-bold mb-6 font-cgothic md:hidden">JE SOUHAITE :</h1>
      
      <!-- Bouton pour afficher/masquer les catégories sur mobile -->
      <span class="hidden md:flex md:items-center  text-black cursor-pointer mb-4 md:w-fit font-semibold text-xl " @click="toggleVisibility">
        Catégories 
        <svg xmlns="http://www.w3.org/2000/svg" :class="{rotatedIcon : categoryVisible}" class="transition duration-200" width="24" height="24" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 15.5l-6-6l1.41-1.41L12 12.67l4.59-4.58L18 9.5z"/>
        </svg>
      </span>

      <!-- Liste des catégories -->
      <div v-if="categoryVisible || windowWidth > 768" class="checkboxes flex flex-col gap-4 font-poppins text-white text-xl md:text-black ">
        <div class="checkbox flex gap-3 items-center" v-for="(label, index) in categories" :key="index">
          <input :id="'scale' + (index + 1)" type="checkbox" />
          <label :for="'scale' + (index + 1)">{{ label }}</label>
        </div>
      </div>
    </div>
    <div id="map" class="h-full w-full md:h-[80vh]"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import NavigationBar from "../../components/NavigationBar.vue";
import NavigationBarMobile from "../../components/NavigationBarMobile.vue";

export default {
  data() {
    return {
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
      ]
    };
  },
  methods: {
    toggleVisibility() {
      this.categoryVisible = !this.categoryVisible;
    },
    handleResize() {
      this.windowWidth = window.innerWidth;
      this.categoryVisible = this.windowWidth > 768;
    }
  },
  mounted() {
    this.handleResize();
    window.addEventListener("resize", this.handleResize);

    var map = L.map("map").setView([49.183333, -0.35], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var marker = L.marker([49.183333, -0.35]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.handleResize);
  },
  components: {
    NavigationBar,
    NavigationBarMobile,
  }
};
</script>

<style scoped>
input[type="checkbox"] {
  transform: scale(1.5); 
}
#scale1 { accent-color: grey; }
#scale2 { accent-color: red; }
#scale3 { accent-color: orange; }
#scale4 { accent-color: green; }
#scale5 { accent-color: aqua; }
#scale6 { accent-color: blue; }
#scale7 { accent-color: purple; }
#scale8 { accent-color: fuchsia; }
#scale9 { accent-color: orchid; }
#scale10 { accent-color: white; }

.rotatedIcon {
    transform: rotate(180deg);
  }
</style>
