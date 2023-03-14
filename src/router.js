import { createRouter, createWebHistory } from "vue-router";
import MainGallery from "./pages/gallery/MainGallery.vue";
import TheHero from "./pages/TheHero.vue";
import store from "./store/index.js";

const TheLogin = () => import("./pages/admin/TheLogin.vue");
const ContactPage = () => import("./pages/contact/ContactPage.vue");
const NotFound = () => import("./pages/NotFound.vue");
const GalleryItem = () => import("./pages/gallery/GalleryItem.vue");
const UploadItem = () => import("./pages/admin/UploadItem.vue");
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/", redirect: "/start" },
    { path: "/admin/", component: TheLogin },
    { path: "/start/", component: TheHero },
    { path: "/kontakt/", component: ContactPage },

    {
      path: "/admin/upload",
      component: UploadItem,
      meta: { requiresAuth: true },
    },

    { path: "/galeria/", name: "main-gallery", component: MainGallery },
    { path: "/galeria/:id", name: "gallery-item", component: GalleryItem },
    { path: "/:notFound(.*)", component: NotFound },
  ],
});

router.beforeEach(function (to, from, next) {
  if (to.meta.requiresAuth && !store.getters["login/isAdminLogged"]) {
    next("/admin");
  } else {
    next();
  }
  if (
    window.event.type == "popstate" &&
    from.name == "gallery-item" &&
    to.name == "gallery-item" &&
    window.innerWidth <= 992 //mobile screen check
  ) {
    router.push("/galeria");
  }
});

export default router;
