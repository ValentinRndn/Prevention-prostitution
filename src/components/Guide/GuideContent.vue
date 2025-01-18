<template>
  <div>
    <div class="button-container flex gap-5 mx-10">
      <button
        v-for="(category, index) in categories"
        :key="index"
        @click="loadCategory(category)"
        :class="['button-prostitution border border-solid border-light-grey py-2 px-6 text-lg font-cgothic', { 'bg-purple text-white': selectedCategory === category }]"
      >
        {{ formatCategory(category) }}
      </button>
    </div>

    <div class="documents-container mt-14 mx-10 grid gap-5 grid-cols-3 
      sm:grid-cols-1 
      md:grid-cols-2 
      lg:grid-cols-3
      xl:grid-cols-3"
    >
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="doc-container flex flex-col items-center justify-center text-center gap-3"
      >
        <!-- Lien vers le PDF -->
        <a :href="doc.pdf" target="_blank" rel="noopener noreferrer">
          <!-- Image -->
          <img :src="doc.image" class="w-full h-[250px] object-cover" :alt="doc.title" />
        </a>
        <!-- Autres détails -->
        <a :href="doc.link" target="_blank" rel="noopener noreferrer">
          <h3 class="w-full font-semibold">{{ doc.title }}</h3>
        </a>
        <p class="w-full">{{ doc.description }}</p>
      </div>
    </div>
  </div>
</template>



<script>
import { getGuideByCategory } from '../../services/GuideService.js';

const apiUrl = import.meta.env.VITE_API_URL;
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
    formatCategory(category) {
    return category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
  },
    async loadCategory(category) {
      this.selectedCategory = category;
      try {
        const response = await getGuideByCategory(category);
        this.documents = response.map(doc => ({
          id: doc._id,
          title: doc.title,
          description: doc.description,
          category: doc.category,
          image: `${apiUrl}/${doc.image}`,
          pdf: `${apiUrl}/${doc.pdf}`  
        }));
      } catch (error) {
        console.error('Error fetching documents:', error);
      }
    }
  },
  mounted() {
    if (this.categories.length > 0) {
      this.loadCategory(this.categories[0]);
    }
    console.log('Mounted documents:', this.documents.map(doc => ({ pdf: doc.pdf, image: doc.image })));
  }
};
</script>

<style>
  
.button-prostitution.bg-blue-500 {
  background-color: #4299e1; 
}
.button-prostitution.text-white {
  color: white;
}
</style>
