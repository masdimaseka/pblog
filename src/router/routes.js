import AuthorTemplates from "@/views/templates/authorTemplate.vue";
import UserTemplates from "@/views/templates/userTemplate.vue";
import AuthTemplates from "@/views/templates/authTemplate.vue";
import Home from "@/views/pages/home.vue";
import Blog from "@/views/pages/blog.vue";
import BlogDetail from "@/views/pages/blogDetail.vue";
import CreateBlog from "@/views/pages/author/createBlog.vue";
import UpdateBlog from "@/views/pages/author/updateBlog.vue";
import Login from "@/views/pages/auth/login.vue";
import Register from "@/views/pages/auth/register.vue";
import About from "@/views/pages/about.vue";
import Dashboard from "@/views/pages/author/dashboard.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "home",
    component: UserTemplates,
    children: [
      {
        path: "/",
        name: "user-home",
        component: Home,
      },
      {
        path: "/blog",
        name: "blog",
        component: Blog,
      },
      {
        path: "/blog/:slug",
        name: "blog-detail",
        component: BlogDetail,
        props: true,
      },
      {
        path: "/about",
        name: "about",
        component: About,
      },
    ],
  },
  {
    path: "/dashboard",
    name: "dashboard",
    component: AuthorTemplates,
    meta: {
      isAuth: true,
    },
    children: [
      {
        path: "/dashboard",
        name: "author-dashboard",
        component: Dashboard,
      },
      {
        path: "/blog/create",
        name: "author-create-blog",
        component: CreateBlog,
      },
      {
        path: "/blog/update/:slug",
        name: "author-update-blog",
        component: UpdateBlog,
      },
    ],
  },
  {
    path: "/login",
    name: "auth-login",
    component: AuthTemplates,
    meta: {
      isAuth: false,
    },
    children: [
      {
        path: "/login",
        name: "auth-login",
        component: Login,
      },
      {
        path: "/register",
        name: "auth-register",
        component: Register,
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.isAuth)) {
    let user = localStorage.getItem("token");
    if (!user) {
      next("/login");
    }
  }
  next();
});

export default router;
