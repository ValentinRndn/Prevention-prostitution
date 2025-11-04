<template>
<div>
    <GuideContent :categories="['particulier-info-generale', 'particulier-eure', 'particulier-calvados', 'particulier-seine-maritime', 'particulier-manche', 'particulier-orne', 'particulier-repit-lieu-accueil']" />
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