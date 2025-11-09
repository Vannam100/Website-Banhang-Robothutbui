<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="md:py-8 py-6"
    :style="{backgroundColor:block.background}"
  >
    <BaseLoading :loading="isLoading" />
    <div class="container">
      <div class="title-main text-start mb-2 ckeditor-custom" v-html="block.title" />
      <div
        v-show="cartStore.listCart && cartStore.listCart.length > 0"  
        class="grid lg:grid-cols-[1fr_440px] grid-cols-1 lg:gap-6 gap-4 items-start"
      > 
        <!-- Left Content --> 
        <!-- cart desktop -->
        <div class="sm:block hidden w-full overflow-x-auto overflow-y-hidden table__cart lg:rounded-[20px] rounded p-5">
          <table class="xl:w-full w-[900px]">
            <tr>
              <th class="text-start xl:text-[18px] text-[16px] md:leading-[24px] leading-5">sản phẩm</th>
              <th class="text-start xl:text-[18px] text-[16px] md:leading-[24px] leading-5">Số lượng</th>
              <th class="text-start xl:text-[18px] text-[16px] md:leading-[24px] leading-5">Đơn giá</th>
              <th class="text-start xl:text-[18px] text-[16px] md:leading-[24px] leading-5">Thành tiền</th>
              <th></th>
            </tr>
            <tr v-for="(item, index) in listProductsCart" class="" :key="index">
              <td class="w-[calc(50%_-_36px)]">
                <p class="flex justify-start items-center gap-4">
                  <div
                    class="aspect-[1/1] w-[140px] h-[140px] flex justify-center items-center border border-[#C8C8C8] rounded-md cursor-pointer"
                    @click="getProductDetail(item.slug_product)"
                  >
                    <img 
                      :src="item.image" 
                      :alt="item.name ? item.name : 'Alt Image'" 
                      onerror="this.src='/images/no-image.jpg'" 
                      class="image max-w-[120px] max-h-[120px]" 
                    />
                </div>
                  <p>
                    <h3
                      class="uppercase line-clamp-2 text-black xl:text-[18px] text-[16px] md:leading-[24px] leading-5 font-medium cursor-pointer" 
                      @click="getProductDetail(item.slug_product)"
                    >
                      {{ item.name }}
                    </h3>
                    <p class="text-md text-[#999999]">Danh mục: {{ item.category.name }}</p>
                  </p>
                </p>
              </td>
              <td class="w-1/5">
                <p class="quality__btn grid grid-cols-3 max-w-[140px] text-center py-2.5">
                  <p
                    class="flex justify-center items-center border-r border-[#C8C8C8] cursor-pointer"
                    @click="handleMinusPlusProduct(item.product_variant_id, true)"
                  >
                    <UIcon name="i-mdi-minus" class="w-4 h-4 text-main" />
                </p>
                  <input 
                    class="text-center font-light text-lg leading-4 outline-none ring-0 focus:ring-0"
                    type="number"  
                    :value="item.quantity"
                    @input="filterInput"
                    @blur="handleBlur($event, item.product_variant_id)"
                    min="0"
                    max="100"
                    step="1"
                  >
                  <p
                    class="flex justify-center items-center border-l border-[#C8C8C8] cursor-pointer"
                    @click="handleMinusPlusProduct(item.product_variant_id, false)"
                  >
                    <UIcon name="i-mdi-plus" class="w-4 h-4 text-main" />
                  </p>
                </p>
              </td>
              <td class="w-[15%] text-[18px] leading-4 font-normal">{{ convertVND(item.unit_price) }}</td>
              <td class="w-[15%] text-[18px] leading-4 font-normal">{{ convertVND(item.unit_price * item.quantity) }}</td>
              <td class="w-[36px]">
                <p class="rounded-lg transition-all duration-300 hover:border-red-500 w-[36px] h-[36px] flex justify-center items-center cursor-pointer"  @click="handleRemoveItemFromCart(item.product_variant_id)">
                  <img class="image w-6 h-6" src="/images/delete.png" alt="Icon alt">
                </p>
              </td>
            </tr>
          </table>
          <p class="sm:text-[22px] text-md sm:leading-[33px] leading-2 font-bold text-black flex justify-between items-center pt-[20px]">
            <p>TỔNG TẠM TÍNH</p>
            <p>{{ convertVND(totalPrice) }}</p>
          </p>
        </div>
        <!-- cart mobile -->
        <div class="sm:hidden block w-full overflow-x-auto overflow-y-hidden table__cart rounded-[10px] p-4">
          <div class="flex flex-col gap-4">
            <h3 class="text-[#676767] uppercase font-medium border-b pb-4 sm:text-[18px] text-md">sản phẩm</h3>
            <div v-for="(item, index) in listProductsCart" :key="index" class="flex justify-between w-full pb-4 border-b">
              <div class="grid grid-cols-[90px_1fr] gap-3">
                <div
                  class="h-auto w-[90px] p-1 cursor-pointer border border-[#C8C8C8] rounded-md"
                  @click="getProductDetail(item.slug_product)"
                >
                  <img 
                    onerror="this.src='/images/no-image.jpg'" 
                    :src="item.image" 
                    :alt="item.name ? item.name : 'Alt Image'" 
                    class="image" 
                  />
                </div>
                <div class="flex flex-col gap-2 w-full">
                  <h3
                    class="uppercase line-clamp-2 text-black text-[16px] font-medium cursor-pointer" 
                    @click="getProductDetail(item.slug_product)"
                  >
                    {{ item.name }}
                  </h3>
                  <p class="text-[14px] text-[#999999]">Danh mục: {{ item.category.name }}</p>
                  <div class="text-[14px] leading-4 font-normal">Đơn giá: <span class="text-main text-[16px] font-bold">{{ convertVND(item.unit_price) }}</span></div>
                  <div class="text-[14px] leading-4 font-normal">Thành tiền: <span class="text-main text-[16px] font-bold">{{ convertVND(item.unit_price * item.quantity) }}</span></div>
                  <div class="flex gap-2 w-full justify-between">
                    <p class="grid grid-cols-3 text-center py-2 rounded-[10px] border border-[#C8C8C8] w-full max-w-[300px]">
                      <p
                        class="flex justify-center items-center border-r border-[#C8C8C8] cursor-pointer"
                        @click="handleMinusPlusProduct(item.product_variant_id, true)"
                      >
                        <UIcon name="i-mdi-minus" class="w-4 h-4 text-main" />
                    </p>
                      <input 
                        class="text-center font-light text-lg leading-4 outline-none ring-0 focus:ring-0"
                        type="number"  
                        :value="item.quantity"
                        @input="filterInput"
                        @blur="handleBlur($event, item.product_variant_id)"
                        min="0"
                        max="100"
                        step="1"
                      >
                      <p
                        class="flex justify-center items-center border-l border-[#C8C8C8] cursor-pointer"
                        @click="handleMinusPlusProduct(item.product_variant_id, false)"
                      >
                        <UIcon name="i-mdi-plus" class="w-4 h-4 text-main" />
                      </p>
                    </p>
                    <p class="rounded-lg transition-all duration-300 hover:border-red-500 w-[36px] h-[36px] flex justify-center items-center cursor-pointer"  @click="handleRemoveItemFromCart(item.product_variant_id)">
                      <img class="image w-6 h-6" src="/images/delete.png" alt="Icon alt">
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <p class="sm:text-[22px] text-md sm:leading-[33px] leading-2 font-bold text-black flex justify-between items-center pt-4">
            <p>TỔNG TẠM TÍNH</p>
            <p>{{ convertVND(totalPrice) }}</p>
          </p>
        </div>
        <!-- End Left Content -->
        <!-- Right Content -->
        <CartAside :is-show-button="true" />
      </div>
      <div v-show="!(cartStore.listCart && cartStore.listCart.length > 0)"   class="w-full flex flex-col sm:gap-6 gap-4 items-center justify-center">
        <h2 class="lg:col-span-2 col-span-1 text-2xl text-center font-extrabold leading-normal uppercase">Giỏ hàng của bạn đang rỗng</h2>
        <NuxtLink class="flex gap-2 justify-center items-center text-main bg-secondary button_0" to="/san-pham"> 
          <!-- <UIcon name="i-mdi-cart-outline" class="w-7 h-7 text-main" /> -->
          <span>Xem sản phảm</span>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useCartStore } from '~/stores/cart';
