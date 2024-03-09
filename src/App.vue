<template>
  <div>
    <!-- Header -->
    <header class="bg-gray-800 text-white">
      <div class="container mx-auto py-4 px-6">
        <nav class="flex items-center justify-between">
          <div class="flex items-center">
            <RouterLink class="text-2xl font-bold" to="/">MusicBrainz</RouterLink>
          </div>
          <div class="flex items-center space-x-4">
            <RouterLink class="text-white hover:text-gray-300" to="/search">Rechercher</RouterLink>
          </div>
        </nav>
      </div>
    </header>
    <main class="container mx-auto py-8 px-6">
      <RouterView/>
    </main>
  </div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

