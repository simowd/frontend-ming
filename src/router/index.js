import Vue from "vue";
import VueRouter from "vue-router";
import HomePage from "@/views/HomePage.vue";
import Login from "@/views/Login.vue";
import LatestRelease from "@/views/LatestRelease.vue";
import SignUp from "@/views/SignUp.vue";
import Sale from "@/views/Sale.vue";
import AddPublisher from "@/views/AddPublisher.vue";
import PublisherList from "@/views/PublisherList.vue";
import UserAccount from "@/views/UserAccount.vue";
import Highlight from "@/views/Highlight.vue";
import PublisherAddGame from "@/views/PublisherAddGame.vue";
import PublisherEditGame from "@/views/PublisherEditGame.vue"
import AdminGames from "@/views/AdminGames.vue";
import PublisherGames from "@/views/PublisherGames.vue";
import PublisherDashboard from "@/views/PublisherDashboard.vue";
import EditPublisherAccount from "@/views/EditPublisherAccount.vue";
import Game from "@/views/Game.vue"
import PageNotFound from "@/views/PageNotFound.vue";
import Cart from "../views/Cart.vue"
Vue.use(VueRouter);

const routes = [{
    path: "/",
    name: "Home",
    component: HomePage,
  },

  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import( /* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/latest-release",
    name: "LatestRelease",
    component: LatestRelease,
  },
  {
    path: "/sale",
    name: "Sale",
    component: Sale,
  },
  {
    path: "/register",
    name: "SignUp",
    component: SignUp,
  },
  {
    path: "/admin/add-publisher",
    name: "AddPublisher",
    component: AddPublisher,
  },
  {
    path: "/admin/publisher-list",
    name: "PublisherList",
    component: PublisherList,
  },
  {
    path: "/MyAccount",
    name: "User Account",
    component: UserAccount,
  },
  {
    path: "/highlights",
    name: "Highlights",
    component: Highlight,
  },
  {
    path: "/publisher/add-game/:id",
    name: "PublisherAddGame",
    component: PublisherAddGame,
  },
  {
    path: "/publisher/edit-game/:id",
    name: "PublisherEditGame",
    component: PublisherEditGame,
  },
  {
    path: "/admin/games",
    name: "AdminGames",
    component: AdminGames,
  },
  {
    path: "/publisher/games/:id",
    name: "publisherGames",
    component: PublisherGames,
  },
  {
    path: "/publisher/dashboard/:id",
    name: "publisherDashboard",
    component: PublisherDashboard,
  },
  {
    path: "/publisher/account/:id",
    name: "editPublisherAccount",
    component: EditPublisherAccount,
  },
  {
    path: "/games/:id",
    name: "Game",
    component: Game,
  },
  {
    path: "*",
    name: "PageNotFound",
    component: PageNotFound,
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart,
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;