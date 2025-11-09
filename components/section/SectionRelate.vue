<!-- eslint-disable vue/html-self-closing -->
<template>
  <section class="md:py-[60px] py-[20px] cursor-pointer">
    <div class="container">
      <h2 class="title-main text-main900 text-start">sản phẩm liên quan</h2>
      <div class="w-full mt-[20px]">
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
            v-for="(item, index) in listProductCate"
            :key="index"
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
            <img class="image" src="/images/arrow.png" alt="Alt Imag">
          </div>
            <div
              class="cursor-pointer rotate-180 lg:w-12 w-9"
              @click="() => swiperInstance.slideNext()"
            >
              <img class="image" src="/images/arrow.png" alt="Alt Imag">
            </div>  
          </div>
          <NuxtLink
            to="/san-pham"
            class="inline-flex justify-between bg-main items-center gap-2 text-white sm:px-5 px-2.5 sm:py-4 py-2.5 rounded-[50px] font-normal md:text-md text-sm md:leading-5 leading-4"
          >
            Xem thêm
          <img class="image max-w-[20px] w-5 h-5" src="/images/arrow-right.png" alt="Alt Image">
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { Autoplay } from 'swiper/modules';
import { useRoute } from 'vue-router';
import { products } from '@/data/products.ts';

const modules = [Autoplay]
const onSwiper = (e: any) => {
  swiperInstance.value = e;
};
const route = useRoute();
const swiperInstance = ref<any | null>(null);
const productDetail = computed(() => {
  const slug = route.params.slug as string
  return products.find((p:any) => p.slug == slug)
})

const listProductCate = products.filter((item:any) => {
  return item.category.slug === productDetail.value?.category.slug
})
</script>

<style lang="scss" scoped>
</style>