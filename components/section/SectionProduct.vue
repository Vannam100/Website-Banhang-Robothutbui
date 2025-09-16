<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    v-if="block.status" 
    :data-cms-bind="dataBinding" 
    class="lg:py-14 md:py-10 sm:py-6 py-4"
    :style="{ backgroundColor: block.background_color }"
  >
    <div class="container">
      <div class="title-main text-center sm:mb-[40px] mb-6" v-html="block.title" />
      <!-- <div v-show="isLoading" class="flex justify-center items-center">
        <div class="loader" />
      </div>       -->
      <template v-if="listProduct.length > 0">
        <div class="w-full">
          <swiper
            :speed="1000"
            :modules="modules" 
            :loop="false" 
            :slides-per-view="2"
            :space-between="10"
            :breakpoints="{
              '640': {
                slidesPerView: 2,
                spaceBetween: 10
              },
              '768': {
                slidesPerView: 3,
                spaceBetween: 20
              },
              '1024': {
                slidesPerView: 4,
                spaceBetween: 24
              },
            }"
            @swiper="onSwiper"
            class="mySwiper" 
          >
            <swiper-slide
              v-for="item in listProduct"
              :key="item.id"
            >
              <BaseProduct :product="item"/>
            </swiper-slide>
          </swiper>
          <div class="flex items-center justify-between mt-3">
            <div class="flex items-center gap-2">
              <div
                class="cursor-pointer lg:w-12 w-9"
                @click="() => swiperInstance.slidePrev()"
              >
                <img class="image" :src="block.arrow" :alt="block.arrow_alt">
              </div>
              <div
                class="cursor-pointer rotate-180 lg:w-12 w-9"
                @click="() => swiperInstance.slideNext()"
              >
                <img class="image" :src="block.arrow" :alt="block.arrow_alt">
              </div>  
            </div>
            <NuxtLink
              v-if="block.button.is_show"
              :target="block.button.open_new_tab ? '_blank': ''"
              :to="block.button.link"
              class="transition-all duration-300 bg-main hover:text-white inline-flex justify-between hover:bg-black items-center gap-2 text-white sm:px-5 px-2.5 sm:py-4 py-2.5 font-normal md:text-md text-sm md:leading-5 leading-4"
            >
              {{ block.button.label }}
              <img class="image max-w-[20px] w-5 h-5" :src="block.button.icon" :alt="block.button.icon_alt">
            </NuxtLink>
          </div>
        </div>
      </template>
      <!-- <template v-if="!isLoading && listProduct.length === 0">
        <div class="text-center md:text-md text-sm md:leading-6 leading-5 py-5 font-bold uppercase">
          Đang cập nhật sản phẩm
        </div>
      </template> -->
    </div>
  </section>
</template>
<script lang="ts" setup>
import { Autoplay } from 'swiper/modules';
import { API_BASE_URL } from '@/constant/apiConfig';
import { products } from '@/data/products.ts';

interface Props {
  dataBinding: any;
  block: any;
}
defineProps<Props>();
const isLoading = ref(true)
const modules = [Autoplay]
const onSwiper = (e: any) => {
  swiperInstance.value = e;
};
const swiperInstance = ref<any | null>(null);
const listProduct = products;

</script>
<style lang="scss" scoped>
.loader {
  --d:22px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  color: gainsboro;
  box-shadow: 
    calc(1*var(--d))      calc(0*var(--d))     0 0,
    calc(0.707*var(--d))  calc(0.707*var(--d)) 0 1px,
    calc(0*var(--d))      calc(1*var(--d))     0 2px,
    calc(-0.707*var(--d)) calc(0.707*var(--d)) 0 3px,
    calc(-1*var(--d))     calc(0*var(--d))     0 4px,
    calc(-0.707*var(--d)) calc(-0.707*var(--d))0 5px,
    calc(0*var(--d))      calc(-1*var(--d))    0 6px;
  animation: l27 1s infinite steps(8);
}
@keyframes l27 {
  100% {transform: rotate(1turn)}
}
</style>