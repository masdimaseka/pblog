<script setup>
import Card from "@/components/card.vue";
import Loading from "@/components/loading.vue";
import Alert from "@/components/alert.vue";
import { onMounted, ref, reactive } from "vue";
import axios from "axios";
import { baseUrl, token } from "@/helper/GlobalVariable";

const blogLists = ref([]);
const isNotFound = ref(false);
const isLoading = ref(false);
const isMax = ref(false);
const cards = ref(12);

const getData = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(baseUrl + "/blog");
    if (response.status == 200) {
      blogLists.value = response.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  getData();
});

const input = reactive({
  query: "",
});

const hideAlert = () => {
  setTimeout(() => {
    isNotFound.value = false;
  }, 1000);
};

const search = async () => {
  isLoading.value = true;
  if (input.query != "") {
    try {
      const response = await axios.get(
        baseUrl + "/blog/search/" + input.query,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status == 200) {
        blogLists.value = response.data;
        isMax.value = true;
        cards.value = blogLists.value.length;
        console.log(cards.value, blogLists.value.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      isLoading.value = false;
    }
  } else {
    isNotFound.value = true;
    hideAlert();
    cards.value = blogLists.value.length;
    getData();

    if (
      cards.value != blogLists.value.length ||
      cards.value < blogLists.value.length
    ) {
      isMax.value = false;
    }
  }
};

const loadCards = () => {
  cards.value += 12;
  if (
    cards.value == blogLists.value.length ||
    cards.value > blogLists.value.length
  ) {
    isMax.value = true;
  }
};
</script>

<template>
  <Alert v-show="isNotFound" type="danger" message="Blog not found" />
  <div class="mx-auto pt-[15vh] lg:pt-[20vh] container mb-40">
    <div
      class="flex flex-col lg:flex-row justify-between mb-8 lg:mb-6 gap-3 lg:gap-0"
    >
      <h3 class="mb-0">Blogs Primakara Developers</h3>
      <div class="flex gap-4">
        <div
          v-show="!token == ''"
          class="flex items-center bg-white rounded-full border pl-3 max-lg:w-full"
        >
          <input
            v-model="input.query"
            type="text"
            placeholder="Search blog..."
            class="input-text border-0"
          />
          <div class="items-center">
            <button @click="search" class="btn-primary px-3 mr-1">
              <v-icon name="fa-search" fill="white" />
            </button>
          </div>
        </div>
        <button class="btn-primary hidden lg:block">
          <router-link v-if="!token" :to="'/login'">
            <v-icon
              name="hi-solid-pencil-alt"
              fill="white"
              class="mr-0 lg:mr-2"
            />
            <span>Create Blog</span>
          </router-link>
          <router-link v-if="!token == ''" :to="'/blog/create'">
            <v-icon
              name="hi-solid-pencil-alt"
              fill="white"
              class="mr-0 lg:mr-2"
            />
            <span>Create Blog</span>
          </router-link>
        </button>
      </div>
    </div>

    <div
      role="status"
      v-if="isLoading"
      class="w-full h-[25vh] flex justify-center items-center"
    >
      <Loading class="w-12 h-12" />
    </div>

    <div>
      <div class="grid px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <router-link
          v-for="(data, index) in blogLists.slice(0, cards)"
          :to="/blog/ + data.slug"
          :key="index"
        >
          <Card
            :title="data.title"
            :content="data.content"
            :blog_id="data.id"
            :slug="data.slug"
            :image="data.image"
            :created_at="data.created_at"
          />
        </router-link>
      </div>
      <div v-if="!isMax" class="flex justify-center border-t-2 mt-16">
        <button @click="loadCards" class="btn-other mt-8">Load More</button>
      </div>
    </div>
    <div class="container fixed mb-10 bottom-0 flex justify-end">
      <button class="btn-primary lg:hidden drop-shadow-md">
        <router-link v-if="!token" :to="'/login'">
          <v-icon
            name="hi-solid-pencil-alt"
            fill="white"
            class="mr-0 lg:mr-2"
          />
          <span>Create Blog</span>
        </router-link>
        <router-link v-if="!token == ''" :to="'/blog/create'">
          <v-icon
            name="hi-solid-pencil-alt"
            fill="white"
            class="mr-0 lg:mr-2"
          />
          <span>Create Blog</span>
        </router-link>
      </button>
    </div>
  </div>
</template>
