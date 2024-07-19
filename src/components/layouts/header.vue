<script setup>
import { onMounted, ref } from "vue";
import { token } from "@/helper/GlobalVariable";
import getAuthor from "@/helper/getAuthor";

const routeItem = ref([
  { name: "Home", route: "/" },
  { name: "Blog", route: "/blog" },
  { name: "About", route: "/about" },
]);

const author = ref({});
const toggleNav = ref(false);

const getData = async () => {
  author.value = await getAuthor();
};

const logout = () => {
  localStorage.removeItem("token");
  location.reload();
};

onMounted(() => {
  getData();
});
</script>

<template>
  <div class="w-full fixed bg-[var(--primary-bg)] border-b-2 z-10">
    <div class="flex mx-auto justify-between items-center container">
      <router-link to="/"><img src="/logo.png" width="64" /></router-link>
      <span class="lg:hidden">
        <v-icon
          @click="toggleNav = !toggleNav"
          name="hi-menu"
          fill="#2769b3"
          scale="2"
        />
      </span>

      <nav class="hidden lg:flex gap-4 items-center">
        <router-link
          v-for="(item, index) in routeItem"
          :key="index"
          :to="item.route"
          class="font-medium"
          >{{ item.name }}</router-link
        >
        <button v-show="!token" class="btn-primary px-6">
          <router-link :to="'/login'">
            <v-icon name="fa-user-alt" fill="white" class="mr-2" />
            <span>Sign In</span>
          </router-link>
        </button>
        <button v-if="!token == ''" class="btn-primary px-6">
          <router-link :to="'/dashboard'">
            <v-icon name="fa-user-alt" fill="white" class="mr-2" />
            <span>{{ author.name }}</span>
          </router-link>
        </button>
        <button v-show="!token == ''" class="btn-other" @click="logout">
          <v-icon
            name="md-logout-round"
            fill="white"
            class="mr-2"
            flip="horizontal"
          />
          Sing Out
        </button>
      </nav>
    </div>
  </div>
  <div
    v-show="toggleNav"
    class="w-full bottom-0 fixed border-b-2 mx-auto z-10 flex justify-center lg:hidden"
  >
    <nav
      class="flex flex-col gap-10 h-[80vh] container bg-white px-[10vw] pt-[10vh] rounded-lg drop-shadow-md"
    >
      <router-link
        v-for="(item, index) in routeItem"
        @click="toggleNav = !toggleNav"
        :key="index"
        :to="item.route"
        class="font-medium text-center"
        >{{ item.name }}</router-link
      >
      <div class="flex flex-col gap-3">
        <button v-show="!token" class="btn-primary px-6">
          <router-link :to="'/login'">
            <v-icon name="fa-user-alt" fill="white" class="mr-2" />
            <span>Sign In</span>
          </router-link>
        </button>
        <button v-if="!token == ''" class="btn-primary px-6">
          <router-link :to="'/dashboard'" @click="toggleNav = !toggleNav">
            <v-icon name="fa-user-alt" fill="white" class="mr-2" />
            <span>{{ author.name }}</span>
          </router-link>
        </button>
        <button v-show="!token == ''" class="btn-other" @click="logout">
          <v-icon
            name="md-logout-round"
            fill="white"
            class="mr-2"
            flip="horizontal"
          />
          Sing Out
        </button>
      </div>
    </nav>
  </div>
</template>
