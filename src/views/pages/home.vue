<script setup>
import Card from "@/components/card.vue";
import Loading from "@/components/loading.vue";
import Register from "@/views/pages/auth/register.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import { baseUrl, token } from "@/helper/GlobalVariable";

const blogLists = ref([]);

const isLoading = ref(false);

const getData = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get(baseUrl + "/blog/random");
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
  <div class="mx-auto container">
    <div
      class="flex flex-col-reverse justify-center content-center gap-10 lg:gap-16 h-screen lg:flex-row"
    >
      <div class="content-center w-full lg:w-[47vw]">
        <div class="w-[30vw] lg:w-[8vw] mb-3">
          <object
            type="image/svg+xml"
            data="/illus-primdev-animation2.svg"
            class="drop-shadow-lg"
          >
            Your browser does not support SVG
          </object>
        </div>
        <h1>
          Welcome to <br />
          Primakara Developers <br />
          Blogs
        </h1>
        <p class="text-justify mb-8">
          Unit Kegiatan Mahasiswa Primakara Developers : "Commit, Collaborate,
          and Make it Happen"
        </p>
        <button class="btn-primary">
          <router-link :to="'/blog'">Lets Explore!</router-link>
        </button>
      </div>
      <div class="hidden lg:block w-[63vw] content-center">
        <div
          class="card rounded-xl drop-shadow-md bg-white p-2 overflow-hidden"
        >
          <div class="card-content">
            <div class="aspect-w-16 aspect-h-9">
              <img
                src="/primdev-banner.png"
                alt=""
                class="rounded-lg object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="mb-40">
      <div
        class="flex justify-center content-center gap:10 flex-col lg:flex-row lg:gap-16"
      >
        <div class="content-center w-[35vw] lg:w-[25vw] mb-3 lg:mb-0">
          <object
            type="image/svg+xml"
            data="/illus-primdev-animation1.svg"
            class="drop-shadow-lg"
          >
            Your browser does not support SVG
          </object>
        </div>
        <div class="lg:w-[40vw] justify-center content-center">
          <h3>About Primakara Developers</h3>
          <p class="text-justify mb-6">
            Primakara Developers adalah sebuah Unit Kegiatan Mahasiswa (UKM)
            yang berada di bawah naungan Primakara University, sebuah perguruan
            tinggi teknologi di Bali, Indonesia. Tujuan utama dari Primakara
            Developers adalah untuk menyediakan wadah bagi mahasiswa yang ingin
            mengembangkan kemampuan coding, programming, dan pengembangan
            aplikasi.
          </p>
        </div>
      </div>
    </div>
    <div class="mb-40">
      <div class="flex justify-between mb-6">
        <h3 class="mb-0">Blogs Primakara Developers</h3>
        <button class="btn-primary hidden lg:block">
          <router-link :to="'/blog'">See More</router-link>
        </button>
      </div>
      <div>
        <div class="grid px-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <router-link
            v-for="(data, index) in blogLists.slice(0, 4)"
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
      </div>
      <div role="status" v-if="isLoading" class="w-full flex justify-center">
        <Loading class="w-12 h-12" />
      </div>
      <div class="flex justify-center">
        <button class="btn-primary lg:hidden mt-6">
          <router-link :to="'/blog'">See More</router-link>
        </button>
      </div>
    </div>
    <div class="mb-40">
      <div v-show="!token">
        <h3 class="text-center">Join to Create Your Blog</h3>
        <div class="flex justify-center">
          <div class="w-full lg:w-[40vw]">
            <Register />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
