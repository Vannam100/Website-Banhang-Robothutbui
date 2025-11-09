<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="md:py-[50px] py-[25px]"
  >
    <div class="container">
      <div
        v-html="block.title"
        class="text-center text-4xl lg:text-5xl font-bold text-gray-800 leading-tight mb-6"
      ></div>
      <div v-if="products.length < 1" class="text-center text-[26px] py-[20px] font-bold">
        KHÔNG TÌM THẤY SẢN PHẨM
      </div>
      <div v-else class="pt-[20px] relative">
        <div class="relative w-full justify-center items-center grid lg:grid-cols-4 grid-cols-2 sm:gap-[24px] gap-[10px]">
          <div
            class="item_product"
            v-for="(product, key) in products"
            :key="key"
          >
            <BaseProduct :product="product" />
          </div>
        </div>
        <div v-if="currentPage < totalPages" class="w-full flex flex-col justify-center items-center">
          <button
            @click="handleShowMore"
            class="bg-main text-white px-6 py-4 rounded-full hover:bg-main700 transition duration-300 mt-[30px] uppercase text-[16px]"
          >
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
const route = useRoute();

const products = ref<any[]>([]); 
const currentPage = ref(1); 
const totalPages = ref(0);
const PER_PAGE = 12; 

const handleShowMore = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};


</script>

<style lang="scss" scoped>
.item_product {
  transition: all 0.3s ease-in-out;
}
.item_product:hover {
  transform: scale(1.05);
}
</style>
