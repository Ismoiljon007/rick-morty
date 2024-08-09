<template>
  <router-link :to="`/location/${location?.id}`" class="location-card">
    <h4 class="location-card__title">{{ location?.name }}</h4>
    <h5 class="location-card__type">{{ location?.type }}</h5>
  </router-link>
</template>

<script setup>
const { location } = defineProps(["location"]);
</script>

<style lang="scss" scoped></style>
