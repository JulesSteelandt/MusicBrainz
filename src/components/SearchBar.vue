<!-- SearchBar.vue -->
<template>
  <div class="search-bar">
    <input type="text" v-model="query" @input="search" placeholder="Recherche...">
  </div>
</template>

<script>
export default {
  name: 'SearchBar',
  data() {
    return {
      query: ''
    }
  },
  methods: {
    search() {
      this.$emit('search', this.query);
    }
  }
}
</script>

<style scoped>

</style>
