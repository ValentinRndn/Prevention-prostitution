<template>
<div>
    <GuideContent :categories="['general', 'eure', 'calvados', 'seine-maritime', 'manche', 'orne']" />
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