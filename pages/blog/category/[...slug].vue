<template>
  <main>
    <template v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
      <component
        :is="formattedPage.content_blocks[0]._block_name"
        :block="formattedPage.content_blocks[0]"
        :data-binding="`#content_blocks`"
      />
    </template>
    <div :style="backgroundComputed">
      <BlogHero :itemsPerPage="itemsPerPage" v-slot="{ data }">
        <h2 class="title-main text-main900 text-start">Tin tức</h2>
        <BlogCategory />
        <h4 class="text-xl leading-7 uppercase font-bold">Tin tức nổi bật</h4>
        <div v-if="data" class="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 md:gap-10 gap-4 md:mt-5 mt-3">
          <BlogCard v-for="(item, index) in data" :key="index" :data="item" />
        </div>
      </BlogHero>
      <template v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
        <component
          :is="block._block_name"
          v-for="(block, index) in formattedPage.content_blocks?.slice(1)"
          :key="index"
          :block="block"
          :data-binding="`#content_blocks.${index}`"
        />
      </template>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useNewzenPage } from '~/composables/useNewzenPage';
import { useFetchBlogContent } from '~/composables/useBlogPage';
import { computed } from 'vue';

const { contentBlog } = await useFetchBlogContent();
const pageDataBlog = contentBlog.value;
const { formattedPage } = useNewzenPage(pageDataBlog);

const itemsPerPage = computed(() => {
  if (!formattedPage.value?.items_per_page || formattedPage.value?.items_per_page <= 1) return 6;
  return formattedPage.value?.items_per_page;
});

const backgroundComputed = computed(() =>
  formattedPage.value?.background_image
    ? {
        background: `url(${formattedPage.value?.background_image}) center / cover` || 'unset'
      }
    : { backgroundColor: formattedPage.value?.background_color || 'unset' }
);
</script>

<style lang="scss" scoped>
</style>