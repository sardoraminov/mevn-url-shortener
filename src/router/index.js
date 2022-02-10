import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Url from "../views/Url.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:slug",
    name: "Url",
    component: Url,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
