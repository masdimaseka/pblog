<script setup></script>

<template>
  <div class="mx-auto w-[90vw] md:w-[80vw] lg:w-[60vw]">
    <div class="h-screen flex justify-center items-center">
      <div class="bg-white rounded-xl drop-shadow-md flex gap-16 p-6 md:p-4">
        <div
          class="justify-center content-center gap-16 w-[30vw] hidden md:flex"
        >
          <div class="content-center relative">
            <img
              src="/primdev-banner.png"
              class="rounded-lg h-[80vh] object-cover"
            />
            <div class="w-[12vw] absolute bottom-0">
              <object
                type="image/svg+xml"
                data="/illus-primdev-animation2.svg"
                class="drop-shadow-lg"
              >
                Your browser does not support SVG
              </object>
            </div>
          </div>
        </div>
        <div
          class="w-[80vw] flex flex-col items-center md:w-[40vw] lg:w-[24vw] lg:mr-[3rem]"
        >
          <img src="/logo.png" alt="" class="w-[72px] h-[72px]" />
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
