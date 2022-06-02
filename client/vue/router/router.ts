import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router"
import { getToken, isToken } from "../composables/token.composable"

declare module "vue-router" {
  interface RouteMeta {
    isAdmin?: boolean
    requiresAuth: boolean
  }
}

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
    meta: { requiresAuth: true },
  },
  {
    path: "/register",
    name: "Register",
    component: () => import("../views/Register.vue"),
    meta: { requiresAuth: false },
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
    meta: { requiresAuth: false },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (getToken()) next()
    else next({ name: "Login" })
  } else next()
})

export default router
