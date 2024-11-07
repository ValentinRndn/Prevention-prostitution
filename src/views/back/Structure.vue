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
          <!-- Dropdown pour le type principal -->
          <div class="mb-4">
            <label for="mainCategory" class="block text-sm font-medium text-gray-700">Type de Structure</label>
            <select v-model="selectedMainCategory" id="mainCategory" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" @change="updateCategories">
              <option disabled value="">Sélectionnez un type</option>
              <option v-for="type in mainCategories" :key="type" :value="type">{{ type }}</option>
            </select>
          </div>

          <!-- Boucle pour les champs du formulaire -->
          <div v-for="field in fields" :key="field.id" class="mb-4">
            <label :for="field.id" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
            
            <!-- Utiliser un select pour le champ category -->
            <select v-if="field.id === 'category'" v-model="newStructure[field.model]" :id="field.id" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
              <option disabled value="">Sélectionnez une catégorie</option>
              <option v-for="category in categories" :key="category.key" :value="category.key">{{ category.label }}</option>
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
      mainCategories: ['Professionnel', 'Personne en situation de prostitution'], 
      selectedMainCategory: '', 
      fields: [
        { id: 'antenna', label: 'Antenna', type: 'text', model: 'antenna' },
        { id: 'address', label: 'Address', type: 'text', model: 'address' },
        { id: 'gps', label: 'GPS Coordinates', type: 'text', model: 'gps' },
        { id: 'department', label: 'Department', type: 'text', model: 'department' },
        { id: 'phone', label: 'Phone', type: 'text', model: 'phone' },
        { id: 'email', label: 'Email', type: 'email', model: 'email' },
        { id: 'category', label: 'Category', type: 'text', model: 'category' },
      ],
      categories: [], 
      allCategories: {
        'Professionnel': [
          { key: 'category-10', label: 'Médecine générale' },
          { key: 'category-11', label: 'Me faire dépister' },
          { key: 'category-12', label: 'Santé sexuelle' },
          { key: 'category-13', label: 'Soutien' },
          { key: 'category-14', label: 'Accompagnement psychologique' },
          { key: 'category-15', label: 'Accueil de jour - Parcours sortie de prostitution' },
          { key: 'category-16', label: 'Distribution préservatifs - Accompagnement - Soutien' },
          { key: 'category-17', label: 'Dépôt de plainte' },
          { key: 'category-18', label: 'Accès aux droits de santé' },
          { key: 'category-19', label: 'Parler à quelqu’un après une agression' }
        ],
        'Personne en situation de prostitution': [
          { key: 'category-0', label: 'Trouver des préservatifs ou lubrifiants' },
          { key: 'category-1', label: 'Me faire dépister' },
          { key: 'category-2', label: 'Accéder à un traitement d’urgence' },
          { key: 'category-3', label: 'Accéder à la PrEP' },
          { key: 'category-4', label: 'Voir un médecin' },
          { key: 'category-5', label: 'Interrompre une grossesse' },
          { key: 'category-6', label: 'Trouver du matériel de drogue à moindre risque' },
          { key: 'category-7', label: 'Trouver un soutien communautaire' },
          { key: 'category-8', label: 'Porter plainte' },
          { key: 'category-9', label: 'Parler à quelqu’un après une agression' }
        ]
      }
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
    },
    updateCategories() {
      // Met à jour les catégories en fonction de la sélection dans mainCategory
      this.categories = this.allCategories[this.selectedMainCategory] || [];
    }
  },
  created() {
    this.fetchStructures();
  },
};
</script>
