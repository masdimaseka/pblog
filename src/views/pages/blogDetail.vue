<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";
import { baseUrl } from "@/helper/GlobalVariable";
import Card from "@/components/card.vue";
import Loading from "@/components/loading.vue";

const route = useRoute();
const slug = useRoute().params.slug;
const blogDetail = ref(null);
const isLoading = ref(false);

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const getDataDetail = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(baseUrl + "/blog/" + slug);
    if (response.status == 200) {
      blogDetail.value = response.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const blogLists = ref([]);

const getData = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(baseUrl + "/blog/random");
    if (response.status == 200 || 201) {
      blogLists.value = response.data;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
};

const changeBlog = (path) => {
  window.location.href = `${path}`;
};

onMounted(() => {
  getDataDetail();
  getData();
});
</script>

<template>
  <div class="mx-auto pt-[15vh] lg:pt-[20vh] container">
    <div
      role="status"
      v-if="isLoading"
      class="w-full h-[80vh] flex justify-center items-center"
    >
      <Loading class="w-12 h-12" />
    </div>
    <div class="flex justify-center items-center">
      <div v-if="blogDetail" class="w-[80vw] flex flex-col gap-16 p-6 md:p-4">
        <div>
          <div
            class="card rounded-xl drop-shadow-md bg-white p-2 overflow-hidden mb-10"
          >
            <div class="card-content">
              <div class="aspect-w-8 aspect-h-4 lg:aspect-w-16 lg:aspect-h-5">
                <img
                  :src="blogDetail.image"
                  alt=""
                  class="rounded-lg object-cover"
                />
              </div>
            </div>
          </div>

          <div class="flex flex-col">
            <h3 class="mb-2">{{ blogDetail.title }}</h3>
            <p class="mb-8">
              Created at {{ formatDate(blogDetail.created_at) }}
            </p>
            <p class="text-justify">{{ blogDetail.content }}</p>
          </div>
        </div>
        <div>
          <h5>Recommendations for you</h5>
          <div class="mb-40">
            <div>
              <div
                class="grid px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                <div
                  v-for="(data, index) in blogLists.slice(0, 4)"
                  :key="index"
                >
                  <Card
                    :title="data.title"
                    :content="data.content"
                    :blog_id="data.id"
                    :slug="data.slug"
                    :image="data.image"
                    :created_at="data.created_at"
                    @click="changeBlog(`/blog/${data.slug}`)"
                    class="cursor-pointer"
                  />
                </div>
              </div>
            </div>
            <div
              role="status"
              v-if="isLoading"
              class="w-full flex justify-center"
            >
              <Loading class="w-12 h-12" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
