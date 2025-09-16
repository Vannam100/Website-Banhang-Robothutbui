<!-- eslint-disable vue/html-self-closing -->
<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    :style="{ backgroundColor: props.block.background_color }"
    class="md:py-8 py-6"
  >
    <BaseLoading :loading="isLoadingSubmit" />
    <div class="container">
      <div class="title-main text-start mb-2 ckeditor-custom" v-html="block.title" />
      <div
        v-show="cartStore.listCart && cartStore.listCart.length > 0"
        class="grid lg:grid-cols-[1fr_440px] grid-cols-1 sm:gap-6 gap-4 items-start"
      >
        <!-- Left Content -->
        <div class="max-w-full">
          <div class="sm:p-[20px] p-[0px]">
            <ul class="ul__stepper pl-[25px] border-l border-dashed border-[#C3D0DE]">
              <li v-for="(item, index) in steps" :key="index">
                <!-- Title -->
                <div
                  :class="[
                    'ul__stepper__li__title',
                    { active: currentStep == index },
                    { done: steps[index].isCompleted }
                  ]"
                >
                  <p class="font-normal text-[14px] ul__stepper__name__stepper">Bước {{ index + 1 }}</p>
                  <h3 class="sm:text-[24px] text-[20px] sm:leading-[36px] leading-[32px] uppercase font-medium">
                    {{ item.label }}
                  </h3>
                </div>

                <!-- Content -->
                <div class="content">
                  <UForm ref="formRef" class="sm:my-7 my-2" :validate="validate" :state="state" @submit="onSubmit" @error="onError">
                    <!-- Step 1 -->
                    <div v-if="currentStep === index && !steps[0].isCompleted && index === 0">
                      <!-- Information Contact -->
                      <h2 class="sm:text-md text-sm leading-6 font-medium text-[#363636] uppercase">Thông tin liên lạc</h2>
                      <UFormGroup class="input__custom" name="name">
                        <template #label>
                          <p class="custom__label sm:text-md text-[12px] sm:leading-6 leading-4 font-normal">Họ và tên</p>
                        </template>
                        <UInput type="text" size="md" v-model="state.shipping_address.name" placeholder="Nhập họ và tên" />
                      </UFormGroup>

                      <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-0">
                        <UFormGroup class="input__custom" name="email">
                          <template #label>
                            <p class="custom__label sm:text-md text-[12px] sm:leading-6 leading-4 font-normal">Email</p>
                          </template>
                          <UInput type="text" size="md" v-model="state.shipping_address.email" placeholder="Nhập email" />
                        </UFormGroup>
                        <UFormGroup class="input__custom" name="phone">
                          <template #label>
                            <p class="custom__label sm:text-md text-[12px] sm:leading-6 leading-4 font-normal">Số điện thoại</p>
                          </template>
                          <UInput type="text" size="md" v-model="state.shipping_address.phone" placeholder="Nhập số điện thoại" />
                        </UFormGroup>
                      </div>

                      <!-- Information Address (đã chuyển selects thành inputs vì bỏ API) -->
                      <h2 class="sm:text-md text-sm leading-6 font-medium text-[#363636] uppercase">Địa chỉ của bạn</h2>
                      <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-0">
                        <UFormGroup class="input__custom" name="province">
                          <template #label>
                            <p class="custom__label sm:text-md text-[12px] sm:leading-6 leading-4 font-normal">Thành Phố, Tỉnh</p>
                          </template>
                          <UInput type="text" size="md" v-model="state.shipping_address.province" placeholder="Thành Phố, Tỉnh" />
                        </UFormGroup>
                        <UFormGroup class="input__custom" name="district">
                          <template #label>
                            <p class="custom__label sm:text-md text-[12px] sm:leading-6 leading-4 font-normal">Quận, huyện</p>
                          </template>
                          <UInput type="text" size="md" v-model="state.shipping_address.district" placeholder="Quận, Huyện" />
                        </UFormGroup>
                      </div>

                      <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-0">
                        <UFormGroup class="input__custom" name="ward">
                          <template #label>
                            <p class="custom__label sm:text-md text-[12px] sm:leading-6 leading-4 font-normal">Phường, xã</p>
                          </template>
                          <UInput type="text" size="md" v-model="state.shipping_address.ward" placeholder="Phường" />
                        </UFormGroup>
                        <UFormGroup class="input__custom" name="address">
                          <template #label>
                            <p class="custom__label sm:text-md text-[12px] sm:leading-6 leading-4 font-normal">Địa chỉ</p>
                          </template>
                          <UInput type="text" size="md" v-model="state.shipping_address.address" placeholder="Số nhà, Tên đường" />
                        </UFormGroup>
                      </div>

                      <h2 class="sm:text-md text-sm leading-6 font-medium text-[#363636] uppercase">Thông tin thêm</h2>
                      <UFormGroup class="input__custom" name="note">
                        <template #label>
                          <p class="custom__label sm:text-md text-[12px] sm:leading-6 leading-4 font-normal">Ghi chú</p>
                        </template>
                        <UTextarea type="text" size="md" v-model="state.shipping_address.note" placeholder="Nhập ghi chú" />
                      </UFormGroup>
                    </div>

                    <!-- Step 1 Done -->
                    <template v-if="steps[0].isCompleted && index === 0">
                      <div class="border-[#C8C8C8] border lg:w-[calc(75%_-_15px)] rounded-lg sm:p-[20px] p-[10px]">
                        <div class="sm:text-md text-sm sm:leading-6 leading-5 flex justify-between items-center">
                          <h3 class="capitalize font-bold text-[#363636]">{{ state.shipping_address.name }}</h3>
                          <p class="cursor-pointer font-normal underline text-[#888888] text-center" @click="goToStep(index)">Edit</p>
                        </div>
                        <div class="sm:text-lg text-md sm:leading-6 leading-5 text-[#C8C8C8] font-normal sm:mt-[10px] sm:mb-0 my-2">
                          <p class="text-start">
                            {{ state.shipping_address.address + ', ' + state.shipping_address.ward + ', ' + state.shipping_address.district + ', ' + state.shipping_address.province }}
                          </p>
                          <div class="grid sm:grid-cols-2 grid-cols-1 sm:gap-0 gap-2">
                            <div class="flex sm:justify-start items-center gap-1"><img src="/images/mail-icon.png" alt="Icon alt">{{ state.shipping_address.email }}</div>
                            <div class="flex sm:justify-end items-center gap-1"><img src="/images/call-icon.png" alt="Icon alt">{{ state.shipping_address.phone }}</div>
                          </div>
                        </div>
                      </div>
                    </template>
                    <!-- End Step 1 -->

                    <!-- Step 3 -->
                    <div v-if="currentStep === index && index === 1" class="radio-custom">
                      <URadioGroup v-model="selected" :options="options" class="input-radio-custom mb-2" name="payment_method_id">
                        <template #label="{ option }">
                          <div class="grid grid-cols-[1fr_40px] gap-2 items-center mb-2">
                            <p class="sm:text-lg text-md text-[#000000]">{{ option.label }}</p>
                            <img v-if="option.icon" class="max-w-[25px]" :src="option.icon" alt="Icon Payment Method" />
                          </div>
                        </template>
                      </URadioGroup>
                    </div>
                    <!-- End Step 3 -->

                    <!-- Button -->
                    <div v-if="currentStep === index" class="flex flex-wrap sm:flex-row flex-col-reverse gap-4">
                      <UButton
                        class="sm:min-w-[190px] min-w-full transition-all duration-300 ease-in-out px-6 py-3.5 text-md font-medium bg-secondary text-main rounded-lg hover:bg-secondary inline-flex justify-center items-center uppercase"
                        @click="previousStep()"
                      >
                        Huỷ
                      </UButton>
                      <UButton
                        type="submit"
                        class="sm:min-w-[190px] min-w-full transition-all duration-300 ease-in-out px-6 py-3.5 text-md font-medium !bg-main text-white rounded-lg hover:!bg-main justify-center uppercase"
                      >
                        {{ titleButtonSubmit }}
                      </UButton>
                    </div>
                  </UForm>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <!-- Right Content -->
        <CartAside :is-show-button="false" />
      </div>

      <div v-show="!(cartStore.listCart && cartStore.listCart.length > 0)" class="w-full flex flex-col sm:gap-6 gap-4 items-center justify-center">
        <h2 class="lg:col-span-2 col-span-1 text-2xl text-center font-extrabold leading-normal uppercase">Giỏ hàng của bạn đang rỗng</h2>
        <NuxtLink class="flex gap-2 justify-center items-center text-main bg-secondary button_0" to="/san-pham"> 
          <!-- <UIcon name="i-mdi-cart-outline" class="w-7 h-7 text-main" /> -->
          <span>Xem sản phảm</span>
        </NuxtLink>
      </div>
    </div>

    <ModelPaymentInformation
      ref="modelPaymentInformationRef"
      :block="props.block"
      :linkImageQr="linkImageQr"
      :information="information"
      :is-loading="isLoadingButton"
      @handle-submit="handleSubmit()"
    />
    <ModelPaymentSuccess ref="modelPaymentSuccessRef" />
  </section>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, reactive, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '~/stores/cart'
