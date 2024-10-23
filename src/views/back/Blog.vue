<template>
  <div class="dashboard flex bg-back-grey font-poppins">
    <div class="components">
      <!-- Intégration de la barre latérale -->
      <HorizontalBar />
      <AdminBar />
    </div>
    <div class="content w-full">
      <div class="dashboard-container">
        <div class="update-keys mt-16">
          <div class="button-container flex gap-5">
            <button @click="openModal" class="add-button bg-purple-fonce text-white py-4 px-6 rounded-md shadow-xl font-poppins font-bold text-center hover:scale-105 duration-200">AJOUTER UN NOUVEL ARTICLE</button>
          </div>

          <div class="posts-keys flex flex-col gap-5 w-full bg-white p-4 mt-10 rounded-md shadow-xl font-poppins justify-center md:items-center md:w-full md:h-4/6">
            <h3 class="font-bold border-b border-b-solid border-light-grey pb-5 pt-2 text-center">Gérer mes articles</h3>
           
            <div v-for="article in articles" :key="article._id" :class="['post-field', { 'archived': article.archive }]" class="post-field flex w-full justify-between border-b border-b-solid border-light-grey pb-5 md:flex-col md:items-center">
              <div class="flex items-center">
                <span v-if="article.pin" class="text-purple mr-2">
                  <!-- SVG pour l'icône d'épinglage -->
                </span>
                <p>{{ article.title }}</p>
              </div>
              <div class="edit-post flex gap-4 font-poppins">
                <p class="text-light-grey underline cursor-pointer" @click="toggleArchiveArticle(article)">
                  {{ article.archive ? 'Désarchiver' : 'Archiver' }}
                </p>
                <p class="text-light-grey underline cursor-pointer" @click="openEditModal(article)">Modifier</p>
                <p class="text-light-grey underline cursor-pointer" @click="deleteArticle(article._id)">Supprimer</p>
              </div>
            </div>
            
          </div>
        </div>
      </div>

      <!-- Modal for creating or editing an article -->
      <ModalCreate :visible="isModalVisible" @close="closeModal">
        <h2 class="text-xl font-bold mb-4">{{ isEditing ? 'Modifier l\'article' : 'Créer un nouvel article' }}</h2>
        <form class="scrollable-form" @submit.prevent="isEditing ? updateArticle() : createArticle()">
          <div class="mb-4">
            <label for="title" class="block text-sm font-medium text-gray-700">Titre</label>
            <input v-model="newArticle.title" type="text" id="title" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
          </div>
          <div class="mb-4">
            <label for="date" class="block text-sm font-medium text-gray-700">Date</label>
            <input v-model="newArticle.date" type="date" id="date" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
          </div>
          <div class="mb-4">
            <label for="content" class="block text-sm font-medium text-gray-700">Contenu</label>
            <Editor api-key='neuzqkwdvgbjt7scku3sa3pl9etohbwieqnb9dcu57sm7cnm' v-model="newArticle.content" :init="editorConfig"></Editor>
          </div>
          <div class="mb-4">
            <label for="author" class="block text-sm font-medium text-gray-700">Auteur</label>
            <input v-model="newArticle.author" type="text" id="author" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2" required>
          </div>
          <div class="mb-4">
            <label for="pin" class="block text-sm font-medium text-gray-700">Épinglé</label>
            <input v-model="newArticle.pin" type="checkbox" id="pin">
          </div>
          <div class="mb-4">
            <label for="image" class="block text-sm font-medium text-gray-700">Image</label>
            <input @change="onFileChange" type="file" id="image" class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2">
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
import ModalCreate from "../../components/backOffice/blog/ModalCreate.vue";
import { showAllBlogs, createBlog, deleteBlog, updateBlog, archiveBlog } from "../../services/BlogsService.js";
import Editor from '@tinymce/tinymce-vue';

