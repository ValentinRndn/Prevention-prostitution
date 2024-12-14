<template>
  <div v-if="visible" class="notification-popup">
    <div class="popup-content">
      <p>{{ message }}</p>
      <button @click="closePopup">Fermer</button>
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
  top: 20px;
  right: 20px;
  background-color: #f1b04c;
  color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
.popup-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
button {
  background-color: transparent;
  border: none;
  color: white;
  cursor: pointer;
}
</style>
