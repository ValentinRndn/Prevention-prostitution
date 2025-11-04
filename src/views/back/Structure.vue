<template>
  <div class="dashboard flex bg-back-grey font-poppins max-md:block">
    <div class="components max-md:contents">
      <HorizontalBar />
      <AdminBar />
    </div>
    <div class="content w-full overflow-y-auto max-md:w-full">
      <div class="dashboard-container">
        <div class="update-keys mt-16 max-md:mt-14 px-6 max-md:px-4">
          <div class="flex justify-between items-center mb-6 max-md:flex-col max-md:items-start max-md:gap-4">
            <h1 class="text-3xl font-bold text-gray-800 max-md:text-2xl">Gestion des structures</h1>
            <button @click="openModal" class="flex items-center justify-center gap-2 px-6 py-3 bg-[#f1b04c] hover:bg-[#d4a159] text-white font-medium rounded-lg shadow-md transition-all duration-200 max-md:w-full">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Nouvelle structure
            </button>
          </div>

          <div class="mb-6">
            <div class="relative">
              <svg class="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
              </svg>
              <input
                type="text"
                v-model="searchQuery"
                placeholder="Rechercher une structure..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f1b04c] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-bold text-gray-800">Toutes les structures</h3>
              <p class="text-sm text-gray-600 mt-1">{{ getFilteredStructures().length }} structure{{ getFilteredStructures().length > 1 ? 's' : '' }} trouvée{{ getFilteredStructures().length > 1 ? 's' : '' }}</p>
            </div>

            <div class="divide-y divide-gray-200">
              <div v-for="structure in paginatedStructures()" :key="structure.id" class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-start justify-between gap-4 max-md:flex-col">
                  <div class="flex items-start gap-4 flex-1 min-w-0">
                    <div class="flex items-center justify-center w-12 h-12 rounded-full bg-[#fef7ed] flex-shrink-0 mt-1">
                      <svg class="w-6 h-6 text-[#f1b04c]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-900 mb-2">{{ structure.antenna }}</p>
                      <div class="flex flex-wrap gap-2">
                        <span
                          v-for="categoryKey in structure.categories"
                          :key="categoryKey"
                          class="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          {{ getCategoryLabel(categoryKey) }}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div class="flex gap-3 flex-shrink-0 max-md:w-full">
                    <button @click="openEditModal(structure)" class="px-4 py-2 text-sm font-medium text-[#f1b04c] hover:bg-[#fef7ed] rounded-md transition-colors max-md:flex-1">
                      Modifier
                    </button>
                    <button @click="deleteStructure(structure.id)" class="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors max-md:flex-1">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="!getFilteredStructures().length" class="p-12 text-center">
                <div class="flex justify-center mb-4">
                  <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                    <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p class="text-gray-600 font-medium">Aucune structure trouvée</p>
                <p class="text-sm text-gray-500 mt-1">{{ searchQuery ? 'Essayez de modifier votre recherche' : 'Commencez par créer votre première structure' }}</p>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div v-if="totalPages() > 1" class="pagination mt-6 flex justify-center items-center gap-2">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="px-3 py-2 rounded-md transition-all duration-200 font-medium"
              :class="currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#fef7ed] hover:text-[#f1b04c] border border-gray-300'"
            >
              &laquo;
            </button>

            <span class="flex items-center gap-2">
              <button
                v-if="currentPage > 2"
                @click="changePage(1)"
                class="px-3 py-2 rounded-md transition-all duration-200 font-medium bg-white text-gray-700 hover:bg-[#fef7ed] hover:text-[#f1b04c] border border-gray-300"
              >
                1
              </button>
              <span v-if="currentPage > 3" class="text-gray-500 px-2">...</span>

              <button
                v-for="page in visiblePages()"
                :key="page"
                @click="changePage(page)"
                class="px-3 py-2 rounded-md transition-all duration-200 font-medium"
                :class="currentPage === page ? 'bg-[#f1b04c] text-white shadow-md' : 'bg-white text-gray-700 hover:bg-[#fef7ed] hover:text-[#f1b04c] border border-gray-300'"
              >
                {{ page }}
              </button>

              <span v-if="currentPage < totalPages() - 2" class="text-gray-500 px-2">...</span>
              <button
                v-if="currentPage < totalPages() - 1"
                @click="changePage(totalPages())"
                class="px-3 py-2 rounded-md transition-all duration-200 font-medium bg-white text-gray-700 hover:bg-[#fef7ed] hover:text-[#f1b04c] border border-gray-300"
              >
                {{ totalPages() }}
              </button>
            </span>

            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages()"
              class="px-3 py-2 rounded-md transition-all duration-200 font-medium"
              :class="currentPage === totalPages() ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-white text-gray-700 hover:bg-[#fef7ed] hover:text-[#f1b04c] border border-gray-300'"
            >
              &raquo;
            </button>
          </div>
        </div>
      </div>

      <ModalCreate :visible="isModalVisible" @close="closeModal">
        <div class="flex items-center gap-3 mb-6">
          <div class="w-12 h-12 rounded-xl bg-gradient-to-br from-[#f1b04c] to-[#d4a159] flex items-center justify-center shadow-lg">
            <svg class="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2h-3a1 1 0 01-1-1v-2a1 1 0 00-1-1H9a1 1 0 00-1 1v2a1 1 0 01-1 1H4a1 1 0 110-2V4zm3 1h2v2H7V5zm2 4H7v2h2V9zm2-4h2v2h-2V5zm2 4h-2v2h2V9z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ isEditing ? "Modifier la structure" : "Nouvelle structure" }}</h2>
            <p class="text-sm text-gray-600">{{ isEditing ? "Mettez à jour les informations" : "Ajoutez une structure au réseau" }}</p>
          </div>
        </div>

        <form
          @submit.prevent="isEditing ? updateStructure() : createStructure()"
          class="scrollable-form"
        >
        <div class="mb-4">
          <label for="address">Adresse complète</label>
          <input
            type="text"
            ref="autocompleteInput"
            placeholder="Recherchez et sélectionnez une adresse..."
          />
        </div>

          <!-- Boucle pour les champs du formulaire -->
          <div v-for="field in fields" :key="field.id" class="mb-4">
            <label :for="field.id">{{ field.label }}</label>
            <input
              v-model="newStructure[field.model]"
              :type="field.type"
              :id="field.id"
              :placeholder="field.label"
            />
          </div>

          <div class="mb-4">
  <!-- Section Catégories Professionnelles -->
  <div class="mb-6 bg-gray-50 p-4 rounded-lg">
    <h3 class="font-medium text-lg mb-3 text-gray-700">Catégories Professionnelles</h3>
    <div class="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2 bg-white">
            <div
        v-for="category in allCategories['Professionnel']"
        :key="category.key"
        class="flex items-start p-2 hover:bg-gray-50" 
      >
        <input
          type="checkbox"
          :id="category.key"
          :value="category.key"
          :checked="newStructure.categories.includes(category.key)"
          @change="toggleCategory(category.key)"
          class="h-4 w-4 mt-1 flex-shrink-0" 
        />
        <label 
          :for="category.key" 
          class="ml-2 text-sm text-gray-900 break-words" 
        >
          {{ category.label }}
        </label>
      </div>
    </div>
  </div>

  <!-- Section Catégories PSP -->
  <div class="mb-4 bg-gray-50 p-4 rounded-lg">
    <h3 class="font-medium text-lg mb-3 text-gray-700">Catégories Personnes en situation de prostitution</h3>
    <div class="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-2 bg-white">
            <div
        v-for="category in allCategories['Personne en situation de prostitution']"
        :key="category.key"
        class="flex items-start p-2 hover:bg-gray-50" 
      >
        <input
          type="checkbox"
          :id="category.key"
          :value="category.key"
          :checked="newStructure.categories.includes(category.key)"
          @change="toggleCategory(category.key)"
          class="h-4 w-4 mt-1 flex-shrink-0" 
        />
        <label 
          :for="category.key" 
          class="ml-2 text-sm text-gray-900 break-words" 
        >
          {{ category.label }}
        </label>
      </div>
    </div>
  </div>

  <!-- Affichage des catégories sélectionnées -->
  <div class="mt-4 bg-white p-4 rounded-lg border border-gray-200">
    <h3 class="font-medium text-sm mb-2 text-gray-700">Catégories sélectionnées :</h3>
    <div class="flex flex-wrap gap-2">
      <span
        v-for="categoryKey in newStructure.categories"
        :key="categoryKey"
        class="inline-flex items-center px-2 py-1 rounded-full text-sm bg-purple-100 text-purple-700"
      >
        {{ getCategoryLabel(categoryKey) }}
        <button
          type="button"
          @click="removeCategory(categoryKey)"
          class="ml-1 text-purple-600 hover:text-purple-800"
        >
          ×
        </button>
      </span>
    </div>
  </div>
