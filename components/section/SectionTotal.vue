<template>
    <section 
      v-if="block.status" 
      :data-cms-bind="dataBinding" 
      class="md:py-[60px] py-6 bg-[#FEF2F2]"
    >
    <div class="container">
       <div class="grid lg:grid-cols-4 grid-cols-2 lg:gap-10 gap-x-4 gap-y-6 items-center justify-center">
          <div v-for="(item, index) in block.list_item" class="grid lg:flex grid-cols-[50px_1fr] justify-center items-center lg:gap-5 gap-2">
            <div class="flex flex-col justify-end items-end">
              <img :src="item.image" alt="Alt Image" class="lg:w-[80px] lg:h-[80px] w-[45px] h-[45px] mx-auto object-cover">
            </div>
            <div class="flex flex-col">
              <p class="lg:text-[40px] text-[30px] leading-[36px] lg:leading-[51px] font-semibold text-[#BF4343]">{{ item.number }}</p>
              <p class="text-[#BF4343] uppercase ">{{ item.content }}</p>
            </div>
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