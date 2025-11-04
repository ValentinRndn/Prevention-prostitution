<!-- src/components/Modal.vue -->
<template>
  <transition name="modal-fade">
    <div
      v-if="visible"
      class="fixed inset-0 flex items-center justify-center z-50 p-4"
      @click.self="close"
    >
      <!-- Backdrop avec blur -->
      <div class="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-sm"></div>

      <!-- Modal content -->
      <div class="relative bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden animate-modal-slide">
        <!-- Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-[#fef7ed] to-white">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-lg bg-[#f1b04c] flex items-center justify-center">
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
              </svg>
            </div>
          </div>
          <button
            @click="close"
            class="text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg p-2 transition-all duration-200"
            aria-label="Fermer"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <!-- Body avec scroll -->
        <div class="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <slot></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'ModalCreate',
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
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  },
  beforeUnmount() {
    document.body.style.overflow = '';
  }
};
</script>

<style scoped>
/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

@keyframes modal-slide {
  from {
    opacity: 0;
    transform: translateY(-20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-modal-slide {
  animation: modal-slide 0.3s ease-out;
}

/* Style pour le formulaire à l'intérieur */
:deep(form) {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

:deep(label) {
  @apply block text-sm font-medium text-gray-700 mb-1;
}

:deep(input[type="text"]),
:deep(input[type="email"]),
:deep(input[type="password"]),
:deep(input[type="file"]),
:deep(textarea),
:deep(select) {
  @apply w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#f1b04c] focus:border-transparent transition-all duration-200;
}

:deep(input[type="file"]) {
  @apply py-2;
}

:deep(textarea) {
  @apply min-h-[100px] resize-y;
}

:deep(button[type="submit"]) {
  @apply mt-4 w-full bg-[#f1b04c] hover:bg-[#d4a159] text-white font-medium py-3 px-6 rounded-lg shadow-md transition-all duration-200 transform hover:scale-[1.02];
}

:deep(.scrollable-form) {
  max-height: calc(90vh - 200px);
  overflow-y: auto;
  padding-right: 0.5rem;
}

/* Scrollbar personnalisée */
:deep(.scrollable-form)::-webkit-scrollbar {
  width: 6px;
}

:deep(.scrollable-form)::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 10px;
}

:deep(.scrollable-form)::-webkit-scrollbar-thumb {
  background: #f1b04c;
  border-radius: 10px;
}

:deep(.scrollable-form)::-webkit-scrollbar-thumb:hover {
  background: #d4a159;
}
</style>
  