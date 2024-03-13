<script>
export default {
  props: {
    title: String,
    artists: Array,
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto">
    <h2 class="text-xl">{{ title }}</h2>
    <ul class="pl-4 list-none">
      <li v-for="(artist, index) in artists" :key="index" class="text-s text-gray-500">{{ artist.name }}</li>
    </ul>
  </div>
</template>

<style scoped>
/* Styles spécifiques au composant */
</style>
