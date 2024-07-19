<script setup>
import Card from "@/components/card.vue";
import Loading from "@/components/loading.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import { baseUrl, token } from "@/helper/GlobalVariable";
import getAuthor from "@/helper/getAuthor";

const isLoading = ref(false);

const blogLists = ref([]);
const author = ref({});

const getData = async () => {
  isLoading.value = true;
  try {
    author.value = await getAuthor();
    const response = await axios.get(
      baseUrl + "/blog/author/" + author.value.id,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
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
</script>
<template>
  <div class="mx-auto pt-[15vh] lg:pt-[20vh] container mb-40">
    <div class="flex justify-between mb-6">
      <h3 class="mb-0">Hello, {{ author.name }}!</h3>
      <button class="btn-primary hidden lg:block">
        <router-link :to="'/blog/create'">
          <v-icon name="hi-solid-pencil-alt" fill="white" class="mr-2" />Create
          Blog</router-link
        >
      </button>
    </div>

    <div>
      <div class="flex justify-between mb-6">
        <h5 class="mb-0">My Blogs</h5>
        <span>Total Blogs : {{ blogLists.length }}</span>
      </div>

      <div
        role="status"
        v-if="isLoading"
        class="w-full h-[25vh] flex justify-center items-center"
      >
        <Loading class="w-12 h-12" />
      </div>
      <div class="grid px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card
          v-for="data in blogLists"
          :title="data.title"
          :content="data.content"
          :blog_id="data.id"
          :slug="data.slug"
          :image="data.image"
          :created_at="data.created_at"
        />
      </div>
    </div>
    <div class="container fixed mb-10 bottom-0 flex justify-end">
      <button class="btn-primary lg:hidden drop-shadow-md">
        <router-link :to="'/blog/create'">
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
