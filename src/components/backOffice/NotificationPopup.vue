<template>
  <div v-if="visible" class="notification-popup">
    <div class="popup-content relative">
      <p>{{ message }}</p>
      <button class="absolute right-0 top-0" @click="closePopup">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="1.5" d="m8.464 15.535l7.072-7.07m-7.072 0l7.072 7.07"/></svg>

      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    visible: Boolean, // Si la popup est visible ou non
    message: String, // Message à afficher dans la popup
    autoClose: Boolean, // Si la popup se ferme automatiquement
    autoCloseDuration: Number // Durée en millisecondes pour la fermeture automatique
  },
  methods: {
    closePopup() {
      this.$emit('close'); // Émet l'événement 'close' pour informer le parent
    }
  },
  watch: {
    visible(newVal) {
      if (newVal && this.autoClose) {
        setTimeout(() => {
          this.closePopup(); // Ferme la popup après la durée spécifiée
        }, this.autoCloseDuration);
      }
    }
  }
};
</script>

<style scoped>
.notification-popup {
  position: fixed;
  top: 80px;
  right: 20px;
  background-color: #f1b04c;
  color: white;
  padding: 0px;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}
.popup-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f1b04c;
}
button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
