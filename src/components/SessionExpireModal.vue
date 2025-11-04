<template>
    <div v-if="isVisible" class="fixed inset-0 z-50 overflow-y-auto">
      <!-- Overlay -->
      <div class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
  
      <!-- Modal -->
      <div class="flex min-h-full items-end justify-center p-4 text-center max-sm:items-center max-sm:p-0">
        <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all max-sm:my-8 max-sm:w-full max-sm:max-w-lg max-sm:p-6">
          <div class="sm:flex max-sm:items-start">
            <!-- Icône d'avertissement -->
            <div class="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 max-sm:mx-0 max-sm:h-10 max-sm:w-10">
              <svg class="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            
            <!-- Contenu -->
            <div class="mt-3 text-center max-sm:ml-4 max-sm:mt-0 max-sm:text-left">
              <h3 class="text-base font-semibold leading-6 text-gray-900">
                Session expirée
              </h3>
              <div class="mt-2">
                <p class="text-sm text-gray-500">
                  Votre session a expiré. Veuillez vous reconnecter pour continuer.
                </p>
              </div>
            </div>
          </div>
  
          <!-- Bouton -->
          <div class="mt-5 max-sm:mt-4 max-sm:flex max-sm:flex-row-reverse">
            <button
              type="button"
              @click="handleReconnect"
              class="inline-flex w-full justify-center rounded-md bg-purple-fonce px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-800 max-sm:ml-3 max-sm:w-auto"
            >
              Se reconnecter
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SessionExpiredModal',
    data() {
      return {
        isVisible: false
      }
    },
    methods: {
      show() {
        this.isVisible = true;
      },
      hide() {
        this.isVisible = false;
      },
      handleReconnect() {
        // Rediriger vers la page de connexion
        this.$router.push('/login');
        this.hide();
        // Supprimer le token et autres données de session
        localStorage.removeItem('token');
        // Vous pouvez ajouter d'autres nettoyages si nécessaire
      }
    }
  }
  </script>