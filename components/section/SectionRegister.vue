<!-- eslint-disable vue/no-v-html -->
<template>
  <section
    v-if="props.block.status"
    :data-cms-bind="dataBinding"
    class="wrapper_section relative lg:pt-[100px] py-[36px]"
  >
    <div class="container">
      <div class="bg-secondary rounded-3xl lg:py-[30px] lg:px-[60px] md:p-5 p-3">
        <h4 class="text-[22px] leading-[34px] font-semibold uppercase text-center md:mb-2.5 mb-2">{{ block.title }}</h4>
        <p class="text-md leading-[24px] tracking-[0.06px] text-center">{{ block.sub_title }}</p>
        <div class="md:mt-[20px] mt-2 bg-[#FFE1E1] rounded-[10px] lg:p-[30px] md:p-4 p-3">
          <div class="flex lg:flex-row flex-col gap-2 text-md">
            <input type="text" placeholder="Họ và tên" class="rounded-[10px] p-[10px] border border-main lg:w-[50%] outline-none"/>
            <input type="tel" placeholder="Số điện thoại" class="rounded-[10px] p-[10px] border border-main lg:w-[50%] outline-none"/>
            <button class="whitespace-nowrap uppercase bg-main rounded-[10px] py-[10px] px-[20px] text-white tracking-[0.06px] leading-[24px]">đăng kí</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}
const props = defineProps<Props>();
</script>

<style lang="scss" scoped>
</style>
