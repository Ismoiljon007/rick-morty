<template>
  <div class="character-detail">
    <div class="container">
      <div class="character-detail__img">
        <img :src="detail?.image" alt="" />
      </div>
      <h2 class="character-detail__name">{{ detail?.name }}</h2>
      <div class="character-detail__lists-wrapper">
        <div class="character-detail__info">
          <h3 class="character-detail__info-title">Informations</h3>
          <ul class="character-detail__info-list">
            <li class="character-detail__info-item">
              <h4 class="character-detail__info-name">Gender</h4>
              <h5 class="character-detail__info-value">{{ detail?.gender }}</h5>
            </li>
            <li class="character-detail__info-item">
              <h4 class="character-detail__info-name">Status</h4>
              <h5 class="character-detail__info-value">{{ detail?.status }}</h5>
            </li>
            <li class="character-detail__info-item">
              <h4 class="character-detail__info-name">Specie</h4>
              <h5 class="character-detail__info-value">
                {{ detail?.species }}
              </h5>
            </li>
            <li class="character-detail__info-item">
              <h4 class="character-detail__info-name">Origin</h4>
              <h5 class="character-detail__info-value">
                {{ detail?.origin?.name }}
              </h5>
            </li>
            <li class="character-detail__info-item">
              <h4 class="character-detail__info-name">Type</h4>
              <h5 class="character-detail__info-value">
                {{ detail?.type?.length ? detail?.type : "unknown" }}
              </h5>
            </li>
            <li class="character-detail__info-item">
              <h4 class="character-detail__info-name">Location</h4>
              <h5 class="character-detail__info-value">
                {{ detail?.location?.name }}
              </h5>
            </li>
          </ul>
        </div>
        <div class="character-detail__episodes">
          <h3 class="character-detail__episodes-title">Episodes</h3>
          <ul class="character-detail__episodes-list">
            <li
              class="character-detail__episodes-item"
              v-for="episode in episodes"
              :key="episode.id"
            >
              <router-link :to="`/episode/${episode.id}`">
                <h4 class="character-detail__episodes-code">
                  {{ episode?.episode }}
                </h4>
                <h5 class="character-detail__episodes-type">
                  {{ episode?.name }}
                </h5>
                <span class="character-detail__episodes-date">{{
                  episode?.air_date
                }}</span>
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { getCharacter } from "@/services/api";

const detail = ref({});
const episodes = ref([]);
const route = useRoute();
const { id } = route.params;

const fetchDetail = async () => {
  try {
    const res = await getCharacter(id);
    detail.value = res.data;
    await fetchEpisodes(res.data.episode);
  } catch (error) {
    console.error("Failed to fetch character details:", error);
  }
};

const fetchEpisodes = async (episodeUrls) => {
  try {
    const episodePromises = episodeUrls.map((url) => axios.get(url));
    const episodeResponses = await Promise.all(episodePromises);
    episodes.value = episodeResponses.map((res) => res.data);
  } catch (error) {
    console.error("Failed to fetch episodes:", error);
  }
};

fetchDetail();
</script>
