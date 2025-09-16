<template>
  <div v-if="Tags?.length > 0">
    <h3 class=" text-main text-lg font-bold mb-2">Tags</h3>
    <div class=" relative w-full border mb-3">
      <span class=" absolute top-1/2 -translate-y-1/2 left-0 bg-main h-[2px] w-1/5"></span>
    </div>    
      <div class="flex gap-2 justify-start items-center flex-wrap">
        <div
          v-for="(item, index) in Tags" 
          :key="index" 
          class="cursor-pointer rounded bg-main hover:opacity-80 transition-all duration-300 py-2 px-4 w-fit"
        >
          <NuxtLink  :to="`/blog/tags${item._path}`" :target="item?.open_new_tab ? '_blank': ''">
            <h3 class="select-none text-white">{{ item.text }}</h3>
          </NuxtLink> 
        </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const blogStore = useCounterStore()

const Tags:any = blogStore.tags
</script>
