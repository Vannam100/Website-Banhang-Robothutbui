<template>
  <section 
    v-if="block.status" 
    :data-cms-bind="dataBinding" 
    class="section__intro max-h-[300px] relative flex items-center md:justify-start justify-center md:h-[750px] lg:h-[600px] min-h-[320px] text-white w-full"
    :style="{ backgroundImage: 'linear-gradient(271.01deg, rgba(255, 255, 255, 0) 7.14%, rgba(37, 37, 37, 0.3) 61.08%, rgba(0, 0, 0, 0.3) 73.46%, rgba(0, 0, 0, 0.3) 82.88%, rgba(0, 0, 0, 0.3) 99.06%), url(\'' + block.background_image + '\')' }"
  >
    <div class="absolute pointer-events-none inset-0 bg-black opacity-40" />
    <div class="relative z-10 md:ml-[150px] ml-0 md:text-left text-center">
      <div :class="route.path === '/' ? 'mt-0' : 'mt-14'" class="md:text-[44px] text-[28px] leading-9 font-bold md:leading-[70px] lg:mb-4 uppercase w-full" v-html="(route.path === '/san-pham' && isMobile)  || (route.path === '/san-pham' && isMobile) ? 'sản phẩm' : block.title" />
      <p v-if=" block.sub_title" class="text-xl md:text-xl font-light md:leading-7 leading-6">{{ block.sub_title }}</p>
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
const route = useRoute();

interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
  const isMobile = ref(false);
const checkScreenSize = () => {
  isMobile.value = window.innerWidth <= 768; 
}
onMounted(() => {
  checkScreenSize(); 
  window.addEventListener('resize', checkScreenSize);
})

</script>
  
<style scoped>
.section__intro {
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
</style>