<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="md:py-[50px] py-4 w-full relative flex flex-col justify-center item-center"
  >
    <div class="w-full relative py-4" v-for="(item, index) in filteredCate()" :key="index">
      <div class="container">
        <h2
          v-show="products.filter(p => p.category.slug === item.slug).length > 0"
          v-html="item.name"
          class="text-center text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6"
        ></h2>
        <div
          v-show="!products.some(p => p.category.slug === item.slug) && route?.query?.category"
          class="text-center text-[26px] py-[20px] font-bold"
        >
          KHÔNG TÌM THẤY SẢN PHẨM
        </div>
        <div class="py-[20px] relative">
          <div class="relative w-full justify-center items-center grid lg:grid-cols-4 grid-cols-2 sm:gap-[24px] gap-[10px]">
            <div
              class="item_product"
              v-for="(elm, key) in products.filter(p => p.category.slug === item.slug)"
              :key="key"
            >
              <BaseProduct :product="elm" />
            </div>
          </div>
          <!-- <div v-if="listProduct[item.slug]?.length > 0 && currentPage[item.slug] < totalPages[item.slug]" class="w-full flex flex-col justify-center items-center">
            <NuxtLink
              v-if="route.fullPath === '/san-pham'"
              :to="`/san-pham?category=${item.slug}`"
              class="bg-main text-white px-6 py-4 rounded-full hover:bg-main700 transition duration-300 mt-[30px] uppercase text-[16px]"
            >
              Xem thêm
            </NuxtLink>
            <button
              v-else
              @click="handleShowMore(item.slug)"
              class="bg-main text-white px-5 py-3 rounded-full hover:bg-main700 transition duration-300 mt-[30px] uppercase text-[16px]"
            >
              Xem thêm
            </button>
          </div> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { products } from '@/data/products.ts';
import { category } from '@/data/category.ts';

interface Props {
  dataBinding: any;
  block: any;
}

const props = defineProps<Props>();
const route = useRoute();
const listProduct = products;
const listCategory = category;

// const listCategory = ref<any[]>([]); 
// const listProduct = ref<{ [key: string]: any[] }>({}); 
const currentPage = ref<{ [key: string]: number }>({}); 
const totalPages = ref<{ [key: string]: number }>({}); 
const PER_PAGE = 12; 

const filteredCate = () => {
  if (route?.query?.category) {
    return listCategory.filter((item) => item.slug === route?.query?.category);
  }
  return listCategory;
};

const displayedData = (slug: string) => {
  return listProduct[slug]?.slice(0, currentPage.value[slug] * PER_PAGE) || [];
};

// watch(
//   () => props.block.tenant_id,
//   (newTenantId) => {
//     if (newTenantId) {
//       getCategory(newTenantId);
//     }
//   },
//   { immediate: true }
// );

// watch(
//   () => route?.query?.category,
//   () => {
//     fetchAllProducts();
//   },
//   { immediate: true }
// );
</script>

<style lang="scss" scoped>
.btn__add_cart {
  & > span {
    transition: all 0.3s ease-in-out;
    &:hover {
      color: var(--color-main);
    }
  }
}
.item-title-category {
  position: relative;
  left: -11px;
  display: inline-block;
  margin-top: 46px;
  margin-bottom: 0;
  font-weight: bold;
  font-size: 14px;
  text-transform: uppercase;
  color: #ffffff;
  padding: 15px 42px 11px;
  background-size: 100% 100%;
  z-index: 50;
}
 
</style>