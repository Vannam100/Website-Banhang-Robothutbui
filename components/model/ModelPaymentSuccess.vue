<template>
  <UModal 
    :ui="{
      container: 'flex min-h-full items-center justify-center text-center'
    }"
    v-model="isOpen"
  >
    <UCard
    :ui="{ 
      ring: '', 
      divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      header: {
        base: '',
        background: 'bg-white',
        padding: 'py-2',
      },
      body: {
        base: '',
        background: 'bg-gray-100',
        padding: 'sm:p-4 p-2',
      }
    }"
  >
      <template #header>
        <div class="flex items-center justify-center">
          <UIcon name="i-mdi-check-circle-outline" class=" text-green-500 md:w-10 w-8 md:h-10 h-8" />
        </div>
      </template>
      <div class="h-full max-h-[215px] text-center">
        <h2 class="md:text-lg text-md leading-[20px] font-medium md:mb-4 mb-3 uppercase">Xác nhận thanh toán</h2>
        <div class="text-center italic text-[#999999] md:text-md text-[14px] leading-[21px] px-4">
          <p>Đơn hàng của bạn đang được chuẩn bị... </p>
          <p>Nếu bạn cần hỗ trợ xin vui lòng hãy gọi số</p>
          <p>097 212 9712 ( Nguyễn Văn Nam )</p>
        </div>
      </div>
    </UCard>
  </UModal>
</template>
<script setup lang="ts">
const isOpen = ref(false)
const showModal = () => {
  isOpen.value = true;
};
const hideModal = () => {
  isOpen.value = false;
};

defineExpose({
  showModal,
  hideModal,
});

</script>
<style lang="scss" scoped></style>