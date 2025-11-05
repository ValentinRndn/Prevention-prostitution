<template>
  <div>
    <GuideContent :categories="['info-generale', 'eure', 'calvados', 'seine-maritime', 'manche', 'orne']" />
  </div>
</template>

<script>
import GuideContent from "../components/Guide/GuideContent.vue";

export default {
  components: {
    GuideContent,
  },
};
</script>

<style scoped>
/* Styles spécifiques si nécessaire */
</style>
