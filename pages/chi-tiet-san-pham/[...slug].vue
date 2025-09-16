<!-- eslint-disable vue/html-self-closing -->
<template>
  <section class="w-full relative overflow-hidden">
    <div class="container">
      <ul class="flex items-center gap-2 text-gray-600 lg:pt-[30px] pt-4 lg:text-[16px] text-[12px]">
        <li>
          <NuxtLink to="/" class="hover:underline uppercase whitespace-nowrap ">Trang Chủ</NuxtLink>
        </li>
        <li class="flex items-center">
          <span class="mx-1">/</span>
          <NuxtLink :to="`/san-pham?category=${productDetail?.category?.slug}`" class="whitespace-nowrap hover:underline uppercase">
            {{ productDetail?.category?.name }}
          </NuxtLink>
        </li>
        <li class="flex items-center">
          <span class="mx-1">/</span>
          <a :title="productDetail?.name" class="uppercase line-clamp-1">{{ productDetail?.name }}</a>
        </li>
      </ul>
      <div
        class="grid lg:grid-cols-[2fr_3fr] grid-cols-1 lg:gap-[60px] gap-[30px] lg:py-[30px] py-4"
      >
        <div class="relative">
          <div
            class="overflow-hidden relative flex flex-col justify-center item-center mb-4 max-w-[650px]"
          >
            <inner-image-zoom
              :src="selectedImage"
              :alt="productDetail?.variants[0]?.name"
              :zoomScale="1"
              class="item-image-zoom aspect-[1/1] image"
            />
          </div>
          <div
            class="relative z-10 list-image-product overflow-hidden cursor-pointer max-w-[650px]"
          >
            <swiper
              class="mySwiper"
              :speed="1000"
              :loop="true"
              :slides-per-view="3"
              :space-between="10"
              :breakpoints="{
                '640': {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
                '1024': {
                  slidesPerView: 3,
                  spaceBetween: 10,
                },
              }"
              @swiper="onSwiper"
            >
              <swiper-slide
                class="overflow-hidden"
                v-for="(item, index) in productDetail?.variants"
                :key="index"
                @click="handleSelectOption(item.meta_field[0]?.slug)"
                >
                <div
                  class="item-image-product aspect-[1/1]"
                  :class="{ 'border-active': item.images[0] === selectedImage }"
                >
                  <img :src="item.images ? item.images[0]: '/images/no-image.jpg'" :alt="productDetail?.variants[0].name" />
                </div>
              </swiper-slide>
            </swiper>
          </div>
        </div>
        <div class="flex flex-col">
          <h2 class="title-detail">{{ nameDetail }}</h2>
          <p
            class="uppercase text-[#1661B6] text-[20px] leading-[33px] w-full pb-[10px] border-b border-[#c8c8c8]"
          >
            Thiết bị công nghệ thông minh
          </p>

          <div class="my-4 bg-[#F7F7F7] lg:py-4 py-2 px-[10px] rounded-[10px]">
            <a href="tel:02693865295" v-if="priceDetail == '0'" class="text-main lg:text-[30px] text-[26px] lg:leading-[45px] leading-[40px]">
              Giá liên hệ
            </a>
            <div v-else class="flex gap-2 items-center">
              <span class="text-main lg:text-[30px] text-[24px] lg:leading-[40px] leading-[40px]">{{ formatCurrency(priceDetail) }}</span>
            </div>
          </div>

          <div v-if="productDetail?.product_options[0]">
            <div class="grid lg:grid-cols-[1fr_4fr] grid-cols-[140px_1fr] gap-2" >
              <b>{{ productDetail?.product_options[0]?.name }}:</b>
              <div class="flex gap-2">
                <div v-for="(item, index) in productDetail?.product_options[0]?.values" :key="index">
                  <span @click="handleSelectOption(item.slug)" class="capitalize cursor-pointer rounded-[5px] border py-[5px] px-[10px]" :class="route.query.option === item.slug ? 'border-main text-main' : 'border-[#C8C8C8]'">{{ item.value }}</span>
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="productDetail?.additional_data"
            class="flex flex-col lg:gap-4 gap-2 lg:text-[20px] text-[14px] lg:leading-[30px] leading-[21px] mt-[20px]"
          >
          <div
            v-for="(item, key) in productDetail?.additional_data"
            :key="key"        
          >
            <div v-if="item?.additional_data == 'notice'" class="flex gap-2 text-main italic font-light pb-[20px]">
              <span class="whitespace-nowrap">{{ item.name }}:</span><div v-html="item.value"></div>
            </div>
            <div v-else class="flex flex-col lg:gap-2 gap-1">
              <b>{{ item.name }}:</b><div v-html="item.value"></div>
            </div>
          </div>
          </div>

          <div class="flex justify-start my-6 flex-wrap gap-2 lg:text-[18px]">
            <div
              class="button-add w-full sm:max-w-[260px] cursor-pointer flex justify-center items-center gap-2"
              @click="handleAddToCart(productDetail, false)"
            >
              <UIcon name="i-mdi-cart" class="min-w-[20px] w-[24px] h-[24px]" />
              <span>Thêm vào giỏ hàng</span>
            </div>
            <div
              class="button-order w-full sm:max-w-[260px] cursor-pointer flex justify-center items-center gap-2"
              @click="handleAddToCart(productDetail, true)"
            >
              <span>Đặt hàng ngay</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <SectionRelate/>
</template>

<script lang="ts" setup>
import InnerImageZoom from 'vue-inner-image-zoom';
import { API_BASE_URL } from '@/constant/apiConfig';
import { products } from '@/data/products.ts';

