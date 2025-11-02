<template>
<div>
<<<<<<< HEAD:src/views/Guide/ParticularGuide.vue
    <GuideContent :categories="['service-prostitution', 'service-prostitution-mineur', 'service-repit-lieu-accueil']" />
=======
    <GuideContent :categories="['general', 'eure', 'calvados', 'seine-maritime', 'manche', 'orne']" />
>>>>>>> afe25bf31376d9fcd6ba9e784a6f1971fe9b17bb:src/views/Guide/ContentGuide.vue
  </div>
  
</template>

<script>
import GuideContent from "../../components/Guide/GuideContent.vue"
import NavigationBar from "../../components/NavigationBar.vue";
export default {
    components: {
        GuideContent,
        NavigationBar,
    }
    
    };

</script>

<style>

</style>