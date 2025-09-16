<!-- eslint-disable vue/no-v-html -->
<template>
  <section 
    v-if="props.block.status" 
    :data-cms-bind="dataBinding" 
    :style="{backgroundColor:props.block.background_color}" 
    class="lg:py-10 md:py-6 py-4 w-full"
  >
    <div class="container">
      <div
        class="title-main text-main900 text-start"
        v-html="block.title"
      ></div>
      <div v-if="posts && posts.length > 0" class="mt-[20px] grid md:grid-cols-2 md:gap-[45px]">
        <div class="md:order-1 order-2">
          <div
            v-for="(item, index) in listBlog"
            :key="index"
            class="grid md:grid-cols-[2fr_5fr] gap-4 md:mb-4 mb-0 pb-4 blog-item"
          >
            <div>
              <img :src="item.thumbImg.image" :alt="item.thumbImg.image_alt" class="w-full h-full object-cover rounded-[10px]">
            </div>
            <div>
              <p class="md:text-md text-base line-clamp-1 mb-2.5 text-[#470808]">{{ renderDatePost(item.date) }}</p>
              <NuxtLink :to="item._path" class="md:text-xl text-md leading-normal md:font-medium font-light text-[#470808] hover:text-main uppercase line-clamp-3 transition-all duration-300 ease-in-out">{{ item.title }}</NuxtLink>
            </div>
          </div>
          <button v-if="block.button.is_show" class="lg:block hidden bg-main text-lg leading-[27px] uppercase font-medium text-white px-[30px] py-3 rounded-full hover:bg-main700 transition duration-300">
            <NuxtLink :target="block.button.open_new_tab ? '_blank' : ''" :to="block.button.link">
              {{ block.button.label }}
            </NuxtLink>
          </button>
        </div>
        <div class="md:mb-0 mb-[10px] md:order-2 order-1">
          <NuxtLink :to="firstBlog._path" class="aspect-[5/3] block md:mb-[20px] mb-[10px] ">
            <img class="image rounded-[10px]" :src="firstBlog.thumbImg.image" :alt="firstBlog.thumbImg.image_alt">
          </NuxtLink>
          <p class="text-lg mb-[10px] line-clamp-1 font-normal text-[#470808]">{{ firstBlog.date_time }}</p>
          <NuxtLink :to="firstBlog._path" class="md:text-xl text-md text-[#470808] leading-normal mb-2 font-bold hover:text-main uppercase md:line-clamp-2 transition-all duration-300 ease-in-out">{{ firstBlog.title }}</NuxtLink>
          <p class="md:text-lg text-sm md:line-clamp-2 font-normal text-[#676767]">{{ firstBlog.content }}</p>
        </div>
      </div>
      <div v-else class="md:mt-4 mt-2 text-center text-xl">
        Đang cập nhật bài biết
      </div>
      <button v-if="block.button.is_show" class="lg:hidden block max-w-[250px] bg-main md:text-lg text-sm leading-[27px] uppercase font-medium text-white px-[20px] py-3 rounded-full hover:bg-main700 transition duration-300 md:mt-4 md:mx-[unset] mx-auto">
        <NuxtLink :target="block.button.open_new_tab ? '_blank' : ''" :to="block.button.link">
          {{ block.button.label }}
        </NuxtLink>
      </button>
    </div>
  </section>
</template>
<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
const { renderDatePost} = useBlogPageHelpers();
const blockStore = useCounterStore();
const posts = ref(blockStore.posts);
const destructuredBlogs = computed(() => {
  const [firstBlog, ...listBlog] = posts.value;
  return { firstBlog, listBlog };
});
const { firstBlog, listBlog } = destructuredBlogs.value;
</script>

<style lang="scss" scoped>
.title__main{
  display: flex;
  justify-content: flex-start;
  align-items: end;
  & span{
    flex-grow: 1;
    height: 1px;
    margin-bottom:10px;
    background: #cccccc;
  }
}
@media (min-width: 768px) { 
  .blog-item{
    border-bottom: 0.5px solid var(--Silver-Chalice-300, #C8C8C8)
  }
}
.btn__view__more{
  display: inline-flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  padding: 0 25px;
  font-weight: 500;
  border: 1px solid var(--color-main);
  background-color: var(--color-white);
  font-size: 17px;
  color: var(--color-main);
  transition: all .2s ease-in-out;
  &:hover{
    color: var(--color-white);
    background-color: var(--color-main);
    -webkit-box-shadow: 0 0px 21px rgba(0, 0, 0, 0.5);
    box-shadow: 0 0px 21px rgba(0, 0, 0, 0.5)
  }
}
</style>
