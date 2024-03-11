<template>
  <div class="search-bar flex flex-col sm:flex-row items-center justify-center mt-8">
    <select v-model="searchBy" @change="reset" class="mr-2 mb-2 sm:mb-0 sm:mr-2 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none">
      <option value="title">Titre</option>
      <option value="artist">Artiste</option>
    </select>
    <div class="relative mb-2 sm:mb-0">
      <input type="text" v-model="query" @input="search" placeholder="Recherche..." class="py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent border border-gray-300">
      <div class="absolute inset-y-0 right-0 flex items-center pr-3">
        <svg class="h-5 w-5 text-gray-400" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
          <path d="M15 15l6-6M9 15l6-6"></path>
        </svg>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: {
    resetOffset: Function
  },
  data() {
    return {
      query: '',
      searchBy: 'title'
    }
  },
  methods: {
    reset(){
      this.$emit('search',this.query, this.searchBy);
    },
    search() {
      this.resetOffset();
      this.$emit('search', this.query, this.searchBy);
    }
  }
}
</script>