import type { FormError, FormErrorEvent, FormSubmitEvent } from '#ui/types'
import emailjs from 'emailjs-com'

const toast = useToast()

interface Props {
  dataBinding: any
  block: any
}
const props = defineProps<Props>()

const currentStep = ref<number>(0)
const steps = ref([
  { label: 'Thông tin thanh toán', isCompleted: false },
  { label: 'Thanh toán', isCompleted: false },
])
const titleButtonSubmit = computed<string>(() => {
  return currentStep.value === steps.value.length - 1 ? 'Thanh toán' : 'Lưu & tiếp tục'
})
const nextStep = () => {
  steps.value[currentStep.value].isCompleted = true
  while (currentStep.value < steps.value.length - 1 && steps.value[currentStep.value + 1].isCompleted) {
    currentStep.value++
  }
  if (currentStep.value < steps.value.length - 1) {
    currentStep.value++
  }
}
function previousStep() {
  if (currentStep.value > 0) {
    currentStep.value--
    steps.value[currentStep.value].isCompleted = false
  }
}
function goToStep(index: number) {
  currentStep.value = index
  steps.value[currentStep.value].isCompleted = false
}

const options = [
  { value: 1, label: 'Thanh toán khi nhận hàng (COD)', icon: '' },
  { value: 3, label: 'Thanh toán bằng mã QR Code / Tài khoản ngân hàng', icon: '' },
]
const selected = ref<number>(1)
const modelPaymentInformationRef = ref<any>()
const modelPaymentSuccessRef = ref<any>()
const formRef = ref<any>()

