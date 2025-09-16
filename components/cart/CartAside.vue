<template>
  <aside>
    <div class="sm:p-5 p-4 lg:rounded-[20px] rounded-[10px] border-[#C8C8C8] border">
      <div class="text-[#676767] sm:text-[18px] text-md leading-4 flex justify-between items-center">
        <h3 class="uppercase font-medium">tổng đơn hàng</h3>
        <span class="font-normal">{{ quantity }} sản phẩm</span>
      </div>
      <!-- <form @submit.prevent="handleSubmit" class="flex justify-center h-10 items-center my-4 bg-[#999999] rounded-[50px] text-sm leading-2 font-normal">
        <input v-model="discount"
          class="outline-none w-full h-full py-1 px-3 block border border-[#999999] text-black ring-0 ring-inset ring-gray-300 focus:ring-0 rounded-[50px] placeholder:text-[#C8C8C8]"
          type="text" placeholder="Nhập mã khuyến mãi"
        >
        <button
          type="submit"
          class="disabled:hover:opacity-100 px-3 h-full py-2 hover:opacity-85 flex justify-center items-center">
          <span class="text-[#FAFAFA]">Thêm</span>
        </button>
      </form> -->
      <!-- <div class="sm:text-[18px] font-normal text-sm sm:leading-6 leading-4 text-[#363636] flex justify-between items-center">
        <p>Phí vận chuyển</p>
        <p>{{ convertVND(100000) }}</p>
      </div> -->
      <div class="mt-4 sm:text-[18px] font-normal text-sm sm:leading-6 leading-4 text-[#363636] flex justify-between items-center">
        <p>Tổng tạm tính</p>
        <p>{{ convertVND(totalPrice) }}</p>
      </div>
      <!-- <div class="sm:text-[18px] font-normal text-sm sm:leading-6 leading-4 text-[#363636] flex justify-between items-center">
        <p>Khuyến mãi</p>
        <p>- {{ convertVND(0) }}</p>
      </div> -->
      <div class="text-[14px] italic font-light leading-2 text-[#A6A6A6] flex justify-between items-center pb-[20px]">
        <p>Thuế giá trị gia tăng ̣(8%)</p>
        <p>{{ convertVND(taxPrice) }}</p>
      </div>
      <div class="sm:text-[22px] font-bold uppercase py-[20px] text-md sm:leading-[33px] leading-4 text-[#363636] flex justify-between items-center border-t border-[#C8C8C8]">
        <p>Tổng cộng</p>
        <p>{{ convertVND(totalPrice + taxPrice) }}</p>
      </div>
      <div class="text-[14px] italic font-light leading-2 text-[#A6A6A6]">
        <p>Miễn phí giao hàng áp dụng cho đơn hàng giao và lắp đặt tận nơi tại HCM và tất cả đơn hàng nhận tại cửa hàng</p>
      </div>
      <div v-if="isShowButton" class="sm:grid hidden grid-cols-2 gap-2.5 pt-[20px] div__btn">
        <NuxtLink class="gap-2 text-main bg-secondary" to="/san-pham"> 
          <UIcon name="i-mdi-cart-outline" class="w-7 h-7 text-main" />
          mua sắm Thêm
        </NuxtLink>
        <NuxtLink class="gap-2 text-white bg-main" to="/thanh-toan">
          <UIcon name="i-mdi-database-outline" class="w-7 h-7 text-white" />
          Thanh toán
        </NuxtLink>
      </div>
      <div v-if="isShowButton" class="sm:hidden grid grid-cols-2 gap-2.5 pt-[20px] div__btn_mobile">
        <NuxtLink class="text-main bg-secondary" to="/san-pham"> 
          <UIcon name="i-mdi-cart-outline" class="w-7 h-7 text-main" />
          mua sắm Thêm
        </NuxtLink>
        <NuxtLink class="text-white bg-main" to="/thanh-toan">
          <UIcon name="i-mdi-database-outline" class="w-7 h-7 text-white" />
          Thanh toán
        </NuxtLink>
      </div>
    </div>
    <div class="text-center text-sm text-[#A6A6A6] mt-2">
      <b>Bạn cần hổ trợ ?</b> Hãy gọi ngay số <b>0972129712</b>
    </div>
  </aside>
</template>

<script lang="ts" setup>
defineProps<{
  isShowButton: boolean;
}>();
import { useCartStore } from '~/stores/cart';
const cartStore = useCartStore()
const discount = ref<string>("");
const quantity = computed<number>(() => {
  return cartStore.countQuantity
})
const totalPrice = computed<number>(() => {
  return cartStore.totalPrice
})
const taxPrice = computed<number>(() => {
  return 0
})
const handleSubmit = () => {
}
</script>
<style lang="scss" scoped>
.div__btn{
  & a{
    padding: 16px 0px;
    border-radius: 10px;
    text-transform: uppercase;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    line-height: 24px;
    font-weight: 500;
  }
}
.div__btn_mobile{
  & a{
    padding: 8px 0px;
    border-radius: 10px;
    text-transform: uppercase;
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    line-height: 24px;
    font-weight: 500;
  }
}
</style>
