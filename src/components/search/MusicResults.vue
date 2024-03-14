<template>
  <!-- Conteneur pour afficher les informations sur la musique -->
  <div class="max-w-lg mx-auto">
    <!-- Lien vers la page de détails de la musique -->
    <RouterLink :to="'/title/' + id" class="text-xl">{{ title }}</RouterLink>
    <!-- Liste des artistes associés à la musique -->
    <ul class="pl-4 list-none">
      <!-- Parcours des artistes -->
      <li v-for="(artist, index) in artists" :key="index" class="text-s text-gray-500">
        <!-- Lien vers la page de détails de l'artiste -->
        <RouterLink :to="'/artist/' + artist.artist.id">{{ artist.name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    title: String, // Propriété pour le titre de la musique (de type chaîne de caractères)
    artists: Array, // Propriété pour la liste des artistes associés à la musique (de type tableau)
    id: String, // Propriété pour l'identifiant de la musique (de type chaîne de caractères)
  }
}
</script>
