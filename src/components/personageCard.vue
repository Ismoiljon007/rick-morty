<template>
  <div class="personage-card">
    <RouterLink :to="`/character/${personage?.id}`" class="personage-card__img">
      <img :src="personage?.image" alt="" />
    </RouterLink>
    <div class="personage-card__text-wrapper">
      <router-link
        :to="`/character/${personage?.id}`"
        class="personage-card__name"
        >{{ personage?.name }}</router-link
      >
      <div class="personage-card__role">{{ personage?.species }}</div>
    </div>
  </div>
</template>

<script setup>
import { RouterLink } from "vue-router";

const { personage } = defineProps(["personage"]);
</script>

<style lang="scss" scoped></style>
