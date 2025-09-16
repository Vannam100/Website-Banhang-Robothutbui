<template> 
  <div
    class="relative z-[99999]"
    :class="!isShowCart ? 'pointer-events-none' : 'pointer-events-auto'"
  >
    <div
      :class="!isShowCart ? 'opacity-0' : 'opacity-100'"
      class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity ease-in-out duration-500 w-full h-[100vh]"
    />
    <div
      :class="!isShowCart ? 'translate-x-full' : 'translate-x-0'"
      class="fixed inset-0 overflow-hidden transition ease-in-out duration-500"
    >
      <div class="absolute inset-0 overflow-hidden">
        <div class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
          <div class="pointer-events-auto w-screen max-w-md">
            <div class="flex h-full flex-col bg-white shadow-xl">
              <div class="flex-1 overflow-y-auto px-4 py-6 sm:px-6 custom-scroll">
                <div class="flex items-start justify-between border-b pb-2">
                  <h2 class="text-lg font-bold text-gray-900 flex justify-start items-end gap-3 uppercase" id="slide-over-title"> 
                    <div>
                      <img :src="headerData.logo" :alt="headerData.logo_alt" class="image max-h-[30px]"/>
                    </div>
                    Giỏ hàng
                  </h2>
                  <div class="ml-3 flex h-7 items-center">
                    <button @click="hideModal()" type="button" class="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                      <span class="absolute -inset-0.5"></span>
                      <span class="sr-only">Đóng</span>
                      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                <div class="mt-8">
                  <div class="flow-root">
                    <ul role="list" class="-my-6 divide-y divide-gray-200">
                      <li
                        v-for="(item, index) in products"
                        :key="index"
                        class="flex py-6"
                      >
                        <!-- <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                          <img :src="item.image ? item.image : '/images/no-image.jpg'" :alt="item.name" class="h-full w-full object-cover object-center">
                        </div> -->

                        <!-- <div class="ml-4 flex flex-1 flex-col">
                          <div>
                            <div class="flex justify-between text-base text-gray-900">
                              <h3
                                class="text-sm font-bold line-clamp-2 text-main hover:text-secondary cursor-pointer"
                                @click="getProductDetail(item.slug)"
                              >
                                {{ item.name }}
                              </h3>
                              <p class="ml-4 text-secondary font-medium">{{ convertVND(item.unit_price) }}</p>
                            </div>
                            <p class="mt-1 text-[13px] text-gray-500">{{ item.category.name }}</p>
                          </div>
                          <div class="flex flex-1 items-end justify-between text-sm">
                            <p class="text-gray-500">Số lượng {{ item.quantity }}</p>
                            <div class="flex">
                              <button
                                type="button"
                                class="font-bold
                                text-gray-500
                                hover:text-main"
                                @click="handleRemoveItemFromCart(item.product_variant_id)"
                              >
                                Xóa
                              </button>
                            </div>
                          </div>
                        </div> -->
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <div class="border-t border-gray-200 px-4 py-6 sm:px-6">
                <div class="flex justify-between text-base font-bold text-main">
                  <p>Tổng cộng</p>
                  <p>{{ convertVND(totalPrice) }}</p>
                </div>
                <p class="mt-0.5 text-sm text-gray-500">Vận chuyển và thuế được tính khi thanh toán.</p>
                <div class="mt-6">
                  <NuxtLink to="/thanh-toan" class="flex items-center justify-center rounded-md border border-transparent bg-main px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-secondary transition-all duration-300 ease-in-out">Thanh toán</NuxtLink>
                </div>
                <div class="mt-6 flex justify-center text-center text-sm text-gray-500">
                  <p>
                    hoặc
                    <NuxtLink to="/san-pham" class="font-bold text-secondary hover:text-main">
                      Tiếp tục mua hàng
                      <span aria-hidden="true"> &rarr;</span>
                    </NuxtLink>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { useCartStore } from '~/stores/cart';
import { API_BASE_URL } from '@/constant/apiConfig';

interface Props {
  headerData: any;
}
defineProps<Props>();
const route = useRoute();
const router = useRouter();
const cartStore = useCartStore()
const products = computed(() => {
  return cartStore.listCart ? cartStore.listCart.map((item:any) => item) : []
})
const totalPrice = computed<number>(() => {
  return cartStore.totalPrice
})
const quantity  = products.value.length
const elementBody = ref<any>()

const isShowCart = ref<boolean>(false)
const showModal = () => {
  if(cartStore.listCart.length === 0){
    alert('Giỏ hàng rỗng')
    return
  }
  isShowCart.value = true;
  elementBody.value.classList.add("overflow-hidden")
};
const hideModal = () => {
  isShowCart.value = false;
  elementBody.value.classList.remove("overflow-hidden")
};
// DefineExpose
defineExpose({
  showModal,
  hideModal,
  quantity
});
const handleRemoveItemFromCart = (id:number) => {
  cartStore.removeItemFromCart(id)
}
onBeforeMount(() => {
  cartStore.getListCart()
})
onMounted(() => {
  elementBody.value = document.querySelector('body')
})
watch(
  () => route.fullPath,
  (value) => {
    if (value.includes('thanh-toan')||value.includes('san-pham')) {
      hideModal()
    }
  },
  { deep: true }
);
const getProductDetail = async (slug:string) => {
  try {
    await useFetch(`${API_BASE_URL}/product/product/view?slug=${slug}`);
    router.push({ 
      path: `/detail`,
      query: {
        slug : slug
      }
    })
  } catch (error) {
    console.error(error);
  }
}
</script>
<style lang="scss" scoped></style>