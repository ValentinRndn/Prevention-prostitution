<template>
  <div class="dashboard flex bg-back-grey font-poppins">
    <div class="components">
      <HorizontalBar />
      <AdminBar />
    </div>
    <div class="content w-full overflow-y-auto">
      <div class="dashboard-container">
        <div class="update-keys mt-16">
          <div class="flex justify-between items-center mb-6 max-md:flex-col max-md:items-stretch max-md:gap-4">
            <h1 class="text-3xl font-bold text-gray-800">Gestion des documents</h1>
            <button @click="openModal" class="flex items-center justify-center gap-2 px-6 py-3 bg-[#f1b04c] hover:bg-[#d4a159] text-white font-medium rounded-lg shadow-md transition-all duration-200">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"/>
              </svg>
              Nouveau document
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
                placeholder="Rechercher un document par titre ou catégorie..."
                class="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f1b04c] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div class="bg-white rounded-lg shadow-md overflow-hidden">
            <div class="p-6 border-b border-gray-200">
              <h3 class="text-lg font-bold text-gray-800">Tous les documents</h3>
              <p class="text-sm text-gray-600 mt-1">{{ getFilteredDocuments().length }} document{{ getFilteredDocuments().length > 1 ? 's' : '' }} trouvé{{ getFilteredDocuments().length > 1 ? 's' : '' }}</p>
            </div>

            <div class="divide-y divide-gray-200">
              <div v-for="doc in paginatedDocuments()" :key="doc._id" class="p-6 hover:bg-gray-50 transition-colors">
                <div class="flex items-center justify-between max-md:flex-col max-md:items-start max-md:gap-4">
                  <div class="flex items-center gap-4 flex-1">
                    <div class="flex items-center justify-center w-12 h-12 rounded-full bg-[#fef7ed] flex-shrink-0">
                      <svg class="w-6 h-6 text-[#f1b04c]" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
                      </svg>
                    </div>
                    <div class="flex-1 min-w-0">
                      <p class="font-medium text-gray-900 truncate">{{ doc.title }}</p>
                      <p class="text-sm text-gray-600 mt-1">{{ formatCategoryLabel(doc.category) }}</p>
                    </div>
                  </div>
                  <div class="flex gap-3">
                    <button @click="openEditModal(doc)" class="px-4 py-2 text-sm font-medium text-[#f1b04c] hover:bg-[#fef7ed] rounded-md transition-colors">
                      Modifier
                    </button>
                    <button @click="deleteGuide(doc._id)" class="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors">
                      Supprimer
                    </button>
                  </div>
                </div>
              </div>

              <div v-if="!getFilteredDocuments().length" class="p-12 text-center">
                <div class="flex justify-center mb-4">
                  <div class="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100">
                    <svg class="w-8 h-8 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clip-rule="evenodd"/>
                    </svg>
                  </div>
                </div>
                <p class="text-gray-600 font-medium">Aucun document trouvé</p>
                <p class="text-sm text-gray-500 mt-1">{{ searchQuery ? 'Essayez de modifier votre recherche' : 'Commencez par créer votre premier document' }}</p>
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
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
            </svg>
          </div>
          <div>
            <h2 class="text-2xl font-bold text-gray-900">{{ isEditing ? 'Modifier le document' : 'Nouveau document' }}</h2>
            <p class="text-sm text-gray-600">{{ isEditing ? 'Mettez à jour les informations' : 'Ajoutez un document à la bibliothèque' }}</p>
          </div>
        </div>

        <form @submit.prevent="isEditing ? updateGuide() : createGuide()" enctype="multipart/form-data">
          <div class="mb-4">
            <label for="title">Titre du document</label>
            <input v-model="newGuide.title" type="text" id="title" placeholder="Ex: Guide de prévention" required>
          </div>
          <div class="mb-4">
            <label for="description">Description</label>
            <textarea v-model="newGuide.description" id="description" placeholder="Décrivez brièvement le contenu du document..." required></textarea>
          </div>
          <div class="mb-4">
            <label for="category">Catégorie</label>
            <select
              v-model="newGuide.category"
              id="category"
              required
            >
              <option value="" disabled>Sélectionnez une catégorie</option>
              <optgroup label="Documentation Particuliers (PSP)">
                <option value="particulier-info-generale">Information générale (National & Normandie)</option>
                <option value="particulier-eure">Eure (27)</option>
                <option value="particulier-calvados">Calvados (14)</option>
                <option value="particulier-seine-maritime">Seine-Maritime (76)</option>
                <option value="particulier-manche">Manche (50)</option>
                <option value="particulier-orne">Orne (61)</option>
                <option value="particulier-repit-lieu-accueil">Répit - Lieu d'accueil</option>
              </optgroup>
              <optgroup label="Documentation Professionnels">
                <option value="professionnel-info-generale">Information générale (National & Normandie)</option>
                <option value="professionnel-eure">Eure (27)</option>
                <option value="professionnel-calvados">Calvados (14)</option>
                <option value="professionnel-seine-maritime">Seine-Maritime (76)</option>
                <option value="professionnel-manche">Manche (50)</option>
                <option value="professionnel-orne">Orne (61)</option>
                <option value="professionnel-repit-lieu-accueil">Répit - Lieu d'accueil</option>
              </optgroup>
            </select>
          </div>
          <div class="mb-4">
            <label for="image">Image de couverture</label>
            <input @change="onFileChange" type="file" id="image" accept="image/*">
          </div>
          <div class="mb-4">
            <label for="pdf">Fichier PDF</label>
            <input @change="onFileChange" type="file" id="pdf" accept=".pdf">
          </div>
          <button type="submit">
            {{ isEditing ? 'Enregistrer les modifications' : 'Créer le document' }}
          </button>
        </form>
      </ModalCreate>

      
      <NotificationPopup
        :visible="showNotificationPopup"
        message="Le guide a été créé avec succès !"
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
import { getAllGuides, createGuide, deleteGuide, updateGuide } from "../../services/GuideService.js";
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
      currentGuideId: null,
      newGuide: {
        title: '',
        description: '',
        category: '',
      },
      image: null,
      pdf: null,
      documents: [],
      searchQuery: '',
      currentPage: 1,
      documentsPerPage: 8,
      showNotificationPopup: false,
      categoryLabels: {
        // Anciennes catégories (pour compatibilité)
        'service-prostitution': 'Service Prostitution',
        'service-prostitution-mineur': 'Service Prostitution Mineur',
        'professionnel-prostitution': 'Professionnel Prostitution',
        'professionnel-prostitution-mineur': 'Professionnel Prostitution Mineur',

        // Nouvelles catégories Particuliers
        'particulier-info-generale': 'Info générale (National & Normandie)',
        'particulier-eure': 'Eure (27)',
        'particulier-calvados': 'Calvados (14)',
        'particulier-seine-maritime': 'Seine-Maritime (76)',
        'particulier-manche': 'Manche (50)',
        'particulier-orne': 'Orne (61)',
        'particulier-repit-lieu-accueil': 'Répit - Lieu d\'accueil',

        // Nouvelles catégories Professionnels
        'professionnel-info-generale': 'Info générale (National & Normandie)',
        'professionnel-eure': 'Eure (27)',
        'professionnel-calvados': 'Calvados (14)',
        'professionnel-seine-maritime': 'Seine-Maritime (76)',
        'professionnel-manche': 'Manche (50)',
        'professionnel-orne': 'Orne (61)',
        'professionnel-repit-lieu-accueil': 'Répit - Lieu d\'accueil',
      },
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
      this.currentGuideId = doc._id;
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
        category: 'Séléctionnez une catégorie',
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
        this.closeModal();
        this.showNotificationPopup = true;
        
        this.fetchDocuments();
        setTimeout(() => {
      this.showNotificationPopup = false;
    }, 3000); 
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
          this.closeModal();
          this.fetchDocuments();
        }
      } catch (error) {
        console.error('Error updating Guide', error);
      }
    },
    async deleteGuide(id) {
      try {
        await deleteGuide(id);
        this.fetchDocuments();
      } catch (error) {
        console.error('Error deleting Guide', error);
      }
    },
    async fetchDocuments() {
      try {
        const response = await getAllGuides();
        this.documents = response.map(doc => ({
          _id: doc._id,
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
    formatCategoryLabel(category) {
      return this.categoryLabels[category] || category;
    },
    getFilteredDocuments() {
      if (!this.searchQuery) {
        return this.documents;
      }

      const query = this.searchQuery.toLowerCase();
      return this.documents.filter(doc => {
        const titleMatch = doc.title.toLowerCase().includes(query);
        const categoryLabel = this.formatCategoryLabel(doc.category).toLowerCase();
        const categoryMatch = categoryLabel.includes(query);
        return titleMatch || categoryMatch;
      });
    },
    paginatedDocuments() {
      const filtered = this.getFilteredDocuments();
      const start = (this.currentPage - 1) * this.documentsPerPage;
      const end = start + this.documentsPerPage;
      return filtered.slice(start, end);
    },
    totalPages() {
      const filtered = this.getFilteredDocuments();
      return Math.ceil(filtered.length / this.documentsPerPage);
    },
    changePage(page) {
      if (page < 1 || page > this.totalPages()) return;
      this.currentPage = page;
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
  },
  watch: {
    searchQuery() {
      // Reset to first page when searching
      this.currentPage = 1;
    },
  },
  created() {
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
