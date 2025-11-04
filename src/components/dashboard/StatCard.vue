<template>
  <div class="stat-card bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
    <div class="flex items-center justify-between">
      <div class="flex-1">
        <p class="text-sm text-gray-600 font-medium mb-1">{{ title }}</p>
        <p class="text-3xl font-bold" :class="colorClass">{{ displayValue }}</p>
        <p v-if="subtitle" class="text-xs text-gray-500 mt-2">{{ subtitle }}</p>
      </div>
      <div class="flex items-center justify-center w-14 h-14 rounded-full" :class="bgColorClass">
        <svg v-if="icon === 'users'" class="w-7 h-7" :class="iconColorClass" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z"/>
        </svg>
        <svg v-else-if="icon === 'chart'" class="w-7 h-7" :class="iconColorClass" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z"/>
        </svg>
        <svg v-else-if="icon === 'document'" class="w-7 h-7" :class="iconColorClass" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"/>
        </svg>
        <svg v-else-if="icon === 'clock'" class="w-7 h-7" :class="iconColorClass" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"/>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatCard',
  props: {
    title: {
      type: String,
      required: true
    },
    value: {
      type: [String, Number],
      required: true
    },
    icon: {
      type: String,
      default: 'chart'
    },
    color: {
      type: String,
      default: 'gold',
      validator: (value) => ['gold', 'gold-dark', 'grey'].includes(value)
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  computed: {
    displayValue() {
      if (typeof this.value === 'number') {
        return this.value.toLocaleString('fr-FR');
      }
      return this.value;
    },
    colorClass() {
      const colors = {
        'gold': 'text-[#f5c77e]',
        'gold-dark': 'text-[#f1b04c]',
        'grey': 'text-[#3E3E3E]'
      };
      return colors[this.color] || colors.gold;
    },
    bgColorClass() {
      const colors = {
        'gold': 'bg-[#fef7ed]',
        'gold-dark': 'bg-[#fdf5e6]',
        'grey': 'bg-gray-100'
      };
      return colors[this.color] || colors.gold;
    },
    iconColorClass() {
      const colors = {
        'gold': 'text-[#f5c77e]',
        'gold-dark': 'text-[#f1b04c]',
        'grey': 'text-[#3E3E3E]'
      };
      return colors[this.color] || colors.gold;
    }
  }
};
</script>

<style scoped>
.stat-card {
  border: 1px solid #e5e7eb;
}
</style>
