<template>
  <main>
    <div class="container">
      <div class="w-full md:py-[50px] py-4">
        <div class="flex flex-col justify-between">
          <slot :data="pagePosts" />
          <div :class="!(posts?.length > itemsPerPage) && 'flex-1'" class="mx-auto w-fit md:mt-6 mt-4">
            <UPagination 
              v-if="posts?.length > itemsPerPage" 
              size="lg" 
              v-model="pagination" 
              :max="7" 
              :page-count="1"
              :total="totalPagination" 
              :prev-button="{ to: handleOnClickPagination(pagination - 1) }"
              :next-button="{ to: handleOnClickPagination(pagination + 1) }" 
              :to="(page: number) => ({
                query: { ...route.query, page }
              })" 
            />
          </div>
          <div v-if="pagePosts.length === 0 && existPath" class="md:mt-4 mt-2 text-center text-xl">
            Đang cập nhật bài biết
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script lang="ts" setup>
interface Props {
  itemsPerPage: number
}
const { itemsPerPage } = defineProps<Props>()
const { toSlug } = useBlogPageHelpers();
const route = useRoute();
const blockStore = useCounterStore();

const queryParamsPage = computed(() => {
  return Number(route.query.page) ? Number(route.query.page) * 1 : 1
})

const pagination = ref(queryParamsPage.value);

const currentPage = ref<number>(queryParamsPage.value);

const totalPagination = computed(() => {
  return Math.ceil((posts.value?.length / itemsPerPage));
});

const posts = ref<any>(blockStore.block);

const handleOnClickPagination = (pagination: any) => {
  return {
    path: route.path,
    query: { ...route.query, page: pagination }
  }
}

const pagePosts = computed(() => {
  return posts.value.slice(
    (currentPage.value - 1) * itemsPerPage,
    currentPage.value * itemsPerPage
  );
});

const excludedRoutes = ['blog-category-slug', 'blog-tags-slug', 'blog'];

const existPath = excludedRoutes.includes(String(route.name));

const removeDuplicates = (array:any[]) => {
  const unique = array.filter((item, index, self) => {
    if (typeof item.text === 'string') {
      return (
        index ===
        self.findIndex((t:any) => {
          if (typeof t?.text === 'string') {
            return t.text.toLowerCase() === item.text.toLowerCase();
          }
        })
      );
    }
  });
  return unique;
};

function FilterPostsByRouteSlug(list: any, key: any) {
  const listFilter: any[] = [];
  let newArray: any[] = [];

  list.forEach((item: any) => {
    if (key in item && Array.isArray(item[key]) && item[key].length > 0) {
      newArray = removeDuplicates(item[key]);
      newArray.map((value: any) => {
        if (typeof value.text === 'string' && toSlug(value.text) === route?.params?.slug.toString()) {
          listFilter.push(item);
        }
      });
    }
  });
  return listFilter;
}

const filterPosts = () => {
  if (route.path.startsWith('/blog/tags')) {
    posts.value = FilterPostsByRouteSlug(posts.value, 'tags');
  } else if (route.path !== '/blog' && route.path !== '/blog/') {
    posts.value = FilterPostsByRouteSlug(posts.value, 'category');
  }
  blockStore.totalPaginationAction(posts.value.length, itemsPerPage);
};
filterPosts();

watch(
  () => blockStore.block,
  (newValue) => {
    posts.value = newValue;
    filterPosts();
  },
  { immediate: true }
);

watch(
  () => route.path,
  () => {
    filterPosts();
  }
);

watch(
  () => Number(route.query?.page),
  (newQuery) => {
    if (newQuery) {
      currentPage.value = newQuery;
    } else if (newQuery === 1) {
      pagination.value = 1;
    } else {
      currentPage.value = 1
    }
  }
);
</script>

<style lang="scss" scoped>
.bg-primary-500 {
  background-color: var(--color-main) !important;
}
</style>