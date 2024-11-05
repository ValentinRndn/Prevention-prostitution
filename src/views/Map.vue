<template>
    <div class="bg-back-carto flex h-[80vh] bg-cover bg-no-repeat">
        <div class="w-[50vw] flex justify-center items-center md:w-full md:bg-back-carto-left md:bg-cover">
            <div class="flex flex-col w-[400px] h-[200px] justify-center font-cgothic gap-4  ">
                <button class="bg-purple-fonce text-white flex items-center justify-center gap-2 font-jost-sans font-semibold text-xl py-6 rounded-md  hover:bg-purple transition-colors duration-300 group">
                <router-link to="/cartographie/Particulier">
                    Je suis en situation de prostitution
                </router-link>
                 <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="transition-transform duration-300 transform group-hover:translate-x-2">
                <path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
                </svg>
                </button>

                <button class="bg-purple text-white flex items-center justify-center gap-2 font-jost-sans font-semibold text-xl py-6 rounded-md hover:bg-purple-fonce transition-colors duration-300 group">
                    <router-link to="/cartographie/Professionel">
                        Je suis professionnel ou témoin
                    </router-link>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" class="transition-transform duration-300 transform group-hover:translate-x-2">
                    <path fill="currentColor" d="M16.175 13H5q-.425 0-.712-.288T4 12t.288-.712T5 11h11.175l-4.9-4.9q-.3-.3-.288-.7t.313-.7q.3-.275.7-.288t.7.288l6.6 6.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-6.6 6.6q-.275.275-.687.275T11.3 19.3q-.3-.3-.3-.712t.3-.713z"/>
                    </svg>
                </button>

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
