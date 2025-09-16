<!-- eslint-disable vue/no-v-html -->
<template>
  <section :data-cms-bind="dataBinding">
    <div class="container">
      <div class="flex flex-col justify-end">
        <div class="p-[7px] flex flex-col gap-[30px]">
          <div class="bg-[#F0F0F0] p-[10px] rounded-[5px]">
            <h2 class="text-[32px] font-bold pb-[15px]">Tin Tức Sự Kiện</h2>
            <ul class="bg-[#fff] flex flex-col">
              <li class="cursor-pointer hover:bg-red-600 hover:text-[#fff] text-[18px] w-full border-b-[1px] border-[#ebebeb] py-[14px] px-[1rem]">Tuyển dụng</li>
              <li class="cursor-pointer hover:bg-red-600 hover:text-[#fff] text-[18px] w-full border-b-[1px] border-[#ebebeb] py-[14px] px-[1rem]">Kinh nghiệm nuôi trồng</li>
              <li class="cursor-pointer hover:bg-red-600 hover:text-[#fff] text-[18px] w-full border-b-[1px] border-[#ebebeb] py-[14px] px-[1rem]">Tin Thủy Sản</li>
              <li class="cursor-pointer hover:bg-red-600 hover:text-[#fff] text-[18px] w-full border-b-[1px] border-[#ebebeb] py-[14px] px-[1rem]">Tin Nông Nghiệp</li>
            </ul>
          </div>
          <div class="flex flex-col gap-[30px]">
            <h2 class="text-[32px] font-bold">Tin Nổi Bật</h2>
            <ul class="bg-[#fff] flex flex-col gap-[20px]">
              <li class="grid grid-cols-[1fr_2fr] gap-2 items-start cursor-pointer">
                <p class="aspect-[45/29]">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn0adnjeFanTumNyg5uhDUiPm1PiQYHWwAzw&s" alt="Alt Image" class="w-full h-full object-cover rounded-md"/>
                </p>
                <h4 class="uppercase text-[18px] font-bold line-clamp-2 leading-[24px]">ĐÊM HỘI TRĂNG RẰM 2024 CÙNG TRƯỜNG SINH GROUP</h4>
              </li>
            </ul>
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
