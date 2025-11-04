<template>
  <div class="top-pages-table bg-white p-6 rounded-lg shadow-md">
    <h3 class="text-lg font-bold text-gray-800 mb-4">Top 10 pages visitées</h3>
    <div class="overflow-x-auto">
      <table class="w-full text-sm">
        <thead class="border-b-2 border-gray-200">
          <tr>
            <th class="text-left py-3 px-4 font-semibold text-gray-700">#</th>
            <th class="text-left py-3 px-4 font-semibold text-gray-700">Page</th>
            <th class="text-right py-3 px-4 font-semibold text-gray-700">Vues</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(page, index) in pages"
            :key="page.path"
            class="border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <td class="py-3 px-4 text-gray-600">{{ index + 1 }}</td>
            <td class="py-3 px-4">
              <div class="flex flex-col">
                <span class="font-medium text-gray-800">{{ page.title || page.path }}</span>
                <span class="text-xs text-gray-500">{{ page.path }}</span>
              </div>
            </td>
            <td class="py-3 px-4 text-right">
              <span class="font-semibold text-purple-600">{{ page.views.toLocaleString('fr-FR') }}</span>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="!pages.length" class="text-center text-gray-500 py-8">
        Aucune donnée disponible
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TopPagesTable',
  props: {
    pages: {
      type: Array,
      required: true,
      default: () => []
    }
  }
};
</script>

<style scoped>
.top-pages-table {
  border: 1px solid #e5e7eb;
}
</style>