import { useRoute } from 'vue-router';
import { useCartStore } from '~/stores/cart';
const toast = useToast();
const cartStore = useCartStore();
const route = useRoute();
const router = useRouter();
const onSwiper = (e: any) => {
  swiperInstance.value = e;
};
const swiperInstance = ref<any | null>(null);

const formatCurrency = (value: any) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};

const productDetail = computed(() => {
  const slug = route.params.slug as string
  return products.find((p:any) => p.slug == slug)
})

// if (!productDetail.value) {
//   throw createError({ statusCode: 404, statusMessage: 'Product not found' })
// }
const handleSelectOption = (slug: any) => {
  router.push({
    path: `/chi-tiet-san-pham/${route.params.slug}`,
    query: {
      option: slug,
    },
  });
  const selectedVariant = productDetail.value?.variants?.find((variant) =>
    variant.meta_field.some((meta:any) => meta.slug === slug)
  );
  selectedImage.value = selectedVariant?.images[0] || '/images/no-image.jpg';
};

const priceDetail = computed(() => {
  const selectedVariant = productDetail.value?.variants?.find((variant) => {
    const hasOption = route.query.option
      ? variant.meta_field.some((meta:any) => meta.slug === route.query.option)
      : true;
      return hasOption;
  })
  return selectedVariant?.unit_price || productDetail.value?.variants[0].unit_price;
})
const nameDetail = computed(() => {
  const selectedVariant = productDetail.value?.variants?.find((variant) => {
    const hasOption = route.query.option
      ? variant.meta_field.some((meta:any) => meta.slug === route.query.option)
      : true;
      return hasOption;
  })
  return selectedVariant?.name || productDetail.value?.variants[0].name;
})
const imageDetail = computed(() => {
  const selectedVariant = productDetail.value?.variants?.find((variant) => {
    const hasOption = route.query.option
      ? variant.meta_field.some((meta:any) => meta.slug === route.query.option)
      : true;
      return hasOption;
  })
  return selectedVariant?.images[0] || productDetail.value?.variants[0]?.images[0];
})
const selectedImage = ref( imageDetail.value ? imageDetail.value : '/images/no-image.jpg');

const selectImage = (imageUrl: string) => {
  selectedImage.value = imageUrl;
};

const handleAddToCart = (product: any, isCheckOut?: boolean) => {
  const selectedVariant = product.variants.find((variant: any) =>
    route.query.option
      ? variant.meta_field.some((meta: any) => meta.slug === route.query.option)
      : true
  );

  if (!selectedVariant) {
    toast.add({
      icon: 'i-heroicons-exclamation-circle',
      title: 'Vui lòng chọn một biến thể hợp lệ!',
      color: 'red',
    });
    return;
  }

  const productWithSelectedVariant = {
    ...product,
    selectedVariant,
  };

  cartStore.addToCart(productWithSelectedVariant); 
  cartStore.triggerCartShake();

  if (isCheckOut) {
    router.push({ path: '/thanh-toan' });
  } else {
    toast.add({
      icon: 'i-heroicons-check-badge',
      title: `Đã thêm ${selectedVariant.name} vào giỏ hàng!`,
      color: 'green',
    });
  }
};

watch(
  () => route.query.option,
  (newOption) => {
    const selectedVariant = productDetail.value?.variants?.find((variant) => {
      return newOption
        ? variant.meta_field.some((meta:any) => meta.slug === newOption)
        : true;
    });
    selectedImage.value = selectedVariant?.images[0] || '/images/no-image.jpg';
  }
);

</script>

<style lang="scss" scoped>
.title-detail {
  margin-bottom: 10px;
  font-weight: bold;
  line-height: 42px;
  font-size: 28px;
}
@media (max-width: 768px) {
  .title-detail{
    font-size: 26px;
    line-height: 30px;
  }
}
.button-order {
  height: 56px;
  padding: 5px 30px;
  border-radius: 10px;
  font-weight: 500;
  text-align: center;
  color: #fff;
  background: var(--color-main);
  border: 1px solid var(--color-main);
  transition: all ease 0.4s;
  cursor: pointer;
  text-transform: uppercase;
  white-space: nowrap;
  &:hover {
    color: var(--color-main);
    background: none;
  }
}
.button-add {
  height: 56px;
  padding: 5px 30px;
  border-radius: 10px;
  font-weight: 500;
  text-align: center;
  color: var(--color-main);
  background: var(--color-secondary);
  border: 1px solid var(--color-secondary);
  transition: all ease 0.4s;
  cursor: pointer;
  text-transform: uppercase;
  white-space: nowrap;
  &:hover {
    border: 1px solid var(--color-main);
    color: var(--color-main);
    background: none;
  }
}

.list-image-product {
  transform: translate3d(0px, 0px, 0px);
  transition: all;
  .item-image-product {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 1px solid #c8c8c8;
    img {
      border-radius: 20px;
      width: 100%;
      height: 100%;
      padding: 10px;
      object-fit: contain;
    }
  }
}
.item-image-zoom {
  border-radius: 20px;
  border: 1px solid #c8c8c8;
  :deep {
    div{
      width: 100% !important;
      height: 100% !important;
      display: flex !important;
      justify-content: center !important;
      align-items: center !important;
      picture {
        width: 100% !important;
        height: 100% !important;
        img{
          object-position: center;
          object-fit: contain;
          width: 100% !important;
          height: 100% !important;
        }
      }
    }
  }
}
.border-active {
  border: 2px solid var(--color-main) !important;
}
</style>
