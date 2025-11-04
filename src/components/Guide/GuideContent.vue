<template>
  <div>
    <!-- Boutons des catégories -->
    <div class="button-container flex gap-5 mx-10">
      <button
        v-for="(category, index) in categories"
        :key="index"
        @click="loadCategory(category)"
        :class="[
          'button-prostitution border border-solid border-light-grey py-2 px-6 text-lg font-cgothic',
          { 'bg-purple text-white': selectedCategory === category },
        ]"
      >
        {{ formatCategory(category) }}
      </button>
    </div>

    <!-- Conteneur des documents -->
    <div
      class="documents-container mt-14 mx-10 flex flex-wrap gap-5 justify-center max-sm:justify-center"
    >
      <div
        v-for="doc in documents"
        :key="doc.id"
        class="doc-container flex flex-col items-center text-center gap-3 w-[300px]"
      >
        <!-- Lien vers le PDF -->
        <a :href="doc.pdf" target="_blank" rel="noopener noreferrer">
          <img
            :src="doc.image"
            class="w-full h-[300px] object-cover rounded-sm"
            :alt="doc.title"
          />
        </a>
        <!-- Détails -->
        <a :href="doc.link" target="_blank" rel="noopener noreferrer">
          <h3
            class="text-lg font-semibold max-w-[250px] mx-auto overflow-hidden text-ellipsis whitespace-nowrap"
          >
            {{ doc.title }}
          </h3>
        </a>
        <p
          class="text-sm max-w-[250px] mx-auto overflow-hidden text-ellipsis whitespace-nowrap"
        >
          {{ doc.description }}
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { getGuideByCategory } from "../../services/GuideService.js";

const apiUrl = import.meta.env.VITE_API_URL;
export default {
  name: "GuideContent",
  props: {
    categories: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      documents: [],
      selectedCategory: "",
    };
  },
  methods: {
    formatCategory(category) {
      const categoryNames = {
        // Anciennes catégories
        'general': 'Tous les guides',
        'service-prostitution': 'Service Prostitution',
        'service-prostitution-mineur': 'Service Prostitution Mineur',
        'service-repit-lieu-accueil': 'Répit - Lieu d\'accueil',
        'professionnel-prostitution': 'Professionnel Prostitution',
        'professionnel-prostitution-mineur': 'Professionnel Prostitution Mineur',

        // Nouvelles catégories Particuliers
        'particulier-info-generale': 'Info générale',
        'particulier-eure': 'Eure',
        'particulier-calvados': 'Calvados',
        'particulier-seine-maritime': 'Seine-Maritime',
        'particulier-manche': 'Manche',
        'particulier-orne': 'Orne',
        'particulier-repit-lieu-accueil': 'Répit - Lieu d\'accueil',

        // Nouvelles catégories Professionnels
        'professionnel-info-generale': 'Info générale',
        'professionnel-eure': 'Eure',
        'professionnel-calvados': 'Calvados',
        'professionnel-seine-maritime': 'Seine-Maritime',
        'professionnel-manche': 'Manche',
        'professionnel-orne': 'Orne',
        'professionnel-repit-lieu-accueil': 'Répit - Lieu d\'accueil'
      };
      return categoryNames[category] || category.replace(/-/g, ' ').replace(/\b\w/g, char => char.toUpperCase());
    },
    async loadCategory(category) {
      this.selectedCategory = category;
      try {
        const response = await getGuideByCategory(category);

        // Trier les documents par date en se basant sur le timestamp contenu dans le nom du PDF
        this.documents = response
          .sort((a, b) => {
            const getTimestamp = (pdfPath) => {
              const match = pdfPath.match(/(\d{13})/); // 13 chiffres = timestamp en ms
              return match ? parseInt(match[1]) : 0;
            };
            return getTimestamp(b.pdf) - getTimestamp(a.pdf);
          })
          .map((doc) => ({
            id: doc._id,
            title: doc.title,
            description: doc.description,
            category: doc.category,
            image: `${apiUrl}/${doc.image}`,
            pdf: `${apiUrl}/${doc.pdf}`,
          }));
      } catch (error) {
        console.error("Error fetching documents:", error);
      }
    },
  },
  mounted() {
    if (this.categories.length > 0) {
      this.loadCategory(this.categories[0]);
    }
    console.log(
      "Mounted documents:",
      this.documents.map((doc) => ({ pdf: doc.pdf, image: doc.image }))
    );
  },
};
</script>