const cartStore = useCartStore()
const router = useRouter()

const totalPrice = computed<number>(() => cartStore.totalPrice)

const isLoadingSubmit: any = ref<boolean>(false)
const isLoadingButton: any = ref<boolean>(false)

const state = reactive({
  code: Math.floor(Math.random() * Date.now()).toString(16),
  office_id: 1,
  inventory_id: 1,
  shipping_address: {
    name: '',
    address: '',
    ward: '',
    district: '',
    province: '',
    phone: '',
    email: '',
    note: '',
  },
  carts: '',
  total_price: cartStore.totalPrice,
  payment_method_id: selected.value,
})

watch(
  () => selected.value,
  () => {
    state.payment_method_id = selected.value
  },
  { immediate: true }
)

function isValidPhone(phone: string) {
  const phonePattern = /^(\+?\d{1,4}[-\s]?)?(\(?\d{2,4}\)?[-\s]?)?\d{3,4}[-\s]?\d{3,4}$/
  return phonePattern.test(phone)
}
function isValidEmail(email: string) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/
  return emailPattern.test(email)
}
const validate = (state: any): FormError[] => {
  const errors = []
  if (!state.shipping_address.name) errors.push({ path: 'name', message: 'Họ và tên không được để trống' })
  if (!state.shipping_address.phone) {
    errors.push({ path: 'phone', message: 'Số điện thoại không được để trống' })
  } else {
    if (state.shipping_address.phone.length < 7 || !isValidPhone(state.shipping_address.phone)) {
      errors.push({ path: 'phone', message: 'Số điện thoại không hợp lệ' })
    }
  }
  if (!state.shipping_address.email) {
    errors.push({ path: 'email', message: 'Email không được để trống' })
  } else {
    if (!isValidEmail(state.shipping_address.email)) {
      errors.push({ path: 'email', message: 'Email không hợp lệ' })
    }
  }
  if (!state.shipping_address.address) errors.push({ path: 'address', message: 'Thông tin này không được để trống' })
  if (!state.shipping_address.ward) errors.push({ path: 'ward', message: 'Thông tin này không được để trống' })
  if (!state.shipping_address.district) errors.push({ path: 'district', message: 'Thông tin này không được để trống' })
  if (!state.shipping_address.province) errors.push({ path: 'province', message: 'Thông tin này không được để trống' })
  return errors
}

