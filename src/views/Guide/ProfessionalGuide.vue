<template>
    <GuideContent :categories="['professionnel-info-generale', 'professionnel-eure', 'professionnel-calvados', 'professionnel-seine-maritime', 'professionnel-manche', 'professionnel-orne', 'professionnel-repit-lieu-accueil']" />
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