import { convertVND } from '@/utils';

interface Props {
  dataBinding: any;
  block: any;
}
defineProps<Props>();
const isLoading = ref<boolean>(false)
const router = useRouter();
const cartStore = useCartStore()
const listProductsCart = computed(() => {
  return cartStore.listCart ? cartStore.listCart.map((item:any) => item) : []
})

const totalPrice = computed<number>(() => {
  return cartStore.totalPrice
})
const handleRemoveItemFromCart = (id:number) => {
  isLoading.value = true
  setTimeout(() => {
    cartStore.removeItemFromCart(id)
    isLoading.value = false
  }, 500);
}

const getProductDetail = async (slug:any) => {
  try {
    router.push({ path: `/chi-tiet-san-pham/${slug}` })
  } catch (error) {
    console.error(error);
  }
}
onBeforeMount(() => {
  cartStore.getListCart()
})
const inputValue = ref<number>();
function filterInput(event:any) {
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  inputValue.value = Number(event.target.value);
}
const handleBlur = (event:any, id:number) => { 
  if(!inputValue.value) {
    inputValue.value = 1
    event.target.value = 1
  } 
  if (inputValue.value === 0) {
    inputValue.value = 1
    event.target.value = 1
  } 
  cartStore.updateCart(id, Number(inputValue.value))
} 
const handleMinusPlusProduct = (id:number, isMinus:boolean) => { 
  cartStore.updateMinusPlusQuantityCart(id, isMinus)
} 

</script>
<style lang="scss" scoped>
.table__cart{
  border: 1px solid #C8C8C8;
  & tr{
    & th{
      color: #676767;
      font-weight: 500;
      line-height: 24px;
      text-transform: uppercase;
    }
  }
  & tr:nth-child(1){
    border-bottom: 1px solid #C8C8C8;
    & th{
      padding-bottom: 20px
    }
  }
  & tr{
    & td{
      padding-top: 20px;
      padding-bottom: 20px;
      border-bottom: 1px solid #C8C8C8;
    }
  }

  .quality__btn{
    border-radius: 50px;
    border: 1px solid #C8C8C8;
  }
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.button_0 {
    padding: 8px 12px;
    border-radius: 10px;
    text-transform: uppercase;
    font-size: 12px;
    line-height: 24px;
    font-weight: 500;
  }
</style>
  