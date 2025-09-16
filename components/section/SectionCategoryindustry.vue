<template>
  <section
    v-if="block.status" 
    :data-cms-bind="dataBinding" 
    class="py-4"
    :style="{ backgroundColor: block.background_color }"
  >
    <div class="container">
      <div class="relative">
        <div class="mx-auto max-w-[1045px] h-full relative">
          <swiper
            class="mySwiper" 
            @swiper="onSwiper"
            :speed="1000"
            :modules="modules" 
            :loop="false"
            :slides-per-view="3"
            :space-between="5"
            :breakpoints="{
              '640': {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              '768': {
                slidesPerView: 3,
                spaceBetween: 10,
              },
              '1024': {
                slidesPerView: 3,
                spaceBetween: 10,
              },
            }"
          >
            <swiper-slide
              v-for="(slide, index) in block.listItem"
              :key="index"
              class="overflow-hidden"
            >
              <NuxtLink :to="slide.link">
                <div class="w-full item-category sm:py-3 py-2 rounded-2xl text-main hover:bg-main hover:text-white">
                  <div class="aspect-[1/1] mx-auto w-[48px] h-[48px]">
                    <img :src="slide.icon" :alt="slide.name" class="image css-image-icon-cate"/>
                  </div>
                  <h4 class="text-center tracking-[0.06px] lg:text-[16px] text-[12px] lg:leading-[24px] leading-[18px] uppercase mt-2 line-clamp-2">
                    {{ slide.name }}
                  </h4>
                </div>
              </NuxtLink>
            </swiper-slide>
          </swiper>
          <!-- <div class="flex z-10 absolute bottom-0 justify-center items-center w-full">
            <div class="flex gap-2">
              <span
                v-for="(slide, index) in block.listItem"
                :key="index"
                @click="goToSlide(index)"
                style="transition: all 0.3s ease"
                :class="
                  index === activeSlide ? 'border-[#D9D9D9] w-[22px]' : 'w-[40px] border-b-[3px] border-main'
                "
                class="hover:border-[#D9D9D9] border-b-[3px] relative cursor-pointer rounded-[30px]"
              >
              </span>
            </div>
          </div> -->
        </div>
      </div>
    </div>
  </section>
 </template>
 
<script lang="ts" setup>
import { Autoplay } from 'swiper/modules';
import { useRouter,useRoute } from "vue-router";

interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
const route = useRoute();
const modules = [Autoplay]
const onSwiper = (e: any) => {
  swiperInstance.value = e;
};
const router = useRouter();

const swiperInstance = ref<any | null>(null);
  const activeSlide = ref(0);


  const updateSlideStatus = () => {
  if (swiperInstance.value) {
      activeSlide.value = swiperInstance.value.activeIndex || 0;
  }
};

const goToSlide = (index: number) => {
  if (swiperInstance.value) {
      swiperInstance.value.slideTo(index);
      updateSlideStatus();
  }
};
onMounted(() => {
  updateSlideStatus();
  if (swiperInstance.value) {
    swiperInstance.value.on('slideChange', updateSlideStatus);
  }
});
</script>

<style lang="scss" scoped>
.item-category {
  font-size: 13px;
  font-weight: 500;
  text-align: center;
  cursor: pointer; 
  &:hover {
    .css-image-icon-cate{
      filter: brightness(0) invert(1);
    }
  }
}
.css-image-icon-cate-active{
  filter: brightness(0) invert(1);
}
</style>
