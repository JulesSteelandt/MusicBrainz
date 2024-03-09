<script>
export default {
  props: {
    title: String,
    artists: Array,
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto py-8">
    <h2 class="text-3xl font-bold mb-4">{{ title }}</h2>
    <ul class="list-disc pl-4">
      <li v-for="(artist, index) in artists" :key="index" class="text-lg text-gray-800">{{ artist.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
/* Styles spécifiques au composant */
</style>
