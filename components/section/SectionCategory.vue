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
            :autoplay="{
              delay: 2500,
              disableOnInteraction: false,
            }"
            :slides-per-view="3"
            :space-between="5"
            :breakpoints="{
              '640': {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              '768': {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              '1024': {
                slidesPerView: 5,
                spaceBetween: 30,
              },
            }"
          >
            <swiper-slide
              v-for="(slide, index) in listCategoryNam"
              :key="index"
              class="overflow-hidden"
            >
              <div @click="getProductCategory(slide?.slug)" class="w-full item-category sm:py-3 py-2 h-[200px]" :class="route.query.category === slide.slug ? 'text-main' : 'bg-[#f5f5f5] hover:text-main text-black'">
                <div class="mx-auto w-[100px]">
                  <img :src="slide.icon" :alt="slide.name" class="image"/>
                </div>
                <h4 class="lg:text-[16px] text-[12px] text-center tracking-[0.06px] uppercase mt-2 line-clamp-2">
                  {{ slide.name }}
                </h4>
              </div>
            </swiper-slide>
          </swiper>
        </div>
      </div>
    </div>
  </section>
 </template>
 
<script lang="ts" setup>
import { Autoplay, Pagination } from 'swiper/modules';
import { useRouter,useRoute } from "vue-router";
import { category } from '@/data/category.ts';

interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
const route = useRoute();
const modules = [Autoplay, Pagination]
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

const getProductCategory = async (slug:string) => {
  // try {
    router.push({ 
      path: `/san-pham`,
      query: {
        category : slug
      }
    })
  // } catch (error) {
  //   console.error(error);
  // }
}

const listCategoryNam = category;

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
