<template>
  <div class="artist-result">
    <h3>{{ name }}</h3>
    <p v-if="disambiguation" class="text-sm text-gray-500">{{ disambiguation }}</p>
  </div>
</template>

<script>
export default {
  name: 'ArtistResult',
  props: {
    name: String,
    disambiguation: String
  }
}
</script>

<style scoped>
/* Styles spécifiques au composant */
.artist-result {
  margin-bottom: 10px;
}
</style>
