<template>
    <div class="bg-back-carto flex h-[80vh] bg-cover bg-no-repeat">
        <div class="w-[50vw] flex justify-center items-center">
            <div class="flex flex-col w-[400px] h-[200px] justify-center font-cgothic   ">
                <router-link to="/cartographie/Particulier" class="bg-purple-fonce text-white px-4 py-6 w-full rounded-md mt-6 text-md font-bold text-center hover:scale-105 duration-300">Je suis en situation de prostitution</router-link>
                <router-link to="/cartographie/Professionel" class="bg-purple text-white px-4 py-6 w-full rounded-md mt-6 text-md font-bold text-center hover:scale-105 duration-300">Je suis professionnel ou témoin</router-link>


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
