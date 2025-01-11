<template>
    <aside class="flex flex-col w-calc[2rem + 32px] min-h-[100vh] overflow-hidden p-4 bg-purple ease-out duration-200">
      <div class="arrow_back mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" class="w-[2rem]" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m11 9l1.42 1.42L8.83 14H18V4h2v12H8.83l3.59 3.58L11 21l-6-6z"/></svg>
      </div>
    </aside>
  </template>
  
  
  <script>
  
  
  export default {
    components: {
      Sidebar
    }
  }
  </script>
  
  <style scoped>
    .sidebar {
      width: 100px;
      min-height: 100vh;
      overflow: hidden;
      background-color: purple;
      transition: width 200ms ease-out;
    }
  </style>