<template>
  <div>
    <!-- Bouton avec l'icône de téléphone toujours visible -->
    <div class="fixed bottom-4 right-4 bg-purple-fonce rounded-full p-3 cursor-pointer shadow-lg z-120" @click="toggleVisibility">
      <svg xmlns="http://www.w3.org/2000/svg" class="z-100" width="32" height="32" viewBox="0 0 24 24">
        <path fill="white" d="M19 11.95q0-2.925-2.037-4.962T12 4.95v-2q1.875 0 3.513.713t2.85 1.925t1.925 2.85T21 11.95zm-4 0q0-1.25-.875-2.125T12 8.95v-2q2.075 0 3.538 1.463T17 11.95zM19.95 21q-3.125 0-6.175-1.362t-5.55-3.863t-3.862-5.55T3 4.05q0-.45.3-.75t.75-.3H8.1q.35 0 .625.238t.325.562l.65 3.5q.05.4-.025.675T9.4 8.45L6.975 10.9q.5.925 1.187 1.787t1.513 1.663q.775.775 1.625 1.438T13.1 17l2.35-2.35q.225-.225.588-.337t.712-.063l3.45.7q.35.1.575.363T21 15.9v4.05q0 .45-.3.75t-.75.3"/>
      </svg>
    </div>

    <!-- Popup d'urgence -->
    <div v-if="isVisible" class="emergency-popup fixed flex flex-col items-center gap-4 justify-center bottom-4 right-4 w-fit bg-purple-fonce text-white p-6 z-50 max-w-[300px] rounded-lg shadow-lg">
      <span class="text-center text-white textShadow font-bold text-3xl">Numéros d'Urgence</span>
      <p class="max-w-full text-center text-grey text-lg font-semibold">
        Cliquez sur un numéro pour appeler directement.
      </p>
      <div class="emergency-numbers flex flex-col items-start gap-3 w-full">
        <div v-for="(number, label) in emergencyNumbers" :key="label" class="flex items-center gap-2">
          <button @click="callNumber(number)" class="flex items-center gap-2 text-purple-fonce bg-white px-4 py-2 rounded-full w-full hover:bg-purple hover:text-white transition duration-200">
            <span>{{ label }}</span>
            <span class="font-bold">{{ number }}</span>
          </button>
        </div>
      </div>
      <button @click="toggleVisibility" class="text-white  text-center w-full underline font-semibold text-xl mt-4">Fermer</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isVisible: false,
      emergencyNumbers: {
        "Intervention d'une équipe médicale": "15",
        "Intervention des services de police": "17",
        "En cas d'accident grave": "18",
        "Dans tous les cas": "112",
        "Femmes victimes de violences": "3919",
        "Mineurs victimes de violences": "119",
        "Maraud'in Normandie": "06.29.59.26.37",
      }
    };
  },
  methods: {
    toggleVisibility() {
      this.isVisible = !this.isVisible;
    },
    callNumber(number) {
      window.location.href = `tel:${number}`;
    }
  }
};
</script>

<style scoped>
/* Styles additionnels pour une présentation améliorée */
.emergency-popup {
  max-width: 350px;
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