export default {
  components: {
    AdminBar,
    HorizontalBar,
    ModalCreate,
    Editor,
  },
  data() {
    return {
      editorContent: '',
      editorConfig: {
        apiKey: 'neuzqkwdvgbjt7scku3sa3pl9etohbwieqnb9dcu57sm7cnm',
        setup: (editor) => {
          editor.on('Change', (e) => {
            this.newArticle.content = editor.getContent();
          });
        }
      },
      isModalVisible: false,
      isEditing: false,
      currentArticleId: null,
      newArticle: {
        title: '',
        date: '',
        content: '',
        pin: false,
        archive: false,
        author: '',
      },
      image: null,
      articles: [],
    };
  },
  methods: {
    openModal() {
      this.isModalVisible = true;
      this.isEditing = false;
      this.resetArticleForm();
      document.addEventListener('keydown', this.handleKeydown);
    },
    openEditModal(article) {
  this.isModalVisible = true;
  this.isEditing = true;
  this.currentArticleId = article._id; // Utilisation de _id au lieu de id
  this.newArticle = {
    title: article.title,
    date: article.date,
    content: article.content,
    pin: article.pin,
    archive: article.archive,
    author: article.author,
  };
  document.addEventListener('keydown', this.handleKeydown);
},
    closeModal() {
      this.isModalVisible = false;
      document.removeEventListener('keydown', this.handleKeydown);
    },
    handleKeydown(event) {
      if (event.key === 'Escape') {
        this.closeModal();
      } else if (event.key === 'Enter' && this.isModalVisible) {
        this.isEditing ? this.updateArticle() : this.createArticle();
      }
    },
    onFileChange(event) {
      this.image = event.target.files[0];
    },
    async createArticle() {
  try {
    const formData = new FormData();
    formData.append('title', this.newArticle.title);
    formData.append('date', this.newArticle.date);
    formData.append('content', this.newArticle.content);
    formData.append('pin', this.newArticle.pin); // Assurez-vous que c'est un booléen
    formData.append('archive', this.newArticle.archive); // Assurez-vous que c'est un booléen
    formData.append('author', this.newArticle.author);
    if (this.image) {
      formData.append('image', this.image);
    }

    const response = await createBlog(formData);
    console.log('Article created successfully', response);
    this.closeModal();
    this.refreshArticles();
  } catch (error) {
    console.error('Error creating article', error);
  }
},

    async updateArticle() {
      try {
        const formData = new FormData();
        formData.append('title', this.newArticle.title);
        formData.append('date', this.newArticle.date);
        formData.append('content', this.newArticle.content);
        formData.append('pin', this.newArticle.pin);
        formData.append('author', this.newArticle.author);
        if (this.image) {
          formData.append('image', this.image);
        }

        const response = await updateBlog(this.currentArticleId, formData);
        console.log(this.currentArticleId);
        console.log('Article updated successfully', response);
        this.closeModal();
        this.refreshArticles();
      } catch (error) {
        console.error('Error updating article', error);
      }
    },
    async deleteArticle(id) {
  try {
    await deleteBlog(id); // Utilisation correcte de _id pour l'API
    this.refreshArticles();
  } catch (error) {
    console.error('Error deleting article', error);
  }
},
async toggleArchiveArticle(article) {
  try {
    article.archive = !article.archive;
    const response = await archiveBlog(article._id, { archive: article.archive }); // Utilisation de _id
    console.log('Article archive state toggled successfully', response);
    this.refreshArticles();
  } catch (error) {
    console.error('Error archiving article', error);
  }
},

    resetArticleForm() {
      this.newArticle = {
        title: '',
        date: '',
        content: '',
        pin: false,
        archive: false,
        author: '',
      };
      this.image = null;
    },
    async refreshArticles() {
      try {
        this.articles = await showAllBlogs();
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      }
    },
  },
  async mounted() {
    this.refreshArticles();
  },
};
</script>



<style >
.dashboard-container {
  flex: 1 1 0;
  padding: 2rem;
}

@media (max-width: 768px) {
  .dashboard-container {
    padding-left: 6rem;
  }
}


.scrollable-form {
  max-height: 80vh; /* Limitez la hauthor à 80% de la hauthor de la vue */
  overflow-y: auto; /* Activez le défilement vertical */
  padding: 2rem;
}


/* Style pour les articles archivés */
.archived {
  background-color: #f5f5f5; /* Couleur de fond gris clair pour les articles archivés */
  color: #999; /* Couleur de texte grise pour les articles archivés */
}
</style>
