<template>
  <NuxtLink class="inline-block" :to="data._path">
    <div>
      <img
        class="mb-[12px] w-full object-cover rounded-[10px] h-full max-h-[200px]"
        :src="data.thumbImg.image"
        :alt="data.thumbImg.image_alt"
      />
    </div>
    <div class="flex flex-col md:gap-3 gap-2">
      <span class="text-main900 md:text-[18px] text-[12px] md:leading-[27px] leading-normal">{{ renderDatePost(data.date) }} </span>
      <h3 class="text-main900 uppercase leading-6 text-md line-clamp-3 min-h-[72px]">{{ data.title }}</h3>
      <div class="text-[14px] leading-[21px] text-main">
        Xem chi tiết →  
      </div>
    </div>
  </NuxtLink>
</template>

<script lang="ts" setup>

interface Props {
  data: any
}

const { data } = defineProps<Props>()
const { renderDatePost } = useBlogPageHelpers();
</script>
<style lang="scss" scoped>
</style>