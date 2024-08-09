<template>
  <router-link :to="`/episode/${episode?.id}`" class="episode-card">
    <h4 class="episode-card__name">{{ episode?.name }}</h4>
    <h5 class="episode-card__date">{{ episode?.air_date }}</h5>
    <h3 class="episode-card__code">{{ episode?.episode }}</h3>
  </router-link>
</template>

<script setup>
const { episode } = defineProps(["episode"]);
</script>

<style lang="scss" scoped></style>
