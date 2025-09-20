<template>
  <div v-if="Category?.length > 0"  class="flex flex-wrap lg:gap-3 gap-1 md:my-5 my-3">
    <NuxtLink 
      class="md:p-2.5 p-2 rounded-xl inline-block" 
      :class="route.path === '/blog' ? 'bg-main text-white' : 'bg-secondary text-main' " 
      to="/blog"
    >
      Tin tức
    </NuxtLink>
    <template v-for="(item, index) in Category" :key="index">
      <NuxtLink 
        v-if="item?.text" 
        :target="item?.open_new_tab ? '_blank': ''" 
        class="md:p-2.5 p-2 rounded-xl inline-block" 
        :class="route.path === `/blog/category${item._path}`? 'bg-[#FFC8C8] text-black' : 'bg-secondary text-main' " 
        :to="`/blog/category${item._path}`"
      >
        {{ item?.text }}
      </NuxtLink>
    </template>
  </div>
</template>

<script lang="ts" setup>
const blogStore = useCounterStore()
const route = useRoute();

const posts = ref(blogStore.posts);

const removeDuplicates = (array:any[]) => {
  if (array.length > 0) {
    const unique = array.filter((item, index, self) => {
      if (typeof item.text === 'string') {
      return index === self.findIndex((t) => {
          if ( typeof t?.text=== 'string') {
            return t?.text.toLowerCase().trimEnd() === item?.text.toLowerCase().trimEnd()
            
          }}
        )}
      }
    );
    return unique;
  }
};
const Category:any = blogStore.category
</script>
