import { createRouter, createWebHistory } from "vue-router";
import Header from "@/layouts/Header.vue";

import Home from "../views/Home.vue";
import Character from "../views/Character.vue";
import Episodes from "../views/Episodes.vue";
import Episode from "../views/Episode.vue";
import Locations from "../views/Locations.vue";
import Location from "../views/Location.vue";

const routes = [
  {
    path: "/header",
    component: Header,
    children: [
      { path: "/", component: Home, name: "home" },
      { path: "/character/:id", component: Character },
      { path: "/episodes", component: Episodes },
      { path: "/episode/:id", component: Episode },
      { path: "/locations", component: Locations },
      { path: "/location/:id", component: Location },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
