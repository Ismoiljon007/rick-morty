<template>
  <div class="episode-detail">
    <div class="container">
      <h2 class="episode-detail__name">{{ detail?.name }}</h2>
      <div class="episode-detail__info">
        <div class="episode-detail__info-item">
          <h4>Episode</h4>
          <h5>{{ detail?.episode }}</h5>
        </div>
        <div class="episode-detail__info-item">
          <h4>Date</h4>
          <h5>{{ detail?.air_date }}</h5>
        </div>
      </div>
      <h4 class="episode-detail__title">Cast</h4>
      <div class="episode-detail__characters">
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
import { getEpisode } from "@/services/api";
import { getCharacter } from "@/services/api";
import personageCard from "../components/personageCard.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
const { id } = useRoute().params;
const detail = ref({});
const characters = ref([]);

async function fetchDetail() {
  const res = await getEpisode(id);
  await fetchCharacters(res.data?.characters);
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
