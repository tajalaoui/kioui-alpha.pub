import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { getToken, verifyToken } from "../composables/token.composable"
import { useUserStore } from "../store/user.store"

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    components: {
      default: () => import("../views/Home.vue"),
      AppNavBar: () => import("../layouts/AppNavBar.vue"),
    },
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// TODO put the logic responsable for token verification in a service that will be called in token.composable
router.beforeEach(async (to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getToken()) {
      const token = await verifyToken()
      const { userId, username } = token.data
      const userStore = useUserStore()
      userStore.SET_USER(userId, username)
      next()
    } else next({ name: "Login" })
  } else next()
})

export default router
