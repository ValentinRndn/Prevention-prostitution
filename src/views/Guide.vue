<template>
  <div class="bg-back-carto flex h-[80vh] bg-cover bg-no-repeat ">
      <div class="w-[50vw] flex justify-center items-center ">
          <div class="flex flex-col w-[400px] h-[200px] justify-center font-cgothic   ">
              <router-link to="/guide/ParticularGuide" class="bg-purple text-white px-4 py-6 w-full rounded-md mt-6 text-md font-bold text-center hover:scale-105 duration-300">JE CHERCHE UN SERVICE</router-link>
              <router-link to="/guide/ProfessionalGuide" class="bg-purple-fonce text-white px-4 py-6 w-full rounded-md mt-6 text-md font-bold text-center hover:scale-105 duration-300">JE SUIS PROFESSIONEL</router-link>


          </div>
          
      </div>
  </div>

  <Footer />
</template>

<script>
import NavigationBar from "../components/NavigationBar.vue";
import Footer from "../components/Footer.vue"

export default {
components: {
    Footer, 
    NavigationBar,
  },
  
};
</script>
