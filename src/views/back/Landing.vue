<template>


  <div class="dashboard flex  bg-back-grey">
    <div class="components">
      <!-- Intégration de la barre latérale -->
      <HorizontalBar />
      <AdminBar />
    </div>
    <div class="content w-full h-full">
      <LastUpdate v-if="lastUpdate !== null" :lastUpdateDate="lastUpdate"></LastUpdate>
    <!-- Contenu du tableau de bord -->
    <div class="dashboard-container ">
      <div class="update-keys flex flex-col gap-5 w-1/3 bg-white p-4  rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6">
        <h3 class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2">Mise à jour données</h3>

        <div class="update-field flex w-full border-b border-b-solid border-light-grey pb-5 md:flex-col md:items-center">
          <p>Première statistique</p>
          <input v-model="firstStats" class="border border-solid border-light-grey ml-auto shadow-lg w-[100px] text-center rounded-md md:mr-auto" type="number" name="updateNumber" id="first" maxlength="10">
        </div>

        <div class="update-field flex w-full border-b border-b-solid border-light-grey pb-5 md:flex-col md:items-center">
          <p>Seconde statistique</p>
          <input v-model="secondStats" class="border border-solid border-light-grey ml-auto shadow-lg w-[100px] text-center rounded-md md:mr-auto" type="number" name="updateNumber" id="second" maxlength="10">
        </div>

        <div class="update-field flex w-full border-b border-b-solid border-light-grey pb-5 md:flex-col md:items-center">
          <p>Troisième statistique</p>
          <input v-model="thirdStats" class="border border-solid border-light-grey ml-auto shadow-lg w-[100px] text-center rounded-md md:mr-auto" type="number" name="updateNumber" id="third" maxlength="10">
        </div>

        
        <!-- Autres champs d'entrée -->

        <button @click="saveStats" class="update-button bg-purple-fonce text-white p-2 rounded-md shadow-xl ml-auto font-poppins font-bold text-center md:mr-auto hover:scale-105 duration-200">SAUVEGARDER</button>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import AdminBar from "../../components/backOffice/AdminBar.vue";
import HorizontalBar from "../../components/backOffice/HorizontalBar.vue";
import { saveStatistiques, showNumbers} from "../../services/StatistiquesService.js";
import LastUpdate from "../../components/backOffice/LastUpdate.vue";

export default {
  components: {
    AdminBar,
    HorizontalBar,
    LastUpdate,
  },
  data() {
    return {
      numbers: [],
      firstStats: null, // Modifier les noms des propriétés
      secondStats: null,
      thirdStats: null,
      lastUpdate: null,
    };
  },
  methods: {
    async saveStats() {
  const currentDate = new Date();
  const statistique = {
    firstStats: this.firstStats !== null ? this.firstStats : 0,
    secondStats: this.secondStats !== null ? this.secondStats : 0,
    thirdStats: this.thirdStats !== null ? this.thirdStats : 0,
    lastUpdate: currentDate.toISOString()
  };

  try {
    const response = await saveStatistiques(statistique);
    this.lastUpdate = currentDate.toLocaleString();
    localStorage.setItem('lastUpdate', currentDate.toISOString());
  } catch (error) {
    console.error("Erreur lors de l'enregistrement des statistiques :", error);
  }
},


async showNumbers() {
  try {
    const statistics = await showNumbers(); 

    // Vérifie si statistics est un objet valide
    if (statistics && typeof statistics === 'object') {
      this.firstStats = statistics.firstStats ?? 0;
      this.secondStats = statistics.secondStats ?? 0;
      this.thirdStats = statistics.thirdStats ?? 0;
      this.lastUpdate = statistics.lastUpdate ? new Date(statistics.lastUpdate).toLocaleString() : null;
    } else {
      console.error("Les statistiques sont vides ou mal structurées.");
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des statistiques :', error);
    this.error = "Une erreur s'est produite lors de la récupération des statistiques";
  }
}

  },
  mounted() {
    this.showNumbers();
    const lastUpdate = localStorage.getItem('lastUpdate');
    if (lastUpdate) {
      this.lasUpdate = new Date(lastUpdate).toLocaleString();
    }
  }, 
  }
</script>

<style>
.dashboard {
  height: 100vh;
  overflow: hidden;
}


.dashboard-container {
  flex: 1 1 0;
  padding: 2rem;
}

@media(max-width: 768px) {
  .dashboard-container {
    padding-left: 6rem;
  }
}
</style>
