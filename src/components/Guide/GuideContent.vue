<template>
  <div>
    <div class="button-container flex gap-5 mx-10">
      <button
        v-for="(category, index) in categories"
        :key="index"
        @click="loadCategory(category)"
        :class="['button-prostitution border border-solid border-light-grey py-2 px-6 text-lg font-cgothic', { 'bg-purple text-white': selectedCategory === category }]"
      >
        {{ category }}
      </button>
    </div>

    <div class="documents-container mt-14 mx-10 flex gap-5 flex-wrap">
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="doc-container w-[300px] flex flex-col items-center justify-center text-center gap-3"
      >
        <!-- Utilisez un lien pour ouvrir le PDF dans une nouvelle fenêtre -->
        <a :href="`../api/${doc.pdf}`" target="_blank" rel="noopener noreferrer">
          <img :src="`../api/${doc.image}`" class="w-full h-[400px] object-cover" :alt="doc.titre" />
        </a>
        <a :href="doc.lien" target="_blank" rel="noopener noreferrer">
          <h3 class="w-full font-semibold">{{ doc.titre }}</h3>
        </a>
        <p class="w-full">{{ doc.description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getGuideByCategory } from '../../services/GuideService.js';

export default {
  name: 'GuideContent',
  props: {
    categories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      documents: [],
      selectedCategory: ''
    };
  },
  methods: {
    async loadCategory(category) {
      this.selectedCategory = category;
      try {
        const response = await getGuideByCategory(category);
        this.documents = response.map(doc => ({
          id: doc.id,
          titre: doc.titre,
          description: doc.description,
          lien: doc.lien,
          image: doc.image,
          categorie: doc.categorie,
          pdf: doc.pdf
        }));
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }
  },
  mounted() {
    // Charger la première catégorie par défaut
    if (this.categories.length > 0) {
      this.loadCategory(this.categories[0]);
    }
  }
};
</script>

<style>

.button-prostitution.bg-blue-500 {
  background-color: #4299e1; /* Couleur bleue par défaut */
}
.button-prostitution.text-white {
  color: white;
}
</style>
