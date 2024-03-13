<script>
export default {
  props: {
    title: String,
    artists: Array,
    id: String,
  }
}
</script>

<template>
  <div class="max-w-lg mx-auto">
    <RouterLink :to="'/title/' + id " class="text-xl">{{ title }}</RouterLink>
    <ul class="pl-4 list-none ">
      <li v-for="(artist, index) in artists" :key="index" class="text-s text-gray-500">
        <RouterLink :to="'/artist/' + artist.artist.id " >{{ artist.name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Styles spécifiques au composant */
</style>
