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
            <button @click="openModal" class="add-button bg-purple-fonce text-white py-4 px-6 rounded-md shadow-xl font-poppins font-bold text-center hover:scale-105 duration-200">AJOUTER UNE NOUVELLE STRUCTURE</button>
          </div>

          <div class="posts-keys flex flex-col gap-5 w-full bg-white p-4 mt-10 rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6">
            <h3 class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2 text-center">Gérer mes structures</h3>

            <div v-for="structure in paginatedStructures()" :key="structure.id" class="post-field flex w-full justify-between border-b border-b-solid border-light-grey pb-5 md:flex-col md:items-center">
              <p>{{ structure.antenna }}</p>
              <div class="edit-post flex gap-4 font-poppins">
                <p class="text-light-grey underline cursor-pointer" @click="openEditModal(structure)">Modifier</p>
                <p class="text-light-grey underline cursor-pointer" @click="deleteStructure(structure.id)">Supprimer</p>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="pagination mt-6 flex justify-center gap-3">
            <button v-for="page in totalPages()" :key="page" @click="changePage(page)" class="bg-purple text-white px-3 py-1 rounded-md">
              {{ page }}
            </button>
          </div>
        </div>
      </div>

      <ModalCreate :visible="isModalVisible" @close="closeModal">
        <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Modifier la structure' : 'Créer une nouvelle structure' }}</h2>
        <form @submit.prevent="isEditing ? updateStructure() : createStructure()" class="scrollable-form">
          <!-- Boucle pour les champs du formulaire -->
          <div v-for="field in fields" :key="field.id" class="mb-4">
            <label :for="field.id" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
            
            <!-- Utiliser un select pour le champ category -->
            <select v-if="field.id === 'category'" v-model="newStructure[field.model]" :id="field.id" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option disabled value="">Sélectionnez une catégorie</option>
              <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
            </select>

            <!-- Utiliser un input pour les autres champs -->
            <input v-else v-model="newStructure[field.model]" :type="field.type" :id="field.id" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
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
import { getAllStructures, createStructure, updateStructure, deleteStructure } from "../../services/StructuresService.js";
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
      currentStructureId: null,
      newStructure: {
        antenna: '',
        address: '',
        gps: '',
        department: '',
        phone: '',
        email: '',
        category: ''
      },
      structures: [],
      currentPage: 1,
      structuresPerPage: 8,
      fields: [
        { id: 'antenna', label: 'Antenna', type: 'text', model: 'antenna' },
        { id: 'address', label: 'Address', type: 'text', model: 'address' },
        { id: 'gps', label: 'GPS Coordinates', type: 'text', model: 'gps' },
        { id: 'department', label: 'Department', type: 'text', model: 'department' },
        { id: 'phone', label: 'Phone', type: 'text', model: 'phone' },
        { id: 'email', label: 'Email', type: 'email', model: 'email' },
        { id: 'category', label: 'Category', type: 'text', model: 'category' },
      ],
      categories: [
        'Category 1',
        'Category 2',
        'Category 3',
        'Category 4',
        'Category 5',
        'Category 6',
        'Category 7',
        'Category 8',
        'Category 9',
        'Category 10',
      ]
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
      this.isEditing = false;
      this.resetForm();
    },
    openEditModal(structure) {
      this.isModalVisible = true;
      this.isEditing = true;
      this.currentStructureId = structure.id;
      this.newStructure = { ...structure };
    },
    closeModal() {
      this.isModalVisible = false;
      this.resetForm();
    },
    resetForm() {
      this.newStructure = {
        antenna: '',
        address: '',
        gps: '',
        department: '',
        phone: '',
        email: '',
        category: ''
      };
    },
    async fetchStructures() {
      try {
        const response = await getAllStructures();
        this.structures = response.map(structure => ({
          id: structure._id,
          antenna: structure.antenna,
          address: structure.address,
          gps: structure.gps,
          department: structure.department,
          phone: structure.phone,
          email: structure.email,
          category: structure.category,
        }));
      } catch (error) {
        console.error("Error fetching structures:", error);
      }
    },
    async createStructure() {
      try {
        const structureData = { ...this.newStructure };
        await createStructure(structureData);
        console.log('Structure created successfully');
        this.closeModal();
        this.fetchStructures();
      } catch (error) {
        console.error('Error creating structure', error.response?.data || error.message);
      }
    },
    async updateStructure() {
      try {
        const response = await updateStructure(this.currentStructureId, this.newStructure);
        console.log('Structure updated successfully', response);
        this.closeModal();
        this.fetchStructures();
      } catch (error) {
        console.error('Error updating structure', error);
      }
    },
    async deleteStructure(id) {
      try {
        await deleteStructure(id);
        console.log('Structure deleted successfully');
        this.fetchStructures();
      } catch (error) {
        console.error('Error deleting structure', error);
      }
    },
    changePage(page) {
      this.currentPage = page;
    },
    paginatedStructures() {
      const start = (this.currentPage - 1) * this.structuresPerPage;
      const end = start + this.structuresPerPage;
      return this.structures.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.structures.length / this.structuresPerPage);
    }
  },
  created() {
    this.fetchStructures();
  },
};
</script>

<style scoped>
.dashboard-container {
  flex: 1 1 0;
  padding: 2rem;
}


.scrollable-form {
  overflow-y: auto;
  padding-right: 1rem;
}

@media(max-width: 768px) {
  .dashboard-container {
    padding-left: 6rem;
  }
}
</style>
