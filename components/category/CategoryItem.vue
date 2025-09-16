<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="md:py-[50px] py-[25px]"
  >
    <div class="container">
      <div
        v-html="block.title"
        class="title-main text-main900 text-start"
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
import { API_BASE_URL } from "@/constant/apiConfig";

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

const fetchProducts = async (page = 1) => {
  try {
    const res: any = await useFetch(
      `${API_BASE_URL}/product?page=${page}&per-page=${PER_PAGE}&keyword=${route.query.keyword || ""}`
    );
    const data = res.data._rawValue.data;
    products.value = [...products.value, ...data.items];
    totalPages.value = data._meta.pageCount;
  } catch (error) {
    console.error("Error fetching products:", error);
  }
};

const handleShowMore = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchProducts(currentPage.value);
  }
};

watch(
  () => [props.block.tenant_id, route.query.keyword],
  async ([newTenantId]) => {
    if (newTenantId) {
      currentPage.value = 1; 
      products.value = []; 
      await fetchProducts();
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.item_product {
  transition: all 0.3s ease-in-out;
}
.item_product:hover {
  transform: scale(1.05);
}
</style>