</div>

          <button type="submit">
            {{ isEditing ? "Enregistrer les modifications" : "Créer la structure" }}
          </button>
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
import {
  getAllStructures,
  createStructure,
  updateStructure,
  deleteStructure,
} from "../../services/StructuresService.js";
import ModalCreate from "../../components/backOffice/blog/ModalCreate.vue";
import NotificationPopup from "../../components/backOffice/NotificationPopup.vue";
import { loadGoogleMapsAPI } from "../../services/mapLoader.js";

export default {
  components: {
    AdminBar,
    HorizontalBar,
    ModalCreate,
    NotificationPopup,
  },
  data() {
    return {
      isModalVisible: false,
      isEditing: false,
      isVisible: true,
      currentStructureId: null,
      newStructure: {
        antenna: "",
        address: "",
        gps: "",
        department: "",
        phone: "",
        email: "",
        category: "",
      },
      currentFilter: "all",
      structures: [],
      searchQuery: "",
      currentPage: 1,
      structuresPerPage: 8,
      mainCategories: [
        "Professionnel",
        "Personne en situation de prostitution",
      ],
      selectedMainCategory: "",
      fields: [
        { id: "antenna", label: "Antenne", type: "text", model: "antenna" },
        { id: "address", label: "Adresse", type: "text", model: "address" },
        { id: "gps", label: "Coordonnées GPS", type: "text", model: "gps" },
        {
          id: "department",
          label: "Departement",
          type: "text",
          model: "department",
        },
        { id: "phone", label: "Téléphone", type: "text", model: "phone" },
        { id: "email", label: "Email", type: "email", model: "email" },
      ],
      categories: [],
      allCategories: {
        Professionnel: [
          { key: "category-12", label: "Une structure d'accès aux soins" },
          {
            key: "category-13",
            label: "Une structures d'accès aux droits de santé",
          },
          {
            key: "category-14",
            label: "Une structure proposant des dépistages",
          },
          { key: "category-15", label: "Un service d'urgence" },
          { key: "category-16", label: "Une structure d'écoute" },
          { key: "category-17", label: "Une structure en santé sexuelle" },
          { key: "category-18", label: "Une structure communautaire" },
          {
            key: "category-19",
            label: "Une structure d'accompagnement psychologique",
          },
          // {
          //   key: "category-20",
          //   label:
          //     "Une association accompagnant la sortie d'un réseau d'exploitation sexuelle",
          // },
          {
            key: "category-21",
            label:
              "Un structure d'aller-vers, de prévention par la réduction des risques et d'accompagnement",
          },
          {
            key: "category-22",
            label:
              "Une structure de prévention et réduction des risques pour les usagers de drogues",
          },
          { key: "category-23", label: "Un commissariat" },
          {
            key: "category-24",
            label: 'Une association agréée "Parcours Sortie de Prostitution"',
          },
        ],
        "Personne en situation de prostitution": [
          { key: "category-0", label: "Rencontrer un médecin" },
          { key: "category-1", label: "Accéder aux droits de santé" },
          { key: "category-2", label: "Me faire dépister" },
          { key: "category-3", label: "Trouver un service d'urgence" },
          { key: "category-4", label: "Trouver une écoute" },
          {
            key: "category-5",
            label: "Rencontrer un médecin gynécologue ou une sage-femme",
          },
          { key: "category-6", label: "Trouver un soutien communautaire" },
          { key: "category-7", label: "Rencontrer un psychologue" },
          // {
          //   key: "category-8",
          //   label: "Sortir d'un réseau d'exploitation sexuelle",
          // },
          { key: "category-9", label: "Trouver des préservatifs" },
          {
            key: "category-10",
            label:
              "Trouver du matériel de consommation de drogue à moindre risque",
          },
          { key: "category-11", label: "Déposer plainte" },
          { key: "category-25", label: '  Trouver une association agréée "Parcours Sortie de Prostitution' }

        ],
      },
      showNotificationPopup: false,
    };
  },
  methods: {

    async initGoogleMaps() {
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

        if (!apiKey) {
          console.error("Clé API Google Maps manquante dans le fichier .env");
          return;
        }

        await loadGoogleMapsAPI(apiKey); // Charge l'API
        this.initAutocomplete(); // Initialise l'Autocomplete
      } catch (error) {
        console.error("Erreur lors du chargement de l'API Google Maps :", error);
      }
    },

    toggleCategory(categoryKey) {
      const index = this.newStructure.categories.indexOf(categoryKey);
      if (index === -1) {
        // Si la catégorie n'est pas déjà sélectionnée, l'ajouter
        this.newStructure.categories.push(categoryKey);
      } else {
        // Si la catégorie est déjà sélectionnée, la retirer
        this.newStructure.categories.splice(index, 1);
      }
    },
    removeCategory(categoryKey) {
      const index = this.newStructure.categories.indexOf(categoryKey);
      if (index !== -1) {
        this.newStructure.categories.splice(index, 1);
      }
    },

    getCategoryLabel(key) {
      for (const mainCategory in this.allCategories) {
        const category = this.allCategories[mainCategory].find(
          (cat) => cat.key === key
        );
        if (category) return category.label;
      }
      return "";
    },
    visiblePages() {
      const pages = [];
      const total = this.totalPages();

      for (let i = 1; i <= total; i++) {
        if (
          i === 1 ||
          i === total ||
          (i >= this.currentPage - 1 && i <= this.currentPage + 1)
        ) {
          pages.push(i);
        }
      }

      return pages;
    },

    filterByType(type) {
      this.currentFilter = type;
      this.currentPage = 1; // Réinitialiser la pagination
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
        antenna: "",
        address: "",
        gps: "",
        department: "",
        phone: "",
        email: "",
        category: "",
      };
    },
    async fetchStructures() {
      try {
        const response = await getAllStructures(); // Récupère les structures depuis l'API

        if (Array.isArray(response)) {
          this.structures = response.map((structure) => ({
            id: structure._id,
            antenna: structure.antenna || "",
            address: structure.address || "",
            gps: structure.gps || "",
            department: structure.department || "",
            phone: structure.phone || "",
            email: structure.email || "",
            categories: structure.categories || [],
          }));
        } else {
          console.error(
            "Les données reçues ne sont pas un tableau :",
            response
          );
          this.structures = [];
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des structures :", error);
        this.structures = []; // Assurez que le tableau `structures` est vide en cas d'échec.
      }
    },
    async createStructure() {
      try {
        // S'assurer que categories est bien un tableau
        const structureData = {
          ...this.newStructure,
          categories: Array.isArray(this.newStructure.categories)
            ? this.newStructure.categories
            : [],
        };

        await createStructure(structureData);
        this.closeModal();
        this.showNotificationPopup = true;
        this.fetchStructures();
        setTimeout(() => {
          this.showNotificationPopup = false;
        }, 3000);
      } catch (error) {
        console.error(
          "Error creating structure",
          error.response?.data || error.message
        );
      }
    },

    // Modifier la méthode resetForm
    resetForm() {
      this.newStructure = {
        antenna: "",
        address: "",
        gps: "",
        department: "",
        phone: "",
        email: "",
        categories: [],
      };
      this.selectedMainCategory = "";
    },

    // Modifier la méthode updateCategories si nécessaire
    updateCategories() {
      this.categories = this.allCategories[this.selectedMainCategory] || [];
      // Optionnel : vider les catégories sélectionnées lors du changement de type
      this.newStructure.categories = [];
    },

    async updateStructure() {
      try {
        const structureData = {
          ...this.newStructure,
          categories: [...this.newStructure.categories],
        };
        await updateStructure(this.currentStructureId, structureData);
        this.closeModal();
        this.fetchStructures();
      } catch (error) {
        console.error("Error updating structure", error);
      }
    },
    async updateStructure() {
      try {
        const structureData = {
          ...this.newStructure,
          categories: Array.isArray(this.newStructure.categories)
            ? this.newStructure.categories
            : [this.newStructure.categories],
        };
        await updateStructure(this.currentStructureId, structureData);
        this.closeModal();
        this.fetchStructures();
      } catch (error) {
        console.error("Error updating structure", error);
      }
    },
    async deleteStructure(id) {
      try {
        await deleteStructure(id);
        this.fetchStructures();
      } catch (error) {
        console.error("Error deleting structure", error);
      }
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages()) return; // Utilisez 'this' ici aussi
      this.currentPage = page;
    },
    getFilteredStructures() {
      if (!Array.isArray(this.structures)) {
        console.error("structures n'est pas un tableau :", this.structures);
        return [];
      }

      return this.structures.filter((structure) => {
        const nameMatch = structure.antenna
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
        const categoryMatch = structure.categories.some((categoryKey) => {
          const label = this.getCategoryLabel(categoryKey);
          return label.toLowerCase().includes(this.searchQuery.toLowerCase());
        });

        if (this.currentFilter === "all") return nameMatch || categoryMatch;
        if (this.currentFilter === "pro") {
          return (
            (nameMatch || categoryMatch) &&
            structure.categories.some((cat) =>
              this.allCategories["Professionnel"].some(
                (proCat) => proCat.key === cat
              )
            )
          );
        }
        if (this.currentFilter === "psp") {
          return (
            (nameMatch || categoryMatch) &&
            structure.categories.some((cat) =>
              this.allCategories["Personne en situation de prostitution"].some(
                (pspCat) => pspCat.key === cat
              )
            )
          );
        }
        return nameMatch || categoryMatch;
      });
    },
    paginatedStructures() {
      const filtered = this.getFilteredStructures();
      const start = (this.currentPage - 1) * this.structuresPerPage;
      const end = start + this.structuresPerPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      const filtered = this.getFilteredStructures();
      return Math.ceil(filtered.length / this.structuresPerPage);
    },
    updateCategories() {
      // Met à jour les catégories en fonction de la sélection dans mainCategory
      this.categories = this.allCategories[this.selectedMainCategory] || [];
    },

    initAutocomplete() {
      // Vérifie si Google Maps API est disponible
      if (!window.google || !window.google.maps || !window.google.maps.places) {
        console.error("Google Maps API n’est pas chargé");
        return;
      }

      // Vérifie si l'élément input est prêt
      const input = this.$refs.autocompleteInput;

      if (!input) {
        console.error("Référence au champ d’entrée introuvable");
        return;
      }

      try {
        this.autocomplete = new google.maps.places.Autocomplete(input, {
          types: ["address"], // Restreindre aux adresses uniquement
          componentRestrictions: { country: "fr" }, // Restreindre à la France
        });

        // Ajoute un listener pour traiter les données de l’adresse sélectionnée
        this.autocomplete.addListener("place_changed", this.fillAddressData);
      } catch (error) {
        console.error(
          "Erreur lors de l’initialisation de l’Autocomplete :",
          error
        );
      }
    },

    fillAddressData() {
      const place = this.autocomplete.getPlace();

      if (!place.geometry) {
        console.error("Aucune géométrie disponible pour le lieu sélectionné");
        return;
      }

      const lat = place.geometry.location.lat();
      const lng = place.geometry.location.lng();
      const address = place.formatted_address || place.name;

      // Mettre à jour les champs de l'adresse et des coordonnées GPS
      this.newStructure.address = address;
      this.newStructure.gps = `${lat}, ${lng}`;
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
    searchQuery() {
      // Reset to first page when searching
      this.currentPage = 1;
    },
  },

  mounted() {
    this.initGoogleMaps();
    this.$nextTick(() => {
      this.fetchStructures(); // Charge les données de la structure
    });
  },
};
</script>

<style scoped>
input[type="checkbox"] {
  appearance: none;
  -webkit-appearance: none;
  width: 1.2em;
  height: 1.2em;
  border: 1px solid #FFA500; 
  border-radius: 4px;
  outline: none;
  cursor: pointer;
  position: relative;
  transition: all 0.2s ease;
}

input[type="checkbox"]:checked {
  background-color: #FFA500; /* Orange */
  border-color: #FFA500; /* Orange */
}

input[type="checkbox"]:checked::before {
  content: '✓';
  position: absolute;
  color: white;
  font-size: 0.8em;
  font-weight: bold;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

input[type="checkbox"]:hover {
  border-color: #FF8C00; /* Orange plus foncé au survol */
}

input[type="checkbox"]:checked:hover {
  background-color: #FF8C00; /* Orange plus foncé au survol */
  border-color: #FF8C00;
}
</style>