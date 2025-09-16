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
      <BlogHero v-slot="{ data }">
        <h2 class="title-main text-main900 text-start">Tin tức</h2>
        <BlogCategory/>
        <div class="grid lg:grid-cols-[2fr_5fr] grid-cols-1 lg:gap-10 gap-4">
          <div class="flex flex-col gap-4 lg:order-1 order-2">
            <h4 class="text-[20px] leading-[33px] uppercase font-bold">Tin tức nổi bật</h4>
            <div
              v-for="(item, index) in posts" 
              :key="index" 
              class="pb-4 border-b  border-[#C8C8C8] last:border-0 flex flex-col gap-2.5"
            >
              <NuxtLink
                :to="item._path" 
                class="grid lg:grid-cols-[200px_1fr] grid-cols-1 gap-4"
              >
                <div class="w-full h-full">
                  <img
                    class="w-full h-full object-cover rounded-xl max-h-[150px]"
                    :src="item.thumbImg.image"
                    :alt="item.thumbImg.image_alt"
                  />
                </div>
                <div class="flex flex-col gap-2">
                  <span class="text-main900 lg:text-xl text-[12px] lg:leading-7 leading-5">
                    {{ renderDatePost(item.date) }}
                  </span>
                  <h3 class="text-main900 font-light lg:text-md text-sm lg:leading-6 leading-5 text-start uppercase line-clamp-4">
                    {{ item.title }}
                  </h3>
                </div>
              </NuxtLink>
            </div>
            <div>
            <button class=" bg-main text-lg leading-7 uppercase font-medium text-white px-5 py-2.5 whitespace-nowrap rounded-full hover:bg-main700 transition duration-300">
              <NuxtLink to="/blog">
                khám phá thêm
              </NuxtLink>
            </button>
          </div>
          </div>
          <div class="flex flex-col lg:gap-2.5 lg:order-2 order-1">
            <h2 class="font-bold text-3xl text-main900 leading-[45px]">
              {{ pageData.title }}
            </h2>
            <p class="text-[18px] text-main900 uppercase leading-[27px]">{{ renderDatePost(pageData.date) }}</p>
            <div v-if="pageData.desc" v-html="pageData.desc" class="text-justify"></div>
            <ContentDoc v-slot="{ doc }">
              <div
                class="ckeditor-custom"
                v-html="doc.content"
              />
            </ContentDoc>
            <div
              class="fb-comments"
              data-href="https://developers.facebook.com/docs/plugins/comments#configurator"
              data-width="100%"
              data-numposts="1"
            />
            <div class="lg:mt-10 md:mt-8 mt-4 flex flex-col lg:gap-5 gap-4">
              <h4 class="text-[20px] leading-[33px] uppercase font-bold">Tin tức khác</h4>
              <div
                v-for="(item, index) in relatedArticles" 
                :key="index" 
                class="w-full pb-4 border-b border-[#C8C8C8]"
              >
                <NuxtLink :to="item._path" class="grid lg:grid-cols-[1fr_3fr] grid-cols-1 gap-4">
                  <div>
                    <img
                    class="object-cover aspect-[2/1] h-full w-full rounded-[10px]"
                    :src="item.thumbImg.image"
                    />
                  </div>

                  <div class="flex flex-col gap-[10px]">
                    <span
                      class="text-main900 lg:text-[18px] text-[12px] lg:leading-7 leading-6"
                    >
                    {{ renderDatePost(pageData.date)}}
                    </span>
                    <span
                      class="text-main900 lg:text-md text-sm lg:leading-7 leading-6 uppercase text-start lg:line-clamp-2"
                    >
                      {{ item.title }}
                    </span>
                  </div>
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </BlogHero>
      <template v-if="formattedPage && formattedPage?.content_blocks?.length > 0 && formattedPage?.content_blocks !== undefined">
        <component 
          :is="block._block_name" 
          v-for="(block, index) in formattedPage.content_blocks?.slice(1)" 
          :key="index"
          :block="block" :data-binding="`#content_blocks.${index}`" 
        />
      </template>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { useBlogPageHelpers, useFetchBlogContent } from '~/composables/useBlogPage';
const { renderDatePost} = useBlogPageHelpers();
const { contentBlog } = await useFetchBlogContent();
const { page } = useContent();
const blockStore = useCounterStore();

const posts = ref(blockStore.posts.slice(0, 4));
const pageData = page.value;

const relatedArticles = blockStore.posts.filter((article:any) => 
  article.category.some((articleCategory:any) => pageData.category.some((category:any) => category.text === articleCategory.text))
).filter((article:any) => article._path !== pageData._path);
const formattedPage = ref<any>();

const backgroundComputed = computed(() =>
  contentBlog.value?.background_image
    ? { background: `url(${contentBlog.value.background_image}) center / cover` }
    : { backgroundColor: contentBlog.value?.background_color || 'unset' }
);
</script>

<style lang="scss"></style>
