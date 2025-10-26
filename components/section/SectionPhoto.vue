<!-- eslint-disable vue/no-v-html -->
<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="backgroundComputed"
    class="lg:py-16 py-10 section_gallery !overflow-hidden"
  >
    <BaseLightbox
      :value-button="valueButton"
      :data-image="dataImage"
      :index-current="indexCurrent"
      @close="handleClose"
    />
    <div class="lg:px-0 px-[15px]">
      <swiper
        class="w-full mySwiper !pt-2 flex justify-center !lg:px-0 !px-1"
        :loop="true"
        :breakpoints="{
          '390': {
            slidesPerView: 1,
            spaceBetween: 10,
            slidesPerGroup: 1,
          },
          '768': {
            slidesPerView: 3,
            spaceBetween: 10,
            slidesPerGroup: 1,
          },
          '1024': {
            slidesPerView: 5,
            spaceBetween: 10,
            slidesPerGroup: 1,
          },
        }"
        :speed="1000"
        :modules="modules"
        :style="{ backgroundColor: block.background_color }"
        @swiper="onSwiper"
      >
        <swiper-slide
          v-for="(item, index) in block.list_item"
          :key="index"
          class="w-full h-full"
          @click="onShow(index)"
        >
          <div class="item_section_gallery animation_in">
              <div class="item_image">
              <img
                :src="item.image"
                :alt="item.image_alt"
                class="image"
              >
            </div>
            <div class="gallery-one__card__hover">
              <span class="gallery-one__card__icon">
                <span>SMARTHOME HCM</span>
              </span>
            </div>
          </div>
        </swiper-slide>
      </swiper>
    </div>
  </section>
</template>

<script setup lang="ts">
import { Autoplay } from 'swiper/modules';

const modules = [Autoplay]
const swiperInstance = ref<any | null>(null);
const onSwiper = (e: any) => {
  swiperInstance.value = e;
};

interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();

const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
        background: `url(${props.block.background_image}) center / cover`
      }
    : { backgroundColor: props.block.background_color }
);

const dataImage = computed(() => {
  return props.block.list_item?.map((item:any) => ({ src: item.image, title: item.image_alt }))
});
const indexCurrent = ref(-1);
const valueButton = ref<any>();
const onShow = (idx: number) => {
  indexCurrent.value = idx;
  nextTick(() => {
    const eleIconClose = document.querySelector('.btn-close') as HTMLElement;
    eleIconClose.style.display = 'none';
  });
  setTimeout(() => {
    nextTick(() => {
      const wrapper = document.querySelector('.vel-img-wrapper');
      const btnClose = document.querySelector('.btn-close') as HTMLElement;
      if (btnClose) {
        btnClose?.classList.add('btn-close');
        btnClose.style.display = 'flex';
      }
      wrapper?.appendChild(btnClose);
      valueButton.value = btnClose;
    });
  }, 400);
};

const handleClose = (id: number) => {
  indexCurrent.value = id;
};
</script>
<style lang="scss" scoped>
.section_gallery {
  .item_section_gallery {
    opacity: 1;
    position: relative;
    overflow: hidden;
    cursor: pointer;

    .item_image {
      transform: scale(1);
      transition: transform 500ms ease, opacity 500ms ease;
      max-width: 100%;
      max-height: 100%;
      aspect-ratio: 366 / 586;

      img {
        transform: scale(1);
        max-width: 100%;
        max-height: 100%;
        transition: transform 500ms ease, opacity 500ms ease;
        opacity: 1;
      }
    }
    .gallery-one__card__hover {
      cursor: pointer;
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #4CB7F1;
      opacity: 0.8;
      display: flex;
      justify-content: center;
      align-items: center;
      transform: scale(1, 0);
      transition: transform 500ms ease;
      transform-origin: bottom center;

      .gallery-one__card__icon {

        display: block;
        position: relative;
      }
    }

    &:hover {
      .gallery-one__card__hover {
        transform-origin: bottom center;
        transform: scale(1, 1);
      }
    }
  }
}
</style>
