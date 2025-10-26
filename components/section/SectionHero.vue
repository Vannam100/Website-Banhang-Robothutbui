<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="w-full section_hero relative h-full"
  >
    <div class="change_slide_prev" @click="() => swiperInstance.slidePrev()" >
      <img src="/images/icon_next.png" alt="Icon Prev" class=" w-[20px] h-[30px] rotate-180"/>
    </div>
    <div class="change_slide_next" @click="() => swiperInstance.slideNext()">
      <img src="/images/icon_next.png" alt="Icon Next" class=" w-[20px] h-[30px]"/>
    </div>
    <div class="w-full h-full relative z-0">
      <swiper
        :slides-per-view="1"
        :effect="'fade'"
        @swiper="onSwiper"
        class="mySwiper w-full h-full"
        :autoplay="{
          delay: 2500,
          disableOnInteraction: false,
        }"
        :speed="1000"
        :modules="modules"
        :loop="true"
      >
        <swiper-slide
          v-for="(slide, index) in block.banner_slides"
          :key="index"
          style="width: 100% !important; height: 100%;"
          class="relative"
        >
          <div class="relative w-full h-full custom_animation">
            <div class="w-full h-screen">
              <img :src="slide.image" :alt="slide.image_alt" class="w-full"/>
            </div>
          </div>
        </swiper-slide>
      </swiper>
      <div class="z-10 absolute bottom-[20px] left-0 w-full">
        <div class="flex justify-center items-center">
          <span 
            v-for="(slide, index) in block.banner_slides"
            :key="index" 
            @click="goToSlide(index)"
            :class="index === activeSlide ? 'bg-black border-black' : 'bg-transparent border-black'"
            class="rounded-full relative m-[4px] cursor-pointer border-[2px] w-[10px] h-[10px]">
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { Autoplay,Pagination, EffectFade } from 'swiper/modules';

interface Props {
  dataBinding: any;
  block: any;
}
defineProps<Props>();
const modules = [Autoplay, Pagination, EffectFade ]
const onSwiper = (e: any) => {
  swiperInstance.value = e;
};

const swiperInstance = ref<any | null>(null);
  const activeSlide = ref(0);

const updateSlideStatus = () => {
    if (swiperInstance.value) {
        activeSlide.value = swiperInstance.value.realIndex || 0;
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
.section_hero {
  &:hover {
    .change_slide_prev {
      opacity: 1;
    }
    .change_slide_next {
      opacity: 1;
    }
  }
}

.change_slide_prev{
  opacity: 0;
  left: 20px;
  position: absolute;
  top: 50%;
  z-index: 2;
  transition: opacity .5s;
  cursor: pointer;
}

.change_slide_next {
  opacity: 0;
  right: 20px;
  position: absolute;
  top: 50%;
  z-index: 2;
  transition: opacity .5s;
  cursor: pointer;
}

.custom_animation {
  transform: scale(1.4);
  animation: zoomOut 10s ease-out forwards;
}

@keyframes zoomOut {
  0% {
    transform: scale(1.4);
  }
  100% {
    transform: scale(1.1);
  }
}
</style>
