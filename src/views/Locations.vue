<template>
  <div class="locations">
    <div class="container">
      <img
        src="@/assets/images/png/location.png"
        alt=""
        class="locations__img"
      />
      <div class="locations__filter">
        <div class="filter-input">
          <input
            type="text"
            placeholder="Filter by name..."
            v-model="searchQuery"
            @input="filterLocations"
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
          <!-- Type Filter -->
          <div class="filter-select">
            <div class="filter-select__header" @click="toggleDropdown('type')">
              <span>Type: {{ filters.type || "All" }}</span>
              <img
                src="@/assets/images/svg/arr.svg"
                aria-hidden="true"
                alt=""
              />
            </div>
            <ul class="filter-select__list" v-if="typeVisible">
              <li
                class="filter-select__item"
                v-for="option in typeOptions"
                :key="option"
                @click="filterLocations('type', option)"
              >
                {{ option }}
              </li>
            </ul>
          </div>

          <!-- Dimension Filter -->
          <div class="filter-select">
            <div
              class="filter-select__header"
              @click="toggleDropdown('dimension')"
            >
              <span>Dimension: {{ filters.dimension || "All" }}</span>
              <img
                src="@/assets/images/svg/arr.svg"
                aria-hidden="true"
                alt=""
              />
            </div>
            <ul class="filter-select__list" v-if="dimensionVisible">
              <li
                class="filter-select__item"
                v-for="option in dimensionOptions"
                :key="option"
                @click="filterLocations('dimension', option)"
              >
                {{ option }}
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="locations__cards-wrapper" ref="scrollComponent">
        <location-card v-for="item in locations" :key="item" :location="item" />
      </div>
      <div v-if="loading" class="loading">Loading...</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { getLocations } from "@/services/api";
import locationCard from "../components/locationCard.vue";
const visibleFilter = ref(false);
const locations = ref([]);
const searchQuery = ref("");
const page = ref(1);
const allPageCount = ref(1);
const loading = ref(false);

const typeOptions = ["All", "Planet", "Cluster", "Space Station"];
const dimensionOptions = ["All", "Dimension C-137", "Unknown Dimension"];

const typeVisible = ref(false);
const dimensionVisible = ref(false);

// Filters object
const filters = ref({
  type: "",
  dimension: "",
});

async function fetchLocations() {
  if (loading.value) return;
  loading.value = true;
  try {
    const res = await getLocations({
      name: searchQuery.value,
      type: filters.value.type,
      dimension: filters.value.dimension,
    });
    allPageCount.value = res.data.info.pages;
    locations.value = [...locations.value, ...res.data.results];
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function toggleDropdown(dropdown) {
  switch (dropdown) {
    case "type":
      typeVisible.value = !typeVisible.value;
      dimensionVisible.value = false;
      break;
    case "dimension":
      dimensionVisible.value = !dimensionVisible.value;
      typeVisible.value = false;
      break;
  }
}

function filterLocations(filterType, option) {
  filters.value[filterType] = option === "All" ? "" : option;
  page.value = 1;
  dimensionVisible.value = false;
  typeVisible.value = false;
  locations.value = [];
  fetchLocations();
}

const scrollComponent = ref(null);
const handleScroll = (e) => {
  let element = scrollComponent.value;
  if (page.value < allPageCount.value) {
    if (element.getBoundingClientRect().bottom < window.innerHeight) {
      page.value += 1;
      fetchLocations();
    }
  }
};

onMounted(() => {
  fetchLocations();
  window.addEventListener("scroll", handleScroll);
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style lang="scss" scoped></style>
