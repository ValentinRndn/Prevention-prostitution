<template>
  <div class="dashboard flex bg-back-grey font-poppins">
    <div class="components">
      <HorizontalBar />
      <AdminBar />
    </div>
    <div class="content w-full overflow-y-auto">
      <div class="dashboard-container">
        <div class="update-keys mt-16">
          <div class="flex justify-between items-center mb-6">
            <h1 class="text-3xl font-bold text-gray-800">Gestion des utilisateurs</h1>
            <button @click="openModal" class="flex items-center gap-2 px-6 py-3 bg-[#f1b04c] hover:bg-[#d4a159] text-white font-medium rounded-lg shadow-md transition-all duration-200">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Nouvel utilisateur
            </button>
          </div>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-bold text-gray-800">Tous les utilisateurs</h3>
              <p class="text-sm text-gray-600 mt-1">{{ utilisateurs.length }} utilisateur{{ utilisateurs.length > 1 ? 's' : '' }} enregistré{{ utilisateurs.length > 1 ? 's' : '' }}</p>
            </div>

            <div class="divide-y divide-gray-200">
              <div v-for="user in utilisateurs" :key="user._id" class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
                  <div class="flex items-center gap-4">
                    <div class="flex items-center justify-center w-12 h-12 rounded-full bg-[#fef7ed]">
                      <svg class="w-6 h-6 text-[#f1b04c]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div>
                      <p class="font-medium text-gray-900">{{ user.pseudo }}</p>
                      <p class="text-sm text-gray-600">{{ user.email }}</p>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <button @click="openEditModal(user)" class="px-4 py-2 text-sm font-medium text-[#f1b04c] hover:bg-[#fef7ed] rounded-md transition-colors">
                      Modifier
                    </button>
                    <button @click="deleteUser(user._id)" class="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="!utilisateurs.length" class="p-12 text-center">
                <div class="flex justify-center mb-4">
                  <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                    <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
                    </svg>
                  </div>
                </div>
                <p class="text-gray-600 font-medium">Aucun utilisateur</p>
                <p class="text-sm text-gray-500 mt-1">Commencez par créer votre premier utilisateur</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal for creating or editing a user -->
      <ModalCreate :visible="isModalVisible" @close="closeModal">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f1b04c] to-[#d4a159] flex items-center justify-center shadow-lg">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ isEditing ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur' }}</h2>
            <p class="text-sm text-gray-600">{{ isEditing ? 'Mettez à jour les informations' : 'Remplissez les informations du compte' }}</p>
          </div>
        </div>

        <form @submit.prevent="isEditing ? updateUser() : createUser()">
          <div class="mb-4">
            <label for="pseudo">Pseudonyme</label>
            <input v-model="userForm.pseudo" type="text" id="pseudo" placeholder="Entrez un pseudonyme" required>
          </div>
          <div class="mb-4">
            <label for="email">Email</label>
            <input v-model="userForm.email" type="email" id="email" placeholder="exemple@email.com" required>
          </div>
          <div class="mb-4">
            <label for="password">Mot de passe</label>
            <input v-model="userForm.password" type="password" id="password" placeholder="Minimum 8 caractères" required>
          </div>
          <div class="mb-4">
            <label for="confirmPassword">Confirmer le mot de passe</label>
            <input v-model="confirmPassword" type="password" id="confirmPassword" placeholder="Retapez le mot de passe" required>
            <p v-if="passwordMismatch" class="text-red-600 text-sm mt-2 flex items-center gap-2">
              <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
              </svg>
              Les mots de passe ne correspondent pas.
            </p>
          </div>
          <button type="submit" :disabled="passwordMismatch">
            {{ isEditing ? 'Enregistrer les modifications' : 'Créer l\'utilisateur' }}
          </button>
        </form>
      </ModalCreate>


      <NotificationPopup
        :visible="showNotificationPopup"
        message="L'utilisateur a été créé avec succès !"
        :autoClose="true"
        :autoCloseDuration="3000"
        @close="showNotificationPopup = false"
      />

    
    
    </div>
  </div>
</template>

<script>
import AdminBar from "../../components/backOffice/AdminBar.vue";
import HorizontalBar from "../../components/backOffice/HorizontalBar.vue";
import { getAllUsers, createUser, updateUser, deleteUser } from "../../services/UsersService.js";
import ModalCreate from "../../components/backOffice/blog/ModalCreate.vue";
import NotificationPopup from "../../components/backOffice/NotificationPopup.vue";

export default {
  components: {
    AdminBar,
    HorizontalBar,
    ModalCreate,
    NotificationPopup
  },
  data() {
    return {
      isModalVisible: false,
      isEditing: false,
      currentUserId: null,
      userForm: {
        pseudo: '',
        email: '',
        password: ''
      },
      confirmPassword: '',
      utilisateurs: [],
      showNotificationPopup: false,
    };
  },
  computed: {
    passwordMismatch() {
      return this.userForm.password !== this.confirmPassword;
    }
  },
  methods: {


    openModal() {
      this.isModalVisible = true;
      this.isEditing = false;
      this.resetForm();
    },
    openEditModal(user) {
      this.isModalVisible = true;
      this.isEditing = true;
      this.currentUserId = user._id;
      this.userForm = {
        pseudo: user.pseudo,
        email: user.email,
        password: '' 
      };
      this.confirmPassword = '';
    },
    closeModal() {
      this.isModalVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.userForm = {
        pseudo: '',
        email: '',
        password: ''
      };
      this.confirmPassword = '';
    },
    async showUsers() {
      try {
        const response = await getAllUsers();
        this.utilisateurs = response;
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs", error);
      }
    },
    async createUser() {
  try {
    if (this.passwordMismatch) {
      console.error('Les mots de passe ne correspondent pas');
      return;
    }

    const userData = {
      pseudo: this.userForm.pseudo,
      email: this.userForm.email,
      password: this.userForm.password
    };

    const response = await createUser(userData);
    console.log('Utilisateur créé avec succès', response);

    // Afficher la notification
    this.showNotificationPopup = true;

    // Fermer la modal
    this.closeModal();

    // Mettre à jour les utilisateurs
    this.showUsers();

    // Fermer la notification après un délai
    setTimeout(() => {
      this.showNotificationPopup = false;
    }, 3000);  // Délai de 5 secondes (5000 ms)
  } catch (error) {
    console.error('Erreur lors de la création de l\'utilisateur', error);
  }
},

    async updateUser() {
      try {
        if (this.passwordMismatch) {
          console.error('Les mots de passe ne correspondent pas');
          return;
        }

        const userData = {
          pseudo: this.userForm.pseudo,
          email: this.userForm.email,
          password: this.userForm.password
        };

        const response = await updateUser(this.currentUserId, userData);
        console.log('Utilisateur mis à jour avec succès', response);
        this.closeModal();
        this.showUsers();
      } catch (error) {
        console.error('Erreur lors de la mise à jour de l\'utilisateur', error);
      }
    },
    async deleteUser(id) {
      try {
        await deleteUser(id);
        this.showUsers();
      } catch (error) {
        console.error('Erreur lors de la suppression de l\'utilisateur', error);
      }
    },
  },
  mounted() {
    this.showUsers();
  }
};
</script>

<style>
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
