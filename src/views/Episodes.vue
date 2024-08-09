<template>
  <div class="episodes">
    <div class="container">
      <img
        src="@/assets/images/png/rick-and-morty.png"
        alt=""
        class="episodes__img"
      />
      <div class="filter-input">
        <input
          type="text"
          placeholder="Filter by name..."
          v-model="searchQuery"
          @input="filterCharacters"
        />
      </div>
      <div class="episodes__cards-wrapper" ref="scrollComponent">
        <episode-card v-for="item in episodes" :key="item" :episode="item" />
      </div>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getEpisodes } from "@/services/api";
import episodeCard from "../components/episodeCard.vue";

const episodes = ref([]);
const searchQuery = ref("");
const page = ref(1);
const allPageCount = ref(1);
const loading = ref(false);

async function fetchEpisodes() {
  if (loading.value) return;
  loading.value = true;
  try {
    const res = await getEpisodes({ name: searchQuery.value });
    allPageCount.value = res.data.info.pages;
    episodes.value = [...episodes.value, ...res.data.results];
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

const scrollComponent = ref(null);
const handleScroll = (e) => {
  let element = scrollComponent.value;
  if (page.value < allPageCount.value) {
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      page.value += 1;
      fetchEpisodes();
    }
  }
};
function filterCharacters() {
  page.value = 1;
  episodes.value = [];
  fetchEpisodes();
}

onMounted(() => {
  fetchEpisodes();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped></style>
