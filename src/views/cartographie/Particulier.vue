<template>
  <div class="page-container flex h-[700px] items-center sm:flex-col sm:h-[1400px]">
    <div class="categories-container bg-purple-fonce w-[1/3] h-full px-6 flex flex-col justify-center">
      <h1 class="text-white text-2xl font-bold mb-6 font-cgothic">PAPSP VOUS ORIENTE :</h1>
      <div class="checkboxes flex flex-col gap-3 text-white text-xl">

        <div class="checkboxes flex flex-col gap-4 font-poppins">
          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="scale1" name="scales" />
            <label for="scales">Trouver des préservatifs ou du lubrifiant</label>
          </div>


        
          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="scale2" name="scales"  />
            <label for="scales">Me faire dépister</label>
        </div>

        
          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="scale3" name="scales"  />
            <label for="scales">Accéder à un traitement
d’urgence</label>
        </div>

        
          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="scale4" name="scales"  />
            <label for="scales">Accéder à la PReP</label>
        </div>

        
          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="scale5" name="scales"  />
            <label for="scales">Voir un médecin</label>
        </div>

        
          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="scale6" name="scales"  />
            <label for="scales">Interrompre une grossesse</label>
        </div>

        
          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="scale7" name="scales" />
            <label for="scales">Trouver du matériel de drogue à moindre  risque</label>
        </div>

        
          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="scale8" name="scales"  />
            <label for="scales">Trouver un soutien communautaire</label>
        </div>

        
          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="scale9" name="scales"  />
            <label for="scales">Porter plainte</label>
        </div>

        
          <div class="checkbox flex gap-3 items-center">
            <input type="checkbox" id="scale10" name="scales"  />
            <label for="scales">Parler à quelqu’un après
une agression</label>
        </div>
    </div>
        </div>
    </div>
    <div id="map" class="h-full  w-full"></div>
  </div>
</template>

<script>
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import NavigationBar from "../../components/NavigationBar.vue";
import NavigationBarMobile from "../../components/NavigationBarMobile.vue";

export default {
  mounted() {
    var map = L.map("map").setView([49.183333, -0.35], 13);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);

    var marker = L.marker([49.183333, -0.35]).addTo(map);
    marker.bindPopup("<b>Hello world!</b><br>I am a popup.").openPopup();
  },
  components: {
    NavigationBar,
  NavigationBarMobile,  },
};
</script>

<style>
input[type="checkbox"] {
transform: scale(1.5); 
}


#scale1 {
    accent-color: grey;
}

#scale2 {
    accent-color: red;
}

#scale3 {
    accent-color: orange;
}

#scale4 {
    accent-color: green;
}

#scale5 {
    accent-color: aqua;
}

#scale6 {
    accent-color: blue;
}

#scale7 {
    accent-color: purple;
}

#scale8 {
    accent-color: fuchsia;
}

#scale9 {
    accent-color: orchid;
}

#scale10 {
    accent-color: white;
}

</style>


