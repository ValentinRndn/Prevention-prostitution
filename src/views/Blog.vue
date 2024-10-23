<template>
  <div>
    <div class="header-banner bg-banner-blog w-full h-[350px] bg-cover relative">
      <div class="absolute bottom-0 left-0 right-0 text-center">
        <div class="bg-white inline-block text-purple-fonce text-5xl py-6 px-24 rounded-t-2xl font-bold font-cgothic">ARTICLES & NEWS</div>
      </div>
    </div>

    <!-- Epinglés -->
    <div class="text flex justify-start items-center pt-12 mt-12 max-w-[1000px] mx-auto">
      <h1 class="flex text-3xl text-purple-fonce font-bold font-cgothic">
        ÉPINGLÉS
      </h1>
    </div>

    <div class="header-content flex gap-12 justify-center items-center bg-white mx-auto mt-6">
      <div v-for="article in epingleArticles" :key="article._id" class="card w-[300px] h-[375px] object-cover rounded-[25px] overflow-hidden p-4 shadow-xl border border-solid border-slate-300 relative">
        <img :src="`../backend/${article.image}`" alt="article image" class="rounded-t-[25px] h-[180px] w-full object-cover" />
        <p class="text-3xl font-bold font-c-gothic text-post-grey">{{ article.title }}</p>
        <p class="text text-grey font-jost-sans absolute bottom-4">{{ formatDate(article.date) }}</p>
        <router-link :to="{ name: 'BlogDetail', params: { id: article._id } }" class="arrow text-xl text-grey absolute bottom-3 right-4 font-bold bg-light-beige p-2 px-3 rounded-full">
          >
        </router-link>
      </div>
    </div>

    <!-- Dernier POST -->
    <div class="text flex justify-start items-center pt-12 mt-12 max-w-[1000px] mx-auto">
      <h1 class="flex text-3xl text-purple-fonce font-bold font-cgothic">
        DERNIER POST
      </h1>
    </div>

    <div class="bg-alveoles h-auto z-0 bg-cover relative mx-4 mt-6">
      <div v-if="lastArticle" class="programme flex justify-center items-center max-w-[1000px] gap-10 md:flex-col mx-auto bg-white p-4 shadow-xl rounded-3xl">
        <div class="image-programme w-1/2">
          <img :src="`../backend/${lastArticle.image}`" alt="article image" class="rounded-t-[25px] h-[300px] w-full object-cover" />
        </div>
        <div class="content-programme w-1/2 flex flex-col gap-6">
          <h3 class="text-3xl font-bold font-c-gothic text-post-grey">{{ lastArticle.title }}</h3>
          <p class="text-md font-jost-sans text-program-grey" v-html="truncatedcontent(lastArticle.content)"></p>
          <div class="bottom-content flex items-center justify-between">
            <p class="text-grey font-jost-sans">{{ formatDate(lastArticle.date) }}</p>
            <router-link :to="{ name: 'BlogDetail', params: { id: lastArticle._id } }" class="arrow text-xl text-grey inline-block font-bold bg-light-beige p-2 px-3 rounded-full">></router-link>
          </div>
        </div>
      </div>

      <!-- LES ARTICLES & NEWS POSTS -->
      <div class="text flex justify-start items-center pt-12 mt-12 max-w-[1000px] mx-auto">
        <h1 class="flex text-3xl text-purple-fonce font-bold font-cgothic">
          LES ARTICLES & NEWS
        </h1>
      </div>

      <!-- Articles Grid -->
      <div class="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-4 gap-12 justify-center items-center mt-6 mx-auto max-w-[1350px]">
        <div v-for="article in paginatedArticles" :key="article._id" class="card w-[300px] h-[375px] object-cover rounded-[25px] overflow-hidden p-4 shadow-xl border border-solid border-slate-300 relative bg-white">
          <img :src="`../backend/${article.image}`" alt="article image" class="rounded-t-[25px] h-[180px] w-full object-cover" />
          <p class="text-3xl font-bold font-c-gothic text-post-grey">{{ article.title }}</p>
          <p class="text text-grey font-jost-sans absolute bottom-4">{{ formatDate(article.date) }}</p>
          <router-link :to="{ name: 'BlogDetail', params: { id: article._id } }" class="arrow text-xl text-grey absolute bottom-3 right-4 font-bold bg-light-beige p-2 px-3 rounded-full">></router-link>
        </div>
      </div>

      <!-- Pagination -->
      <div class="pagination mt-6 flex justify-center gap-3">
        <button v-for="page in totalPages" :key="page" @click="changePage(page)" :class="['bg-purple text-white px-3 py-1 rounded-md', { 'bg-gray-300': currentPage === page }]">
          {{ page }}
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import Footer from "../components/Footer.vue";
import { showAllBlogs, showLastBlog } from "../services/BlogsService";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      articles: [],
      lastArticle: null,
      currentPage: 1,
      articlesPerPage: 12, // Number of articles per page (4 columns x 3 rows)
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    },
    truncatedcontent(content) {
      return content.length > 300 ? content.substring(0, 300) + '...' : content;
    },
    changePage(page) {
      this.currentPage = page;
    },
  },
  computed: {
    epingleArticles() {
      return this.articles.filter(article => article.pin);
    },
    notArchivedArticles() {
      return this.articles.filter(article => !article.archive);
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.articlesPerPage;
      const end = start + this.articlesPerPage;
      return this.notArchivedArticles.slice(start, end);
    },
    totalPages() {
      return Math.ceil(this.notArchivedArticles.length / this.articlesPerPage);
    }
  },
  async mounted() {
    try {
      this.articles = await showAllBlogs();
      this.lastArticle = await showLastBlog();
    } catch (error) {
      console.error("Failed to fetch articles or last article:", error);
    }
  },
};
</script>

<style scoped>
.header-banner {
  z-index: 1;
}

.content-container {
  z-index: 2;
}

.cards {
  display: grid;
  gap: 1rem;
}

.pagination button {
  cursor: pointer;
  transition: background-color 0.2s;
}

.pagination button:hover {
  background-color: #9f7aea;
}
</style>
