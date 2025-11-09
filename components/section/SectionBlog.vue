<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="py-10"
    :style="{ backgroundColor: block.background_color || '#ffffff' }"
  >
    <div class="container">
      <!-- Header -->
      <div class="text-center mb-16">
        <!-- Subtitle -->
        <p class="text-main text-sm uppercase tracking-wider mb-4 font-bold">
         {{ block.sub_title }}
        </p>

        <!-- Animated Title -->
        <h2
          class="text-4xl lg:text-5xl font-bold text-gray-800 leading-tight"
          :class="{ 'animate-title': inView }"
        >
         {{ block.title }}
        </h2>
      </div>

      <!-- Blog Posts -->
      <swiper
        :slides-per-view="1"
        :space-between="15"
        :pagination="{ clickable: true }"
        :modules="modules"
        :breakpoints="{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
        }"
        class="mySwiper"
      >
        <swiper-slide v-for="post in block.posts" :key="post.id">
          <BlogHome
            :image="post.image"
            :title="post.title"
            :category="post.category"
            :url="block.url"
            :open_new_tab="block.open_new_tab"
          />
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

const props = defineProps<{
  block: any;
  dataBinding: any;
}>();

const currentSlide = ref(0);
const inView = ref(false);

// Swiper modules
const modules = [Pagination];
</script>

<style scoped>
/* Subtitle animation */
@keyframes fadeBounce {
  0% {
    opacity: 0;
    transform: translateY(30px) scale(0.9);
  }
  60% {
    opacity: 1;
    transform: translateY(-5px) scale(1.05);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-subtitle {
  animation: fadeBounce 0.8s ease-out forwards;
}

/* Characters animation */
.animate-char {
  animation: fadeBounce 0.8s ease-out forwards;
}

/* Swiper pagination styles */
:deep(.swiper-pagination) {
  position: relative !important;
  margin-top: 2rem;
}

:deep(.swiper-pagination-bullet) {
  background-color: #e5e7eb;
  opacity: 1;
  width: 12px;
  height: 12px;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: var(--color-main, #c44953);
}

.mySwiper {
  padding-bottom: 3rem;
}
</style>
