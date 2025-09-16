<template>
  <section 
    v-if="block.status" 
    :data-cms-bind="dataBinding" 
    class="relative flex items-center md:justify-start justify-center h-screen text-white w-full"
    :style="{ backgroundImage: 'url(\'' + block.background_image + '\')' }"
  >
    <div class="absolute pointer-events-none inset-0 bg-black opacity-40" />
    <div class="relative z-10 md:ml-[150px] ml-[0px] sm:text-left text-center max-w-lg md:px-0 px-[15px]">
      <div class="md:text-[44px] text-[36px] font-bold sm:leading-[70px] leading-normal mb-4 uppercase ckeditor-custom" v-html="block.title" />
      <p v-if=" block.sub_title" class="md:text-xl text-sm font-light md:leading-7 leading-6">{{ block.sub_title }}</p>
      <NuxtLink 
        v-if="props.block.button.is_show" 
        :to="props.block.button.link"
        :target="props.block.button.open_new_tab ? '_blank' : ''"
        class="bg-main text-white px-6 py-3 rounded-full hover:bg-main700 transition duration-300 inline-flex md:mt-0 mt-4"
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
  
<style scoped>

</style>