<template>
  <section  
    v-if="block.status" 
    :data-cms-bind="dataBinding"
    :style="{backgroundColor:block.background_color}"
    class="md:pt-[52px] pt-[30px] sm:pb-[52px] pb-[30px]"
  >
    <div class="container">
      <div class="grid md:grid-cols-4 sm:grid-cols-2 grid-cols-1 justify-center items-center gap-6 w-full">
        <div v-for="(item, index) in props.block.items" :key="index" class="text-main bg-[#dbeafe] py-[15px] px-[30px] flex flex-col justify-center items-center text-center w-full h-[300px]">
          <div class="w-full flex flex-col gap-2 justify-center items-center">
            <div v-if="item.image" class="mb-4">
              <img :src="item.image" :alt="item.image_alt" class="w-[30px] object-cover" />
            </div>
            <h3 class="sm:text-[20px] text-[16px] sm:leading-[30px] font-semibold sm:mb-3 mb-2 w-full">
              {{ item.title }} 
            </h3>
          </div>
          <p class="font-light lg:text-[14px] text-[12px] leading-[18px] lg:leading-[30px] lg:px-0 px-10">{{ item.description }}</p>
        </div>
      </div>
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