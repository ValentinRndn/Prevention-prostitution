<template>
  <div class="dashboard flex bg-back-grey font-poppins">
    <div class="components">
      <HorizontalBar />
      <AdminBar />
    </div>
    <div class="content w-full">
      <div class="dashboard-container">
        <div class="update-keys mt-16">
          <div class="button-container flex gap-5">
            <button @click="openModal" class="add-button bg-purple-fonce text-white py-4 px-6 rounded-md shadow-xl font-poppins font-bold text-center hover:scale-105 duration-200">AJOUTER UN NOUVEAU DOCUMENT</button>
          </div>

          <div class="posts-keys flex flex-col gap-5 w-full bg-white p-4 mt-10 rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6">
            <h3 class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2 text-center">Gérer mes documents</h3>

            <div v-for="doc in documents" :key="doc._id" class="post-field flex w-full justify-between border-b border-b-solid border-light-grey pb-5 md:flex-col md:items-center">
              <p>{{ doc.title }}</p>
              <div class="edit-post flex gap-4 font-poppins">
                <p class="text-light-grey underline cursor-pointer" @click="openEditModal(doc)">Modifier</p>
                <p class="text-light-grey underline cursor-pointer" @click="deleteGuide(doc._id)">Supprimer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <ModalCreate :visible="isModalVisible" @close="closeModal">
        <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Modifier le document' : 'Créer un nouveau document' }}</h2>
        <form @submit.prevent="isEditing ? updateGuide() : createGuide()" enctype="multipart/form-data">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
            <input v-model="newGuide.title" type="text" id="title" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
          </div>
          <div class="mb-4">
            <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
            <textarea v-model="newGuide.description" id="description" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required></textarea>
          </div>
          <div class="mb-4">
            <label for="category" class="block text-sm font-medium text-gray-700">Catégorie</label>
            <input v-model="newGuide.category" type="text" id="category" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
          </div>
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
            <input @change="onFileChange" type="file" id="image" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          </div>
          <div class="mb-4">
            <label for="pdf" class="block text-sm font-medium text-gray-700">PDF</label>
            <input @change="onFileChange" type="file" id="pdf" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"> 
          </div>
          <button type="submit" class="bg-purple text-white py-2 px-4 rounded-md">{{ isEditing ? 'Modifier' : 'Créer' }}</button>
        </form>
      </ModalCreate>
    </div>
  </div>
</template>

<script>
import AdminBar from "../../components/backOffice/AdminBar.vue";
import HorizontalBar from "../../components/backOffice/HorizontalBar.vue";
import { getAllGuides, createGuide, deleteGuide, updateGuide } from "../../services/GuideService.js";
import ModalCreate from "../../components/backOffice/blog/ModalCreate.vue";

export default {
  components: {
    AdminBar,
    HorizontalBar,
    ModalCreate,
  },
  data() {
    return {
      isModalVisible: false,
      isEditing: false,
      currentGuideId: null,
      newGuide: {
        title: '',
        description: '',
        category: '',
      },
      image: null,
      pdf: null,
      documents: [],
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
      this.isEditing = false;
      this.resetForm();
    },
    openEditModal(doc) {
      this.isModalVisible = true;
      this.isEditing = true;
      this.currentGuideId = doc._id; // Utilise _id de MongoDB
      this.newGuide = {
        title: doc.title,
        description: doc.description,
        category: doc.category,
      };
    },
    closeModal() {
      this.isModalVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.newGuide = {
        title: '',
        description: '',
        category: '',
      };
      this.image = null;
      this.pdf = null;
    },
    onFileChange(event) {
      const inputName = event.target.id;
      if (inputName === 'image') {
        this.image = event.target.files[0];
      } else if (inputName === 'pdf') {
        this.pdf = event.target.files[0];
      }
    },
    async createGuide() {
      try {
        const formData = new FormData();
        formData.append('title', this.newGuide.title);
        formData.append('description', this.newGuide.description);
        formData.append('category', this.newGuide.category);
        if (this.image) {
          formData.append('image', this.image);
        }
        if (this.pdf) {
          formData.append('pdf', this.pdf);
        }

        await createGuide(formData);
        console.log('Guide created successfully');
        this.closeModal();
        this.fetchDocuments();
      } catch (error) {
        console.error('Error creating Guide', error);
      }
    },
    async updateGuide() {
      try {
        if (this.currentGuideId) {
          const formData = new FormData();
          formData.append('title', this.newGuide.title);
          formData.append('description', this.newGuide.description);
          formData.append('category', this.newGuide.category);
          if (this.image) {
            formData.append('image', this.image);
          }
          if (this.pdf) {
            formData.append('pdf', this.pdf);
          }

          await updateGuide(this.currentGuideId, formData);
          console.log('Guide updated successfully');
          this.closeModal();
          this.fetchDocuments();
        } else {
          console.error('No guide ID found for updating.');
        }
      } catch (error) {
        console.error('Error updating Guide', error);
      }
    },
    async deleteGuide(id) {
      try {
        if (id) {
          await deleteGuide(id);
          this.fetchDocuments();
        } else {
          console.error('No guide ID found for deletion.');
        }
      } catch (error) {
        console.error('Error deleting Guide', error);
      }
    },
    async fetchDocuments() {
      try {
        const response = await getAllGuides();
        this.documents = response.map(doc => ({
          _id: doc._id, // Assurez-vous d'utiliser _id de MongoDB
          title: doc.title,
          description: doc.description,
          image: doc.image,
          category: doc.category,
          pdf: doc.pdf
        }));
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
  },
  async created() {
    this.fetchDocuments();
  },
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
