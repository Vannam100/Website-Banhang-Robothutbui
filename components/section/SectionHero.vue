<!-- eslint-disable vue/no-v-html -->
<template>
  <section v-if="block.status" 
    :data-cms-bind="dataBinding" 
    class="hero-section sm:h-[800px] h-[700px] flex items-center justify-start text-white relative w-full"
    :style="{backgroundImage: 'linear-gradient(281.37deg,rgba(0, 0, 0, 0.108) 4.74%,rgba(0, 0, 0, 0.3) 64.3%), url('+ block.background_image +')'}"
  >
    <div class="w-full relative md:pt-[20px] z-10 md:ml-[150px] md:text-left text-center md:px-0 px-[15px] md:max-w-xl">
      <h2 class="text-[38px] md:text-[56px] md:leading-[60px] leading-[45px] font-bold mb-6 uppercase">{{ block.title }}</h2>
      <p class="md:text-[32px] text-[24px]">{{ block.sub_title }}</p>
      <NuxtLink 
        v-if="props.block.button.is_show" 
        :to="props.block.button.link"
        :target="props.block.button.open_new_tab ? '_blank' : ''"
        class="bg-main text-white px-6 py-3 rounded-full hover:bg-main700 transition-all duration-300 ease-in-out inline-flex md:mt-12 mt-8"
      >
         {{ props.block.button.label }}
      </NuxtLink>
    </div>
  </section>
</template>
<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
</script>
<style lang="scss" scoped>
.hero-section {
  background-size: cover;
  background-position: center center;
}
</style>