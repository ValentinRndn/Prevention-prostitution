<!-- src/components/Modal.vue -->
<template>
    <div v-if="visible" class="modal fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div class="modal-content bg-white p-6 rounded-lg shadow-lg w-full max-w-xl">
        <button @click="close" class="close-button font-bold text-grey ">X</button>

        <slot></slot>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    components: {
        name: 'ModalCreate'
    },
    props: {
      visible: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      close() {
        this.$emit('close');
      }
    }
  };
  </script>
  
  <style scoped>
  .modal {
    display: flex;
  }
  .close-button {
    background: none;
    border: none;
    cursor: pointer;
  }
  </style>
  