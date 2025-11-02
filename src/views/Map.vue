<template>
    <div class="bg-back-carto flex min-h-[80vh] bg-cover bg-no-repeat">
        <div class="w-[50vw] flex justify-center items-center xl:w-full xl:bg-back-carto-left xl:bg-cover">
            <!-- Nouveau contenu pour présenter la cartographie -->
            <div class="bg-white/90 rounded-xl p-8 max-w-[600px] shadow-lg m-8 xl:m-4">
                <h1 class="text-3xl font-bold text-purple-fonce mb-6 font-cgothic">Cartographie des Ressources en Normandie</h1>
                <p class="text-gray-700 text-lg leading-relaxed mb-6">
                    Notre cartographie interactive vous permet de localiser facilement les structures d'aide et d'accompagnement disponibles en Normandie selon vos besoins spécifiques.
                </p>
                
                <div class="grid grid-cols-2 xl:grid-cols-1 gap-4 mb-8">
                    <div class="bg-purple-fonce/10 p-4 rounded-lg">
                        <div class="flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-fonce mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            <h3 class="font-semibold text-gray-800">Géolocalisation</h3>
                        </div>
                        <p class="text-gray-600 text-sm">Trouvez les structures d'aide les plus proches de votre localisation.</p>
                    </div>
                    
                    <div class="bg-purple/10 p-4 rounded-lg">
                        <div class="flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            <h3 class="font-semibold text-gray-800">Filtres personnalisés</h3>
                        </div>
                        <p class="text-gray-600 text-sm">Filtrez selon vos besoins : hébergement, santé, accompagnement juridique, etc.</p>
                    </div>
                    
                    <div class="bg-purple-fonce/10 p-4 rounded-lg">
                        <div class="flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple-fonce mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <h3 class="font-semibold text-gray-800">Informations détaillées</h3>
                        </div>
                        <p class="text-gray-600 text-sm">Coordonnées, horaires, services proposés et modalités d'accès.</p>
                    </div>
                    
                    <div class="bg-purple/10 p-4 rounded-lg">
                        <div class="flex items-center mb-3">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-purple mr-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            <h3 class="font-semibold text-gray-800">Confidentialité</h3>
                        </div>
                        <p class="text-gray-600 text-sm">Navigation anonyme et sécurisée pour préserver votre vie privée.</p>
                    </div>
                </div>

                <!-- Boutons originaux -->
                <div class="flex flex-col font-cgothic gap-4 w-full">
                    <button class="bg-purple-fonce text-white flex items-center justify-center gap-2 font-jost-sans font-semibold text-xl py-6 rounded-md xl:shadow-md hover:bg-purple transition-colors duration-300 group">
                        <router-link to="/cartographie/Particulier" class="flex items-center justify-center w-full">
                            Je suis en situation de prostitution
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="ml-2 transition-transform duration-300 transform group-hover:translate-x-2">
                                <path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
                            </svg>
                        </router-link>
                    </button>

                    <button class="bg-purple text-white flex items-center justify-center gap-2 font-jost-sans font-semibold text-xl py-6 rounded-md xl:shadow-md hover:bg-purple-fonce transition-colors duration-300 group">
                        <router-link to="/cartographie/Professionel" class="flex items-center justify-center w-full">
                            Je suis professionnel ou témoin
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="ml-2 transition-transform duration-300 transform group-hover:translate-x-2">
                                <path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
                            </svg>
                        </router-link>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";

export default {
  components: {
      NavigationBar,
    },
};
</script>

<style scoped>
/* Animation légère au survol des éléments */
.bg-purple-fonce\/10:hover, .bg-purple\/10:hover {
  transform: translateY(-2px);
  transition: transform 0.3s ease;
}
</style>