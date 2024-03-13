<template>
  <div>
    <RouterLink :to="'/artist/' + id ">{{ name }}</RouterLink>
    <p v-if="disambiguation" class="text-sm text-gray-500">{{ disambiguation }}</p>
  </div>
</template>

<script>
export default {
  name: 'ArtistResult',
  props: {
    name: String,
    id: String,
    disambiguation: String
  }
}
</script>

<style scoped>

</style>
