<template>
  <div>
    <h2 class="text-2xl">{{ title }}</h2>
    <ul class="list-disc">
      <li v-for="(artist, index) in artists" :key="index">{{ artist.name }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    artists: Array,
  }
}
</script>

<style>
/* Ajoutez des styles si nécessaire */
</style>
