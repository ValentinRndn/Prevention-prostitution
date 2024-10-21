<template>
  <div class="container mx-auto">
    <div class="relative sm:hidden">
      <img :src="`../../backend/${article.image}`" alt="Article Image" class="w-full h-[500px] object-cover">
      <div class="absolute bottom-1/2 left-0 right-0 text-center text-white text-5xl font-bold font-cgothic">
        <div>{{ article.title }}</div>
        <div class="info-post flex text-center justify-center items-center mt-5 gap-5">
          <h2 class="text-3xl">Par {{ article.author }}</h2>
          <h2 class="text-3xl">- {{ formatDate(article.date) }}</h2>
        </div>
      </div>
      <router-link to="/blog">
        <img class="absolute top-5 left-5" src="../../assets/blog/back_arrow.svg" alt="back_arrow">
      </router-link>
    </div>

    <p v-html="article.content"></p>
  </div>

  <Footer />
</template>

<script>
import Footer from "../../components/Footer.vue";
import { showBlog } from "../../services/BlogsService";

export default {
  components: {
    Footer,
  },
  data() {
    return {
      article: {},
    };
  },
  methods: {
    formatDate(dateString) {
      const date = new Date(dateString);
      const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
      return formattedDate;
    }
  },
  async created() {
    const id = this.$route.params.id;
    try {
      const data = await showBlog(id);
      this.article = data;
    } catch (error) {
      console.error("Error fetching the article:", error);
    }
  }
};

</script>