<script setup></script>
<template>
  <div class="mx-auto container mb-40">
    <div class="flex justify-center content-center gap-16 h-screen">
      <div class="content-center w-full lg:w-[47vw]">
        <div class="w-[30vw] lg:w-[8vw] mb-3">
          <object
            type="image/svg+xml"
            data="/illus-primdev-animation1.svg"
            class="drop-shadow-lg"
          >
            Your browser does not support SVG
          </object>
        </div>
        <h3>About Primakara Developers</h3>
        <p class="text-justify mb-8">
          Primakara Developers adalah sebuah Unit Kegiatan Mahasiswa (UKM) yang
          berada di bawah naungan Primakara University, sebuah perguruan tinggi
          teknologi di Bali, Indonesia. Tujuan utama dari Primakara Developers
          adalah untuk menyediakan wadah bagi mahasiswa yang ingin mengembangkan
          kemampuan coding, programming, dan pengembangan aplikasi.
        </p>
        <h5>Our Social Media</h5>
        <div class="flex gap-3">
          <a href="https://www.youtube.com/@primdev" target="_blank"
            ><v-icon name="bi-youtube" fill="#2769b3" scale="1.5"
          /></a>
          <a href="https://discord.gg/rc3hMA3X4a" target="_blank"
            ><v-icon name="bi-discord" fill="#2769b3" scale="1.5"
          /></a>
          <a
            href="https://www.instagram.com/primakara_developers/"
            target="_blank"
            ><v-icon name="bi-instagram" fill="#2769b3" scale="1.5"
          /></a>
        </div>
      </div>
      <div class="hidden lg:block content-center w-[63vw]">
        <img
          src="/primdev-banner.png"
          class="rounded-xl drop-shadow-lg border-4 border-white"
        />
      </div>
    </div>
  </div>
</template>
