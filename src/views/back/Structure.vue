<template>
  <div class="dashboard flex bg-back-grey font-poppins">
    <div class="components">
      <HorizontalBar />
      <AdminBar />
    </div>
    <div class="content w-full overflow-y-auto">
      <div class="dashboard-container ">
        <div class="update-keys mt-16">
          <div class="button-container flex gap-5">
            <button @click="openModal" class="add-button bg-purple-fonce text-white py-4 px-6 rounded-md shadow-xl font-poppins font-bold text-center hover:scale-105 duration-200">AJOUTER UNE NOUVELLE STRUCTURE</button>
          </div>

          <div class="search-container mb-5">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher une structure"
              class="border border-gray-300 rounded-md p-2 w-full mt-8"
            />
          </div>

          <div class="posts-keys flex flex-col gap-5 w-full bg-white p-4 mt-10 rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6">
            <h3 class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2 text-center">Gérer mes structures</h3>

            <div v-for="structure in paginatedStructures()" :key="structure.id" class="post-field flex w-full justify-between border-b border-b-solid border-light-grey pb-5 md:flex-col md:items-center">
              <p>{{ structure.antenna }}</p>
              <p class="text-light-grey">{{ getCategoryLabel(structure.category) }}</p> <!-- Utilisation de la méthode pour obtenir le label -->
              <div class="edit-post flex gap-4 font-poppins">
                <p class="text-light-grey underline cursor-pointer" @click="openEditModal(structure)">Modifier</p>
                <p class="text-light-grey underline cursor-pointer" @click="deleteStructure(structure.id)">Supprimer</p>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="pagination mt-6 flex justify-center items-center gap-3">
            <button @click="changePage(currentPage - 1)" :disabled="currentPage === 1" class="bg-purple text-white px-3 py-1 rounded-md">
              &laquo; <!-- Flèche gauche -->
            </button>

            <span v-if="totalPages() > 1">
              <button v-if="currentPage > 2" @click="changePage(1)" class="bg-purple text-white px-3 py-1 rounded-md">1</button>
              <span v-if="currentPage > 3">...</span>
              
              <button v-for="page in visiblePages()" :key="page" @click="changePage(page)" class="bg-purple text-white px-3 py-1 rounded-md">
                {{ page }}
              </button>

              <span v-if="currentPage < totalPages() - 2">...</span>
              <button v-if="currentPage < totalPages() - 1" @click="changePage(totalPages())" class="bg-purple text-white px-3 py-1 rounded-md">{{ totalPages() }}</button>
            </span>

            <button @click="changePage(currentPage + 1)" :disabled="currentPage === totalPages()" class="bg-purple text-white px-3 py-1 rounded-md">
              &raquo; <!-- Flèche droite -->
            </button>

            <span class="ml-4 text-gray-700 absolute right-10">Total: {{ structures.length }} structures</span>
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

          <div class="mb-4">
            <label for="address" class="block text-sm font-medium text-gray-700 w-full">Adresse</label>
            <input 
              type="text"
              ref="autocompleteInput"
              placeholder="Entrez une adresse"
              class="form-control w-full"
            />

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
            <input v-else v-model="newStructure[field.model]" :type="field.type" :id="field.id" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
          </div>

          <button type="submit" class="bg-purple text-white py-2 px-4 rounded-md">{{ isEditing ? 'Modifier' : 'Créer' }}</button>
        </form>
      </ModalCreate>

      <NotificationPopup
        :visible="showNotificationPopup"
        message="La structure a été ajoutée avec succès !"
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
import { getAllStructures, createStructure, updateStructure, deleteStructure } from "../../services/StructuresService.js";
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
      isVisible: true,
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
      searchQuery: '',
      currentPage: 1,
      structuresPerPage: 8,
      mainCategories: ['Professionnel', 'Personne en situation de prostitution'], 
      selectedMainCategory: '', 
      fields: [
        { id: 'antenna', label: 'Antenne', type: 'text', model: 'antenna' },
        { id: 'address', label: 'Addresse', type: 'text', model: 'address' },
        { id: 'gps', label: 'Coordonnées GPS', type: 'text', model: 'gps' },
        { id: 'department', label: 'Departement', type: 'text', model: 'department' },
        { id: 'phone', label: 'Téléphone', type: 'text', model: 'phone' },
        { id: 'email', label: 'Email', type: 'email', model: 'email' },
        { id: 'category', label: 'Catégories', type: 'text', model: 'category' },
      ],
      categories: [], 
      allCategories: {
        'Professionnel': [
        { key: "category-12", label: "Une structure d'accès aux soins" },
        { key: "category-13", label: "Une structures d'accès aux droits de santé" },
        { key: "category-14", label: "Une structure proposant des dépistages" },
        { key: "category-15", label: "Un service d'urgence" },
        { key: "category-16", label: "Une structure d'écoute" },
        { key: "category-17", label: "Une structure en santé sexuelle" },
        { key: "category-18", label: "Une structure communautaire" },
        { key: "category-19", label: "Une structure d'accompagnement psychologique" },
        { key: "category-20", label: "Une association accompagnant la sortie d'un réseau d'exploitation sexuelle" },
        { key: "category-21", label: "Un structure d'aller-vers, de prévention par la réduction des risques et d'accompagnement" },
        { key: "category-22", label: "Une structure de prévention et réduction des risques pour les usagers de drogues" },
        { key: "category-23", label: "Un commissariat" }
        ],
        'Personne en situation de prostitution': [
        { key: "category-0", label: "Rencontrer un médecin" },
        { key: "category-1", label: "Accéder aux droits de santé" },
        { key: "category-2", label: "Me faire dépister" },
        { key: "category-3", label: "Trouver un service d'urgence" },
        { key: "category-4", label: "Trouver une écoute" },
        { key: "category-5", label: "Rencontrer un médecin gynécologue ou une sage-femme" },
        { key: "category-6", label: "Trouver un soutien communautaire" },
        { key: "category-7", label: "Rencontrer un psychologue" },
        { key: "category-8", label: "Sortir d'un réseau d'exploitation sexuelle" },
        { key: "category-9", label: "Trouver des préservatifs" },
        { key: "category-10", label: "Trouver du matériel de consommation de drogue à moindre risque" },
        { key: "category-11", label: "Déposer plainte" }
        ]
      },
      showNotificationPopup: false,
    };
  },
  methods: {
      getCategoryLabel(key) {
      for (const mainCategory in this.allCategories) {
        const category = this.allCategories[mainCategory].find(cat => cat.key === key);
        if (category) return category.label;
      }
      return '';
    },
    visiblePages() {
    const pages = [];
    const total = this.totalPages(); // Utilisez 'this' pour accéder à la méthode

    for (let i = 1; i <= total; i++) {
      if (i === 1 || i === total || (i >= this.currentPage - 1 && i <= this.currentPage + 1)) {
        pages.push(i);
      }
    }
    
    return pages;
  },
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
        this.showNotificationPopup = true;
        this.fetchStructures();
                setTimeout(() => {
          this.showNotificationPopup = false;
        }, 3000);

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
    if (page < 1 || page > this.totalPages()) return; // Utilisez 'this' ici aussi
    this.currentPage = page;
  },
    paginatedStructures() {
      const filteredStructures = this.structures.filter(structure => {
        const nameMatch = structure.antenna.toLowerCase().includes(this.searchQuery.toLowerCase());
        const categoryMatch = this.categories.some(category => 
          category.label.toLowerCase().includes(this.searchQuery.toLowerCase())
        );
        return nameMatch || categoryMatch;
      });
      
      const start = (this.currentPage - 1) * this.structuresPerPage;
      const end = start + this.structuresPerPage;
      return filteredStructures.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.structures.length / this.structuresPerPage);
    },
    updateCategories() {
      // Met à jour les catégories en fonction de la sélection dans mainCategory
      this.categories = this.allCategories[this.selectedMainCategory] || [];
    },

    initAutocomplete() {
      // Vérifie si Google Maps API est disponible
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error('Google Maps API n’est pas chargé');
        return;
      }

      // Vérifie si l'élément input est prêt
      const input = this.$refs.autocompleteInput;

      if (!input) {
        console.error('Référence au champ d’entrée introuvable');
        return;
      }

      try {
        this.autocomplete = new google.maps.places.Autocomplete(input, {
          types: ['address'], // Restreindre aux adresses uniquement
          componentRestrictions: { country: 'fr' }, // Restreindre à la France
        });

        // Ajoute un listener pour traiter les données de l’adresse sélectionnée
        this.autocomplete.addListener('place_changed', this.fillAddressData);
        console.log('Autocomplete initialisé avec succès');
      } catch (error) {
        console.error('Erreur lors de l’initialisation de l’Autocomplete :', error);
      }
    },

    fillAddressData() {
      const place = this.autocomplete.getPlace();

      if (!place.geometry) {
        console.error('Aucune géométrie disponible pour le lieu sélectionné');
        return;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address || place.name;

      // Mettre à jour les champs de l'adresse et des coordonnées GPS
      this.newStructure.address = address;
      this.newStructure.gps = `${lat}, ${lng}`;

      console.log('Adresse sélectionnée :', {
        fullAddress: address,
        latitude: lat,
        longitude: lng,
      });
    },

},
watch: {
    isModalVisible(newVal) {
      if (newVal) {
        // Initialisez l'Autocomplete seulement lorsque la modale est visible
        this.$nextTick(() => {
          this.initAutocomplete();
        });
      }
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.fetchStructures(); // Charge les données de la structure
    });
  },
};

</script>
