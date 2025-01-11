<template>
  <div class="update-container mt-24 ml-8 bg-white mr-10 p-2 rounded-md font-poppins border-l-8 border-purple ">
    <p>Date de la dernière mise à jour : {{ lastUpdateDate }}</p>
  </div>
</template>

<script>
export default {
    components: {
        name: 'LastUpdate',
    },
    props: {
    lastUpdateDate: {
      type: String, // Ou tout autre type de données approprié
      required: true
    }
  }

}
</script>

<style>

</style>