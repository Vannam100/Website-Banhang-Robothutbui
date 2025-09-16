<template>
  <section
    v-if="block.status" 
    :data-cms-bind="dataBinding" 
    :style="{backgroundImage: 'url('+ block.background_image +')'}"
    class="section__reward relative flex items-center justify-start md:h-[590px] h-[500px] text-white"
  >
    <div class="grid md:grid-cols-2 grid-cols-1  sm:text-start text-center md:px-0 px-[15px]">
      <div class="relative z-10 lg:ml-[150px] ml-[0px] max-w-lg">
        <h2 class="lg:text-[50px] text-[30px] font-bold lg:leading-[70px] leading-normal mb-4 uppercase">
          {{ block.title }}
        </h2>
        <button 
          v-if="block.button.is_show" 
          class="bg-main text-white px-6 py-3 rounded-full hover:bg-main700 transition duration-300"
        >
          <NuxtLink
            :to="props.block.button.link"
            :target="props.block.button.open_new_tab ? '_blank' : ''"
          >
            {{ props.block.button.label }}
          </NuxtLink>
        </button>
      </div>
      <div class=" lg:flex hidden gap-[10px] overflow-hidden">
        <div
          v-for="(item, index) in props.block.listItem"
          :key="index"
          class="h-[325px]"
        >
          <img :src="item.image" :alt="item.image_alt" class="" />
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
.section__reward {
  background-image: linear-gradient(271.01deg, rgba(255, 255, 255, 0) 7.14%, rgba(37, 37, 37, 0.3) 61.08%, rgba(0, 0, 0, 0.3) 73.46%, rgba(0, 0, 0, 0.3) 82.88%, rgba(0, 0, 0, 0.3) 99.06%), linear-gradient(269.73deg, rgba(0, 0, 0, 0) 14.31%, rgba(0, 0, 0, 0.8) 97.17%);
  background-size: cover;
  background-position: center;
}
</style>