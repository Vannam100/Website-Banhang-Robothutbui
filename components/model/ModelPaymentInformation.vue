<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
interface Props {
  block: any;
  information: any
  linkImageQr: any
  isLoading: boolean
}
const props = defineProps<Props>();
const cartStore = useCartStore()
const options = [
  { value: 1, label: 'Thanh toán khi nhận hàng (COD)', icon: '' },
  { value: 3, label: 'Thanh toán bằng mã QR Code / Tài khoản ngân hàng', icon: '' }
]
const paymentMethod = computed(() => {
  return options.find((item:any) => item.value === props.information.payment_method_id)?.label
})
const totalPrice = computed<number>(() => {
  return cartStore.totalPrice
})
const isOpen = ref(false)
const showModal = () => {
  isOpen.value = true;
};
const hideModal = () => {
  isOpen.value = false;
};
const emit = defineEmits(['handleSubmit'])

function onSubmit() {
  emit('handleSubmit')
}

defineExpose({
  showModal,
  hideModal,
});
</script>

<template>
  <UModal
    :ui="{
      container: 'flex min-h-full items-center justify-center text-center'
    }" 
    v-model="isOpen" 
    prevent-close
  >
    <UCard
      :ui="{ 
        ring: '', 
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
        body: {
          base: '',
          background: 'bg-gray-100',
          padding: 'sm:p-4 p-2 bg-gray-100'
        }
      }"
    >
      <div class="text-center">
        <p v-if="information.payment_method_id == 3"  class="md:text-md text-sm font-medium md:leading-6 leading-5 mb-2">VUI LÒNG QUÉT MÃ BÊN DƯỚI ĐỂ THANH TOÁN CHUYỂN KHOẢN</p>
        <div v-if="information.payment_method_id == 3"  class="flex justify-center items-center">
          <img class="max-w-[200px] min-h-[200px]" :src="linkImageQr">
        </div>
        <h2 class="md:text-lg text-md font-bold mt-2">Chào {{ props.information.shipping_address.name }}</h2>
        <p></p>
        <div v-if="information.payment_method_id == 3"  class="text-sm leading-5" v-html="block.payment_information.content" />
        <div class="border-[#C8C8C8] border rounded-lg my-2 p-[10px]">
          <p class="sm:text-start text-center text-[13px] text-[#999999]">Mã ĐH: {{ information.code }} </p>
          <p v-if="information.payment_method_id == 3" class="sm:text-start text-center text-[13px] text-[#999999]">(Nội dung chuyển khoản là mã đơn hàng: {{ information.code }})</p>
          <div class="flex justify-between sm:flex-nowrap flex-wrap items-center text-[13px] leading-normal">
            <span class="text-[#676767] sm:w-auto w-full">Số tiền thanh toán:</span>
            <p class="text-[#363636] text-md font-bold sm:text-start text-center sm:w-auto w-full">{{ convertVND(totalPrice) }}</p>
          </div>
          <div class="flex justify-between sm:flex-nowrap flex-wrap items-center text-[13px] leading-normal">
            <span class="text-[#676767] sm:text-start text-center sm:w-auto w-full">Hình thức thanh toán:</span>
            <p class="text-[#363636] font-bold sm:w-auto w-full">{{ paymentMethod }}</p>
          </div>
        </div>
        <div class="grid grid-cols-2 sm:gap-4 gap-2 mt-2">
          <UButton class="transition-all duration-300 ease-in-out inline-flex justify-center items-center px-6 sm:py-3.5 py-2 sm:text-md text-sm font-medium bg-white text-main rounded-lg hover:bg-white uppercase" @click="hideModal()">Huỷ</UButton>
          <UButton :loading="isLoading" class="transition-all duration-300 ease-in-out inline-flex justify-center items-center px-6 sm:py-3.5 py-2 sm:text-md text-sm font-medium !bg-main text-white rounded-lg hover:!bg-main uppercase" @click="onSubmit()">Xác nhận</UButton>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
<style lang="scss" scoped>

</style>

