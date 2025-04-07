<template>
  <div class="dashboard flex bg-back-grey font-poppins">
    <div class="components">
      <HorizontalBar />
      <AdminBar />
    </div>
    <div class="content w-full overflow-y-auto">
      <div class="dashboard-container">
        <div class="update-keys mt-16">
          <div class="button-container flex gap-5">
            <button
              @click="openModal"
              class="add-button bg-purple-fonce text-white py-4 px-6 rounded-md shadow-xl font-poppins font-bold text-center hover:scale-105 duration-200"
            >
              AJOUTER UNE NOUVELLE STRUCTURE
            </button>
          </div>
          <!-- Nouveaux boutons de filtrage -->
          <!-- <div class="filter-buttons flex gap-4 mt-8">
            <button
              @click="filterByType('all')"
              class="py-2 px-4 rounded-md"
              :class="
                currentFilter === 'all'
                  ? 'bg-purple-fonce text-white shadow-xl'
                  : 'bg-white text-gray-700 hover:scale-105 duration-200 shadow-xl'
              "
            >
              Toutes les structures
            </button>
            <button
              @click="filterByType('pro')"
              class="py-2 px-4 rounded-md"
              :class="
                currentFilter === 'pro'
                  ? 'bg-purple-fonce text-white shadow-xl'
                  : 'bg-white text-gray-700 hover:scale-105 duration-200 shadow-xl'
              "
            >
              Structures professionnelles
            </button>
            <button
              @click="filterByType('psp')"
              class="py-2 px-4 rounded-md"
              :class="
                currentFilter === 'psp'
                  ? 'bg-purple-fonce text-white shadow-xl'
                  : 'bg-white text-gray-700 border hover:scale-105 duration-200 shadow-xl'
              "
            >
              Structures PSP
            </button>
          </div> -->

          <div class="search-container mb-5">
            <input
              type="text"
              v-model="searchQuery"
              placeholder="Rechercher une structure"
              class="border border-gray-300 rounded-md p-2 w-full mt-8"
            />
          </div>



          <div
            class="posts-keys flex flex-col gap-5 w-full bg-white p-4 mt-14 rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6 relative"
          >
          <span class="ml-4 text-gray-700 absolute top-[-30px] left-[-15px] z-0 "
              >Total: {{ structures.length }} structures</span
            >

            <h3
              class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2 text-center"
            >
              Gérer mes structures
            </h3>

            <div
              v-for="structure in paginatedStructures()"
              :key="structure.id"
              class="post-field flex w-full items-center border-b border-b-solid border-light-grey pb-5"
            >
              <div class="w-1/4">
                <p class="font-medium">{{ structure.antenna }}</p>
              </div>
              <div class="w-2/4">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="categoryKey in structure.categories"
                    :key="categoryKey"
                    class="bg-gray-100 px-2 py-1 rounded-md text-sm text-gray-700"
                  >
                    {{ getCategoryLabel(categoryKey) }}
                  </span>
                </div>
              </div>
              <div class="w-1/4 flex justify-end gap-4 font-poppins">
                <p
                  class="text-light-grey underline cursor-pointer"
                  @click="openEditModal(structure)"
                >
                  Modifier
                </p>
                <p
                  class="text-light-grey underline cursor-pointer"
                  @click="deleteStructure(structure.id)"
                >
                  Supprimer
                </p>
              </div>
            </div>
          </div>

          <!-- Pagination -->
          <div class="pagination mt-6 flex justify-center items-center gap-3">
            <button
              @click="changePage(currentPage - 1)"
              :disabled="currentPage === 1"
              class="bg-purple text-white px-3 py-1 rounded-md"
            >
              &laquo;
              <!-- Flèche gauche -->
            </button>

            <span v-if="totalPages() > 1">
              <button
                v-if="currentPage > 2"
                @click="changePage(1)"
                class="bg-purple text-white px-3 py-1 rounded-md"
              >
                1
              </button>
              <span v-if="currentPage > 3">...</span>

              <button
                v-for="page in visiblePages()"
                :key="page"
                @click="changePage(page)"
                class="bg-purple text-white px-3 py-1 rounded-md"
              >
                {{ page }}
              </button>

              <span v-if="currentPage < totalPages() - 2">...</span>
              <button
                v-if="currentPage < totalPages() - 1"
                @click="changePage(totalPages())"
                class="bg-purple text-white px-3 py-1 rounded-md"
              >
                {{ totalPages() }}
              </button>
            </span>

            <button
              @click="changePage(currentPage + 1)"
              :disabled="currentPage === totalPages()"
              class="bg-purple text-white px-3 py-1 rounded-md"
            >
              &raquo;
              <!-- Flèche droite -->
            </button>
          </div>
        </div>
      </div>

      <ModalCreate :visible="isModalVisible" @close="closeModal">
        <h2 class="text-xl font-bold mb-4">
          {{
            isEditing ? "Modifier la structure" : "Créer une nouvelle structure"
          }}
        </h2>
        <form
          @submit.prevent="isEditing ? updateStructure() : createStructure()"
          class="scrollable-form"
        >
          <div class="mb-4">
            <label
              for="address"
              class="block text-sm font-medium text-gray-700 w-full"
              >Adresse</label
            >
            <input
              type="text"
              ref="autocompleteInput"
              placeholder="Entrez une adresse"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            />
          </div>

          <!-- Boucle pour les champs du formulaire -->
          <div v-for="field in fields" :key="field.id" class="mb-4">
            <label
              :for="field.id"
              class="block text-sm font-medium text-gray-700"
              >{{ field.label }}</label
            >

            <!-- Utiliser un input pour les autres champs -->
            <input
              v-model="newStructure[field.model]"
              :type="field.type"
              :id="field.id"
              class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
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

          <button
            type="submit"
            class="bg-purple text-white py-2 px-4 rounded-md"
          >
            {{ isEditing ? "Modifier" : "Créer" }}
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
          {
            key: "category-20",
            label:
              "Une association accompagnant la sortie d'un réseau d'exploitation sexuelle",
          },
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
          {
            key: "category-8",
            label: "Sortir d'un réseau d'exploitation sexuelle",
          },
          { key: "category-9", label: "Trouver des préservatifs" },
          {
            key: "category-10",
            label:
              "Trouver du matériel de consommation de drogue à moindre risque",
          },
          { key: "category-11", label: "Déposer plainte" },
        ],
      },
      showNotificationPopup: false,
    };
  },
  methods: {

    async initGoogleMaps() {
      try {
        const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

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
    paginatedStructures() {
      if (!Array.isArray(this.structures)) {
        console.error("structures n'est pas un tableau :", this.structures);
        return [];
      }

      let filteredStructures = this.structures.filter((structure) => {
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