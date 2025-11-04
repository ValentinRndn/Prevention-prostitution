<template>
    <div class="flex flex-col">
      <div class="bg-banner-contact w-full h-[350px] bg-cover relative max-sm:hidden">
        <div class="absolute bottom-0 left-0 right-0 text-center">
          <div class="bg-white inline-block text-purple-fonce text-5xl py-6 px-24 rounded-t-2xl font-bold font-cgothic max-sm:px-8 max-sm:text-4xl">DOCUMENTATION</div>
        </div>
      </div>
  
      <div class="header-banner bg-banner-contact-mobile w-full h-[350px] bg-cover relative hidden max-sm:block">
        <div class="absolute bottom-0 left-0 right-0 text-center">
          <div class="bg-white inline-block text-purple-fonce text-5xl py-6 px-24 rounded-t-2xl font-bold font-cgothic max-sm:px-8 max-sm:text-4xl">DOCUMENTATION</div>
        </div>
      </div>
      
      <!-- Nouvelle section introduisant le guide -->
      <div class="mt-12 py-12 px-6 max-w-5xl mx-auto text-center max-md:text-left max-md:mt-2">
        <h1 class="text-4xl max-md:text-3xl font-bold text-grey mb-6 font-cgothic">
          Guide d'Accompagnement des Personnes en Situation de Prostitution en Normandie
        </h1>
        <h2 class="text-2xl font-semibold text-purple-fonce mb-4">
          Un Outil Essentiel pour les Personnes Concernées, les Témoins et les Professionnels
        </h2>
        <p class="text-gray-700 text-lg leading-relaxed ">
          Ce guide a été conçu pour fournir des informations claires et accessibles aux Personnes en Situation de Prostitution (PSP), ainsi qu'aux témoins, professionnels du social, du médical et du juridique souhaitant mieux comprendre et accompagner ces publics.
        </p>
      </div>
      
      <!-- Section des boutons (originale) -->
      <div class="flex flex-col justify-center font-cgothic gap-4 w-[400px] mx-auto mb-16 max-md:w-full max-md:px-4">
        <button class="bg-purple-fonce text-white flex items-center justify-center gap-2 font-jost-sans font-semibold text-xl py-6 rounded-md max-md:shadow-md hover:bg-purple transition-colors duration-300 group">
          <router-link to="/guides/particuliers" class="flex items-center justify-center w-full">
            Documentation pour PSP
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="ml-2 transition-transform duration-300 transform group-hover:translate-x-2">
              <path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
            </svg>
          </router-link>
        </button>

        <button class="bg-purple text-white flex items-center justify-center gap-2 font-jost-sans font-semibold text-xl py-6 rounded-md max-md:shadow-md hover:bg-purple-fonce transition-colors duration-300 group">
          <router-link to="/guides/professionnels" class="flex items-center justify-center w-full">
            Documentation pour Professionnels
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="ml-2 transition-transform duration-300 transform group-hover:translate-x-2">
              <path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
            </svg>
          </router-link>
        </button>

      </div>
  
      <!-- NOUVELLE MISE EN PAGE POUR LES SECTIONS D'INFORMATION -->
      <div class="bg-gray-50 py-16 px-4">
        <div class="max-w-6xl mx-auto">
          <!-- Section 1: Pourquoi consulter ce guide -->
          <div class="grid grid-cols-2 max-md:grid-cols-1 gap-8 mb-20">
            <div class="max-md:col-span-1">
              <div class="sticky top-10 max-md:static">
                <h2 class="text-3xl font-bold text-gray-800 mb-6 font-cgothic">Pourquoi consulter ce guide ?</h2>
                <p class="text-gray-600 mb-4">
                  Les Personnes en Situation de Prostitution rencontrent souvent des difficultés multiples : précarité, violences, isolement, problèmes de santé et obstacles à l'accès aux droits.
                </p>
                <div class="hidden max-md:block">
                  <div class="mt-8 bg-purple-fonce h-1 w-20 rounded-full"></div>
                </div>
              </div>
            </div>
  
            <div class="max-md:col-span-1">
              <div class="bg-white rounded-xl shadow-lg p-8 border-t-4 border-purple-fonce">
                <div class="grid grid-cols-2 max-md:grid-cols-1 gap-6">
                  <div class="card-item">
                    <div class="p-4 bg-purple-fonce/10 rounded-lg flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-purple-fonce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                      </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 text-gray-800">Connaître les dispositifs d'aide</h3>
                    <p class="text-gray-600">Accédez aux dispositifs d'aide disponibles en Normandie adaptés à votre situation.</p>
                  </div>
                  
                  <div class="card-item">
                    <div class="p-4 bg-purple-fonce/10 rounded-lg flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-purple-fonce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 text-gray-800">Accéder aux services spécialisés</h3>
                    <p class="text-gray-600">Services sociaux, médicaux et juridiques adaptés aux besoins spécifiques.</p>
                  </div>
                  
                  <div class="card-item">
                    <div class="p-4 bg-purple-fonce/10 rounded-lg flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-purple-fonce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 text-gray-800">Comprendre vos droits</h3>
                    <p class="text-gray-600">Informations sur vos droits et les démarches pour une meilleure protection.</p>
                  </div>
                  
                  <div class="card-item">
                    <div class="p-4 bg-purple-fonce/10 rounded-lg flex items-center justify-center mb-4">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-purple-fonce" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                    <h3 class="font-semibold text-lg mb-2 text-gray-800">Solutions d'accompagnement</h3>
                    <p class="text-gray-600">Hébergement, réinsertion, soutien psychologique et autres formes d'aide.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section 2: Que contient ce guide -->
          <div class="mb-20">
            <div class="text-center mb-12">
              <div class="bg-purple inline-block px-4 py-1 rounded-full text-white text-sm font-bold uppercase tracking-wide mb-4">Contenu détaillé</div>
              <h2 class="text-3xl font-bold text-gray-800 mb-6 font-cgothic">Que contient ce guide ?</h2>
              <div class="h-1 w-24 bg-purple-fonce mx-auto rounded-full"></div>
            </div>
            
            <div class="grid grid-cols-2 max-md:grid-cols-1 gap-8">
              <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div class="p-6 border-l-4 border-purple-fonce">
                  <h3 class="font-bold text-xl mb-3 text-gray-800 flex items-center">
                    <span class="w-8 h-8 bg-purple-fonce text-white rounded-full flex items-center justify-center mr-3">1</span>
                    Informations sur les droits et protections
                  </h3>
                  <p class="text-gray-600 pl-11">
                    Cadre juridique, aides sociales, démarches administratives et accès aux droits fondamentaux pour les PSP.
                  </p>
                </div>
              </div>
              
              <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div class="p-6 border-l-4 border-purple">
                  <h3 class="font-bold text-xl mb-3 text-gray-800 flex items-center">
                    <span class="w-8 h-8 bg-purple text-white rounded-full flex items-center justify-center mr-3">2</span>
                    Ressources pour les témoins et proches
                  </h3>
                  <p class="text-gray-600 pl-11">
                    Comment signaler une situation préoccupante, vers qui se tourner et comment soutenir efficacement.
                  </p>
                </div>
              </div>
              
              <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div class="p-6 border-l-4 border-purple-fonce">
                  <h3 class="font-bold text-xl mb-3 text-gray-800 flex items-center">
                    <span class="w-8 h-8 bg-purple-fonce text-white rounded-full flex items-center justify-center mr-3">3</span>
                    Annuaire des structures d'aide
                  </h3>
                  <p class="text-gray-600 pl-11">
                    Services d'accompagnement social, de santé et d'aide juridique disponibles en Normandie.
                  </p>
                </div>
              </div>
              
              <div class="bg-white rounded-xl shadow-sm hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div class="p-6 border-l-4 border-purple">
                  <h3 class="font-bold text-xl mb-3 text-gray-800 flex items-center">
                    <span class="w-8 h-8 bg-purple text-white rounded-full flex items-center justify-center mr-3">4</span>
                    Conseils pour réduire les risques
                  </h3>
                  <p class="text-gray-600 pl-11">
                    Prévention des IST, soutien psychologique, hébergement d'urgence et autres recommandations pratiques.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Section 3: Qui peut utiliser ce guide -->
          <div class="bg-white rounded-xl shadow-xl p-8 relative overflow-hidden">
            <div class="absolute top-0 right-0 w-32 h-32 bg-purple-fonce/10 rounded-bl-full"></div>
            
            <h2 class="text-3xl font-bold text-gray-800 mb-8 font-cgothic">Qui peut utiliser ce guide ?</h2>
            
            <div class="grid grid-cols-3 max-md:grid-cols-1 gap-8">
              <div class="bg-gradient-to-br from-purple-fonce/5 to-purple/5 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div class="mb-5 flex justify-center">
                  <div class="w-16 h-16 bg-purple-fonce rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
                <h3 class="font-bold text-xl text-center mb-3 text-gray-800">Personnes en Situation de Prostitution</h3>
                <p class="text-gray-600 text-center">
                  Cherchant à accéder à leurs droits et à des aides adaptées à leur situation spécifique.
                </p>
              </div>
              
              <div class="bg-gradient-to-br from-purple-fonce/5 to-purple/5 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div class="mb-5 flex justify-center">
                  <div class="w-16 h-16 bg-purple rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </div>
                </div>
                <h3 class="font-bold text-xl text-center mb-3 text-gray-800">Témoins et Proches</h3>
                <p class="text-gray-600 text-center">
                  Souhaitant aider et orienter les PSP vers les dispositifs adaptés à leurs besoins.
                </p>
              </div>
              
              <div class="bg-gradient-to-br from-purple-fonce/5 to-purple/5 rounded-xl p-6 hover:shadow-md transition-shadow duration-300">
                <div class="mb-5 flex justify-center">
                  <div class="w-16 h-16 bg-purple-fonce rounded-full flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                </div>
                <h3 class="font-bold text-xl text-center mb-3 text-gray-800">Professionnels</h3>
                <p class="text-gray-600 text-center">
                  De la santé, du social et du droit en contact avec les personnes concernées par la prostitution.
                </p>
              </div>
            </div>
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
  .card-item {
    transition: all 0.3s ease;
  }
  
  .card-item:hover {
    transform: translateY(-5px);
  }
  </style>