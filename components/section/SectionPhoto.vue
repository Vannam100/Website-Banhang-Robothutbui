<!-- eslint-disable vue/no-v-html -->
<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="backgroundComputed"
    class="py-[20px]"
  >
    <div class="container">
      <div
        class="grid gap-[30px] service__section"
        :class="newColumn"
      >
        <div
          v-for="(item, index) in block.list_item"
          :key="index"
          class="cursor-pointer flex items-center flex-col"
          itemscope
          itemtype="http://schema.org/Service"
        >
          <NuxtLink
            itemprop="url"
            :target="block.button.open_new_tab ? '_blank' : ''"
            class="thumb__hover w-full"
          >
            <img
              itemprop="image"
              :src="item.image"
              :alt="item.image_alt"
              class="aspect-1 w-full object-cover"
            >
          </NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">

interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();

const newColumn = ref();
const updateColumnClass = () => {
  switch (parseInt(props.block.layout_list)) {
    case 1:
      newColumn.value = 'grid-cols-1';
      break;
    case 2:
      newColumn.value = 'sm:grid-cols-2';
      break;
    case 3:
      newColumn.value = 'sm:grid-cols-2 md:grid-cols-3';
      break;
    case 4:
      newColumn.value = 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
      break;
    case 5:
      newColumn.value = 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5';
      break;
    default:
      newColumn.value = 'sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
  }
};
watch(
  () => props.block.layout,
  () => {
    updateColumnClass();
  },
  { deep: true, immediate: true }
);
updateColumnClass();

const backgroundComputed = computed(() =>
  props.block.background_image
    ? {
        background: `url(${props.block.background_image}) center / cover`
      }
    : { backgroundColor: props.block.background_color }
);

</script>

<style lang="scss" scoped>
.thumb__hover::before {
  position: absolute;
  top: 0;
  left: -100%;
  z-index: 2;
  display: block;
  content: '';
  width: 50%;
  height: 100%;
  background: -webkit-linear-gradient(
    left,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.3) 100%
  );
  background: linear-gradient(
    to right,
    rgba(255, 255, 255, 0) 0,
    rgba(255, 255, 255, 0.3) 100%
  );
  -webkit-transform: skewX(-25deg);
  transform: skewX(-25deg);
}
.thumb__hover:hover::before {
  -webkit-animation: shine 1.2s;
  animation: shine 1.2s;
}
.button__active:active {
  background: white;
  color: #56b367;
  transition: 0.5s all;
  border-color: rgba(88, 171, 103, 0.312) !important;
  border: 1px solid;
}
.thumb__hover {
  display: block;
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-out;
}
@keyframes shine {
  100% {
    left: 125%;
  }
}
</style>
