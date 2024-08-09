<template>
  <div class="characters">
    <div class="container">
      <img
        src="@/assets/images/png/Rick&Morty.png"
        alt="Character img"
        class="characters__img"
      />
      <div class="characters__filter">
        <div class="filter-input">
          <input
            type="text"
            placeholder="Filter by name..."
            v-model="searchQuery"
            @input="filterCharacters"
          />
        </div>
        <button class="filter-open-btn" @click="visibleFilter = !visibleFilter">
          <img
            src="@/assets/images/svg/filter_list.svg"
            aria-hidden="true"
            alt=""
          />
          <span>ADVANCED FILTERS</span>
        </button>
        <div
          class="filter-select-wrapper"
          :class="{ 'active-filter': visibleFilter }"
        >
          <div class="filter-select">
            <div
              class="filter-select__header"
              @click="toggleDropdown('species')"
            >
              <span>Species: {{ filters.species || "All" }}</span>
              <img
                src="@/assets/images/svg/arr.svg"
                aria-hidden="true"
                alt=""
              />
            </div>
            <ul class="filter-select__list" v-if="speciesVisible">
              <li
                class="filter-select__item"
                v-for="option in speciesOptions"
                :key="option"
                @click="setFilter('species', option)"
              >
                {{ option }}
              </li>
            </ul>
          </div>
          <div class="filter-select">
            <div
              class="filter-select__header"
              @click="toggleDropdown('gender')"
            >
              <span>Gender: {{ filters.gender || "All" }}</span>
              <img
                src="@/assets/images/svg/arr.svg"
                aria-hidden="true"
                alt=""
              />
            </div>
            <ul class="filter-select__list" v-if="genderVisible">
              <li
                class="filter-select__item"
                v-for="option in genderOptions"
                :key="option"
                @click="setFilter('gender', option)"
              >
                {{ option }}
              </li>
            </ul>
          </div>
          <div class="filter-select">
            <div
              class="filter-select__header"
              @click="toggleDropdown('status')"
            >
              <span>Status: {{ filters.status || "All" }}</span>
              <img
                src="@/assets/images/svg/arr.svg"
                aria-hidden="true"
                alt=""
              />
            </div>
            <ul class="filter-select__list" v-if="statusVisible">
              <li
                class="filter-select__item"
                v-for="option in statusOptions"
                :key="option"
                @click="setFilter('status', option)"
              >
                {{ option }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="characters__cards-wrapper" ref="scrollComponent">
        <personageCard
          v-for="item in characters"
          :key="item.id"
          :personage="item"
        />
      </div>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>

<script setup>
import { getCharacters } from "@/services/api";
import personageCard from "../components/personageCard.vue";
import { ref, onMounted, onBeforeUnmount } from "vue";

const visibleFilter = ref(false);

const speciesVisible = ref(false);
const genderVisible = ref(false);
const statusVisible = ref(false);
const characters = ref([]);
const searchQuery = ref("");
const page = ref(1);
const allPageCount = ref(1);
const loading = ref(false);
const filters = ref({
  species: "All",
  gender: "All",
  status: "All",
});

const speciesOptions = ["All", "Human", "Alien", "Other"];
const genderOptions = ["All", "Male", "Female", "Genderless", "unknown"];
const statusOptions = ["All", "Alive", "Dead", "unknown"];

async function fetchCharacters() {
  if (loading.value) return;
  loading.value = true;
  try {
    const res = await getCharacters({
      page: page.value,
      name: searchQuery.value,
      species: filters.value.species !== "All" ? filters.value.species : "",
      gender: filters.value.gender !== "All" ? filters.value.gender : "",
      status: filters.value.status !== "All" ? filters.value.status : "",
    });
    allPageCount.value = res.data.info.pages;
    characters.value = [...characters.value, ...res.data.results];
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
      fetchCharacters();
    }
  }
};

function toggleDropdown(type) {
  if (type === "species") speciesVisible.value = !speciesVisible.value;
  if (type === "gender") genderVisible.value = !genderVisible.value;
  if (type === "status") statusVisible.value = !statusVisible.value;
}

function setFilter(type, value) {
  filters.value[type] = value;
  if (type === "species") speciesVisible.value = !speciesVisible.value;
  if (type === "gender") genderVisible.value = !genderVisible.value;
  if (type === "status") statusVisible.value = !statusVisible.value;
  filterCharacters();
}

function filterCharacters() {
  page.value = 1;
  characters.value = [];
  fetchCharacters();
}

onMounted(() => {
  fetchCharacters();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style>
.loading {
  text-align: center;
  margin-top: 20px;
}
</style>
