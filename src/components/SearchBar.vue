<script>
export default {
  name: 'SearchBar',
  props: {
    resetOffset: Function
  },
  data() {
    return {
      query: ''
    }
  },
  methods: {
    search() {
      this.resetOffset();
      this.$emit('search', this.query);
    }
  }
}
</script>

<template>
  <div class="search-bar">
    <input type="text" v-model="query" @input="search" placeholder="Recherche...">
  </div>
</template>
