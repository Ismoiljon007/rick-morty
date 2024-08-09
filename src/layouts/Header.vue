<template>
  <header class="header">
    <div class="container">
      <router-link class="site-logo" to="/">
        <img src="@/assets/images/png/logo.png" alt="site logo" />
      </router-link>
      <nav class="sitenav" :class="{ 'inactive-sitenav': openMenu }">
        <ul class="sitenav__list">
          <li class="sitenav__item">
            <router-link class="sitenav__link" to="/">Characters</router-link>
          </li>
          <li class="sitenav__item">
            <router-link class="sitenav__link" to="/locations"
              >Locations</router-link
            >
          </li>
          <li class="sitenav__item">
            <router-link class="sitenav__link" to="/episodes"
              >Episodes</router-link
            >
          </li>
        </ul>
      </nav>
      <button class="header__menu-btn" @click="openMenu = !openMenu">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script setup>
import { ref } from "vue";
const openMenu = ref(true);
</script>

<style lang="scss" scoped></style>
