<template>
  <div class="search-bar flex items-center justify-center mt-8">
    <select v-model="searchBy" class="mr-2 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none">
      <option value="title">Titre</option>
      <option value="artist">Artiste</option>
    </select>
    <input type="text" v-model="query" @input="search" placeholder="Recherche..." class="py-2 px-4 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
    <button @click="search" class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg">
      Rechercher
    </button>
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
    search() {
      this.resetOffset();
      this.$emit('search', this.query, this.searchBy);
    }
  }
}
</script>

