<template>
  <div class="dashboard flex bg-back-grey font-poppins">
    <div class="components">
      <HorizontalBar />
      <AdminBar />
    </div>
    <div class="content w-full">
      <div class="dashboard-container">
        <div class="update-keys mt-16">
          <div class="button-container">
            <button @click="openModal" class="add-button bg-purple-fonce text-white py-4 px-6 rounded-md shadow-xl font-poppins font-bold text-center hover:scale-105 duration-200">
              AJOUTER UN NOUVEL UTILISATEUR
            </button>
          </div>

          <div class="posts-keys flex flex-col gap-5 w-full bg-white p-4 mt-10 rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6">
            <h3 class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2 text-center">Gestion des utilisateurs</h3>

            <div v-for="user in utilisateurs" :key="user._id" class="post-field flex w-full justify-between items-center border-b border-b-solid border-light-grey pb-5 md:flex-col">
              <div class="user flex gap-2 justify-center items-center">
                <p>{{ user.pseudo }}</p>
              </div>
              <div class="edit-post flex gap-4 font-poppins">
                <p class="text-light-grey underline cursor-pointer" @click="openEditModal(user)">Modifier</p>
                <p class="text-light-grey underline cursor-pointer" @click="deleteUser(user._id)">Supprimer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Modal for creating or editing a user -->
      <ModalCreate :visible="isModalVisible" @close="closeModal">
        <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Modifier l\'utilisateur' : 'Créer un nouvel utilisateur' }}</h2>
        <form @submit.prevent="isEditing ? updateUser() : createUser()">
          <div class="mb-4">
            <label for="pseudo" class="block text-sm font-medium text-gray-700">Pseudonyme</label>
            <input v-model="userForm.pseudo" type="text" id="pseudo" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
          </div>
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
            <input v-model="userForm.email" type="email" id="email" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
          </div>
          <div class="mb-4">
            <label for="password" class="block text-sm font-medium text-gray-700">Mot de passe</label>
            <input v-model="userForm.password" type="password" id="password" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
          </div>
          <div class="mb-4">
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">Confirmer le mot de passe</label>
            <input v-model="confirmPassword" type="password" id="confirmPassword" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
            <p v-if="passwordMismatch" class="text-red-500 text-sm mt-2">Les mots de passe ne correspondent pas.</p>
          </div>
          <button type="submit" :disabled="passwordMismatch" class="bg-purple text-white py-2 px-4 rounded-md">{{ isEditing ? 'Modifier' : 'Créer' }}</button>
        </form>
      </ModalCreate>


      <NotificationPopup
        :visible="showNotificationPopup"
        message="L'élément a été créé avec succès !"
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
