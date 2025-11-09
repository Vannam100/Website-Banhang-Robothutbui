<script lang="ts" setup>
import { useCartStore } from '~/stores/cart';

interface Props {
  product: any;
}
const props = defineProps<Props>();
const cartStore = useCartStore()
const toast = useToast();
const router = useRouter();
const getProductDetail = async (slug:any) => {
  try {
    router.push({ path: `/chi-tiet-san-pham/${slug}` })
  } catch (error) {
    console.error(error);
  }
}
// const handleAddToCart = (product:any) => {
//   cartStore.addToCart(product);
//   cartStore.triggerCartShake();
//   toast.add({
//     icon: 'i-heroicons-check-badge',
//     title: `Đã Thêm ${product.name}!`,
//     color: 'green',
//   });
// }
const getFirstVariant = (product: any) => {
  return product.variants && product.variants.length > 0
    ? product.variants[0]
    : null;
};
const handleAddToCart = (product: any) => {
  const firstVariant = getFirstVariant(product);
  if (!firstVariant) {
    toast.add({
      icon: 'i-heroicons-x-circle',
      title: 'Không tìm thấy variant của sản phẩm!',
      color: 'red',
    });
    return;
  }
  const itemToAdd = {
    ...product,
    selectedVariant: firstVariant,
  };
  cartStore.addToCart(itemToAdd);
  cartStore.triggerCartShake();
  toast.add({
    icon: 'i-heroicons-check-badge',
    title: `Đã Thêm ${firstVariant.name}!`,
    color: 'green',
  });
};
const checkMobile = ref(false);
const checkScreenSize = () => {
  checkMobile.value = window.innerWidth >= 768; 
}
onMounted(() => {
  checkScreenSize(); 
  window.addEventListener('resize', checkScreenSize);
})
</script>
<template>
  <div class="box__product md:p-3 p-2 cursor-pointer">
    <div class="flex sm:items-center sm:justify-between sm:h-[44px] h-[30px] lg:mb-3">
      <p class="text-main700 font-normal uppercase sm:w-[calc(100%_-_44px)] w-full text-start lg:line-clamp-1 lg:mb-1">{{ props.product?.category?.name }}</p>
      <span v-if="props?.product?.unit_price" class="lg:flex hidden cursor-pointer btn__cart sm:w-[44px] w-[30px] sm:h-[44px] h-[30px]" @click="handleAddToCart(props.product)">
        <UIcon name="i-mdi-cart-outline" class="sm:w-5 w-4 sm:h-5 h-4" />
      </span>
    </div>
    <div 
      @click="getProductDetail(props.product.slug)"
      class="aspect-[1/1] overflow-hidden product-image"
    >
      <img 
        :src="props.product?.variants[0]?.images ? (props.product?.variants[0]?.images[0] ? props.product?.variants[0]?.images[0] : '/images/no-image.jpg') : '/images/no-image.jpg'" 
        :alt="props.product?.variants[0]?.name ? props.product?.variants[0]?.name : 'Alt Image'" 
        class="image transition-all duration-500 ease-in-out" 
      />
    </div>
    <div class="lg:mt-3 text-start">
      <a
        :title="props?.product?.name ? props?.product?.name : 'Đang cập nhật sản phẩm'"
        class="md:text-[18px] text-[16px] sm:leading-[24px] leading-[20px] sm:min-h-[48px] min-h-[40px] uppercase text-black hover:text-main font-medium line-clamp-2 cursor-pointer transition-all duration-300 "
        @click="getProductDetail(props.product?.slug)"
      >
        {{ props?.product?.name ? props?.product?.name : 'Đang cập nhật sản phẩm' }}
    </a>
      <p v-if="props?.product?.short_description && checkMobile" class="sm:line-clamp-2 line-clamp-3 text-[#7B7B7B] sm:text-[16px] sm:leading-[24px] leading-[20px] sm:min-h-[48px] min-h-[60px] font-normal sm:my-2 my-1">{{ props.product.short_description }}</p>
     <div class="flex justify-between items-center">
      <span class="text-main lg:text-[18px] text-[16px] leading-[26px] font-bold" :class="checkMobile ? 'mt-4' : ''">
        {{ props?.product?.unit_price  ? convertVND(props?.product?.unit_price) : 'Liên hệ'  }}
      </span>
      <div class="lg:hidden block sm:h-[44px] h-[30px]">
        <span v-if="props?.product?.unit_price" class="cursor-pointer flex btn__cart sm:w-[44px] w-[30px] sm:h-[44px] h-[30px]" @click="handleAddToCart(props.product)">
          <UIcon name="i-mdi-cart-outline" class="sm:w-5 w-4 sm:h-5 h-4" />
        </span>
      </div>
    </div>
    </div>
  </div>
</template>
<style lang="scss">
.box__product {
  background-color: var(--color-white);
  // border-radius: 10px;
  border: 1px solid #C8C8C8;
  .btn__cart{
    background-color: var(--color-white);
    border-radius: 100%;
    border:1px solid rgba(117, 117, 117, 0.5);
    justify-content: center;
    align-items: center;
    transition: all .3s ease-in-out;
    &:hover{
      border-color: var(--color-main);
      background-color: var(--color-main);
    }
    & > span{
      transition: all .3s ease-in-out;
      color: #C8C8C8
    }
    &:hover>span{
      color: var(--color-white)
    }
  }
  .product-image{
    &img {
      transition: all .3s ease-in-out;
    }
    &:hover img {
      transform: scale(1.1);
    }
  }
}

</style>