const information = ref<any>()
const linkImageQr = ref<any>()

// Khi submit form UI (lưu & tiếp tục hoặc tới bước thanh toán)
async function onSubmit(event: FormSubmitEvent<any>) {
  if (currentStep.value < steps.value.length - 1) {
    nextStep()
  } else {
    isLoadingSubmit.value = true
    // chuẩn hóa thông tin gửi email: data form + cart
    information.value = {
      ...event.data,
      carts: cartStore.listCart,
      total_price: cartStore.totalPrice,
      code: state.code,
      payment_method_id: selected.value,
    }

    // hiển thị modal thông tin thanh toán (nếu bạn vẫn muốn)
    linkImageQr.value = '/images/QR.jpg'
    // mở modal cho người dùng check (nếu component có)
    modelPaymentInformationRef.value?.showModal?.()
    isLoadingSubmit.value = false
  }
}

async function handleSubmit() {
  try {
    isLoadingButton.value = true

    // Gom data đơn hàng
    const orderData = {
      code: information.value?.code || state.code,
      name: information.value?.shipping_address?.name,
      email: information.value?.shipping_address?.email,
      phone: information.value?.shipping_address?.phone,
      address: `${information.value?.shipping_address?.address}, ${information.value?.shipping_address?.ward}, ${information.value?.shipping_address?.district}, ${information.value?.shipping_address?.province}`,
      note: information.value?.shipping_address?.note || '',
      total: cartStore.totalPrice,
      payment_method: selected.value === 1 ? 'COD' : 'QR/Bank transfer',
      carts: (information.value?.carts || cartStore.listCart)
        .map((it: any, idx: number) =>
          `${idx + 1}. ${it.name || it.title} - SL: ${it.quantity || 1} - Giá: ${it.unit_price || 0}`
        )
        .join('\n'),
    }

    // Gửi qua EmailJS
    await emailjs.send(
      'service_9s5hn69',        // lấy ở EmailJS
      'template_5w2bowf',       // lấy ở EmailJS
      {
        to_email: 'duyenle.843703@gmail.com', // biến trong template
        ...orderData,
      },
      'hpY7aoRnpxVJXIb6c'         // Public Key
    )

    // Hiển thị modal thành công & xoá giỏ
    modelPaymentInformationRef.value?.hideModal?.()
    modelPaymentSuccessRef.value?.showModal?.()
    cartStore.deleteCart()
    toast.add({ title: 'Đã gửi đơn hàng đến shop thành công!', color: 'success' })
    resetState()
  } catch (err) {
    console.error(err)
    toast.add({ title: 'Gửi email thất bại.', color: 'red' })
  } finally {
    isLoadingButton.value = false
  }
}

async function onError(event: FormErrorEvent) {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const resetState = () => {
  state.code = Math.floor(Math.random() * Date.now()).toString(16)
}

onBeforeMount(() => {
  cartStore.getListCart()
  state.carts = cartStore.listCart
})
</script>

<style lang="scss" scoped>
.ul__stepper {
  &__li__title {
    color: #dfdfdf;
    position: relative;
    &::after {
      position: absolute;
      content: '';
      width: 32px;
      height: 32px;
      border-radius: 100%;
      background-color: var(--color-white);
      border: 1px solid var(--color-white);
      left: -42px;
      top: -5px;
      outline: 1px solid #dfdfdf;
      outline-offset: -10px;
    }
  }
  &__li__title.active {
    color: var(--color-main);
    &::after {
      background-color: var(--color-main);
      outline-color: var(--color-main);
      border-width: 10px;
    }
  }
  &__li__title.done {
    &::after {
      background: url('/images/correct-icon.png') no-repeat center center #999999;
      outline-color: white;
      outline-offset: -8px;
      outline-width: 10px;
    }
  }
}
.input__custom {
  margin-bottom: 20px;
  .custom__label {
    position: relative;
    margin-bottom: -12px;
    z-index: 1;
    background: white;
    margin-left: 10px;
    padding: 0 5px;
  }
}
@media (max-width: 640px) {
  .input__custom {
    margin-bottom: 10px;
  }
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
