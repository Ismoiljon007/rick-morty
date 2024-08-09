<template>
  <div class="location-detail">
    <div class="container">
      <h2 class="location-detail__name">{{ detail?.name }}</h2>
      <div class="location-detail__info">
        <div class="location-detail__info-item">
          <h4>Type</h4>
          <h5>{{ detail?.type }}</h5>
        </div>
        <div class="location-detail__info-item">
          <h4>Dimension</h4>
          <h5>{{ detail?.dimension }}</h5>
        </div>
      </div>
      <h4 class="location-detail__title">Residents</h4>
      <div class="location-detail__characters">
        <personageCard
          v-for="item in characters"
          :key="item.id"
          :personage="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { getLocation } from "@/services/api";
import personageCard from "../components/personageCard.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const { id } = useRoute().params;
const detail = ref({});
const characters = ref([]);

async function fetchDetail() {
  const res = await getLocation(id);
  await fetchCharacters(res.data?.residents);
  detail.value = res.data;
}

const fetchCharacters = async (characterUrls) => {
  try {
    const characterPromises = characterUrls.map((url) => axios.get(url));
    const characterResponses = await Promise.all(characterPromises);
    characters.value = characterResponses.map((res) => res.data);
  } catch (error) {
    console.error("Failed to fetch characters:", error);
  }
};
fetchDetail();
</script>

<style lang="scss" scoped></style>
