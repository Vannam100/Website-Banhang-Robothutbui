<template>
  <footer class="w-full border-t border-t-[#dbdbdb]" :style="{ backgroundColor: footerData.background_color }">
    <div class="container">
      <div class="flex flex-col sm:gap-[60px] gap-4 w-full lg:py-10 py-6">
        <div class="grid lg:grid-cols-[200px_3fr] grid-cols-1 lg:gap-8 gap-4">
          <div class="text-center">
            <NuxtLink to="/" class="inline-block">
              <!-- <span class="text-[60px] font-bold text-center">
                LOGO
              </span> -->
              <img :src="footerData.logo" :alt="footerData.logo_image_alt" class="sm:max-w-[250px] object-cover lg:mr-[-20px] sm:mr-[10px]"/>
            </NuxtLink>
          </div>
          <div class="grid md:grid-cols-3 grid-cols-1 sm:gap-[30px] gap-4">
            <div class="flex flex-col sm:gap-4 gap-2">
              <h4 class="uppercase lg:text-2xl text-xl font-medium md:leading-9 leading-7">{{ footerData.take_care.title }}</h4>
              <div class="flex flex-col gap-2">
                <div v-for="(item, key) in  footerData.take_care.list_text" :key="key" class="text-[16px] cursor-pointer font-light leading-[30px]">
                  <NuxtLink :to="item.link" >
                    {{ item.text }}
                  </NuxtLink>
                </div>
              </div>
            </div>
            <div class="flex flex-col sm:gap-4 gap-2">
              <h4 class="uppercase lg:text-2xl text-xl font-medium md:leading-9 leading-7">{{ footerData.setting.title }}</h4>
              <div class="flex flex-col gap-2">
                <p class="text-[16px] leading-[30px] font-light">{{ footerData.setting.text }}</p>
                <div class="flex gap-[20px]">
                  <div v-for="item in footerData.setting.list_image" class="cursor-pointer bg-[#fff] rounded-full p-[7px]">
                    <img :src="item" alt="Alt Image" class="w-[25px] h-[25px] object-cover drop-shadow"/>
                  </div>
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-[16px]">
              <h4 class="uppercase lg:text-2xl text-xl font-medium md:leading-9 leading-7">{{ footerData.contact.title }}</h4>
              <div class="flex flex-col gap-2">
                <div v-for="(item, key) in  footerData.contact.list_text" :key="key" class="sm:flex grid grid-cols-[100px_1fr] gap-2 sm:text-md text-sm sm:leading-6 leading-5 cursor-pointer font-light text-[#0E2443]">
                  <span class="whitespace-nowrap">{{ item.title }}:</span>
                  <a :href="`tel:${item.text}`" v-if="item.type === 'telephone'" class="underline">{{ item.text }}</a>
                  <a :href="`mailto:${item.text}`" v-else-if="item.type === 'email'">{{ item.text }}</a>
                  <span v-else>{{ item.text }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Bottom Footer -->
    <div class="lg:py-8 py-4 bg-[#0b0b0b] lg:text-4 text-sm lg:leading-6 leading-4 font-light text-center text-[#fff] border-t border-t-[#dbdbdb]">
      <div class="container">
        <div class="flex flex-col gap-2">
          <div v-html="footerData.text_coppyright">
          </div>
          <div v-html="footerData.email">
          </div>
        </div>
      </div>
    </div>
    <div
      :class="isShowButtonToTop ? 'visible opacity-100' : 'invisible opacity-0'"
      v-if="footerData.button_scroll_top.is_show"
      class="custom_button_to_top p-[7px] md:bottom-[30px] bottom-[30px] transition-all duration-300 ease-out"
      @click="scrollToTop()"
    >
      <!-- <div class="absolute -bottom-2.5 -left-2.5 opacity-50 rounded-full w-[calc(100%+20px)] h-[calc(100%+20px)] bg-[#FFE1E1] z-[-1]" /> -->
      <img
        src="/images/icon-to-top.png"
        style="filter: brightness(0) invert(1)"
        class="w-[30px] h-[30px] object-cover"
      />
    </div>
    <a
      :href="`tel:${footerData.button_call.text}`"
      class="custom_button_call bottom-[110px] devvn_animation_zoom"
    >
    <div
      class="overflow-hidden absolute bottom-[-4px] left-[-4.3px] opacity-70 rounded-full w-[calc(100%+10px)] h-[calc(100%+10px)] bg-main z-[-1] animate-pulse-scale"
    >    
    </div>
      <p>{{ footerData.button_call.text }}</p>
      <img
        src="/images/icon-phone.png"
        class="w-[45px] h-[45px] p-2 object-cover"
      />
  </a>
  </footer>
</template>

<script setup lang="ts">
import footer from '@/data/footer.json';
import LANGUAGES from '@/data/lang-setting.json';
const route = useRoute();
const langDefault: any = LANGUAGES.find((item) => {
  return item.isDefault
});
const footerData: any = ref(footer.en);

watch(() => route.path, () => {
  for (const key of Object.keys(footer)) {
    if (route.path.includes(key)) {
      footerData.value = (footer as any)[key];
      break;
    } else {
      footerData.value = (footer as any)[langDefault.value];
    }
  }
}, { deep: true, immediate: true });

const isShowButtonToTop = ref(false)

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

onMounted(() => {
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      isShowButtonToTop.value = true
    } else {
      isShowButtonToTop.value = false
    }
  })
})
</script>

<style lang="scss" scoped>
@keyframes pulse-scale {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.4;
  }
}

.animate-pulse-scale {
  animation: pulse-scale 2s infinite ease-in-out;
}


.custom_button_to_top{
  position: fixed;
  right: 30px;
  z-index: 11;
  border-radius: 100px;
  cursor: pointer;
  background-color: #000;
  opacity: 0.7;
  transition: all 0.4s;
  &:hover {
    opacity: 1;
  }
}
.custom_button_call{
  position: fixed;
  right: 30px;
  z-index: 11;
  border-radius: 100px;
  cursor: pointer;
  transition: all 0.4s;
  width: 45px;
  background-color: var(--color-main);
  p {
    opacity: 0;
    right: 0;
    visibility: hidden;
    position: absolute;
    line-height: 45px;
    padding-left: 15px;
    color: var(--color-white);
    overflow: hidden;
    transition: all 0.4s;
  }
  img {
    transition: all 0.4s;
    background: var(--color-main);
    border-radius: 100%;
  }
  &:hover {
    width: 160px;
    img {
      margin-left: 110px;
      opacity: 0.3;
    }
    p {
      opacity: 1;
      visibility: visible;
      right: 55px;
    }
  }
}
.devvn_animation_zoom {
  -webkit-animation: devvn_zoom 1.5s infinite linear;
  -moz-animation: devvn_zoom 1.5s infinite linear;
  -o-animation: devvn_zoom 1.5s infinite linear;
  animation: devvn_zoom 1.5s infinite linear;
}
a.devvn_animation_zoom img {
    -webkit-animation: calltrap_spin 2s infinite linear;
    -moz-animation: calltrap_spin 2s infinite linear;
    -o-animation: calltrap_spin 2s infinite linear;
    animation: calltrap_spin 2s infinite linear
}
@-webkit-keyframes devvn_zoom {
    70% {
        box-shadow: 0 0 0 15px transparent
    }
    100% {
        box-shadow: 0 0 0 0 transparent
    }
}
@keyframes devvn_zoom {
    70% {
        box-shadow: 0 0 0 15px transparent
    }
    100% {
        box-shadow: 0 0 0 0 transparent
    }
}
@-webkit-keyframes calltrap_spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    30% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    33% {
        -webkit-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    36% {
        -webkit-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    39% {
        -webkit-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    42% {
        -webkit-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    45% {
        -webkit-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    48% {
        -webkit-transform: rotate(10deg);
        transform: rotate(10deg);
        opacity: 1
    }
    51% {
        -webkit-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    54% {
        -webkit-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    57% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }
}
@-moz-keyframes calltrap_spin {
    0% {
        -moz-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    30% {
        -moz-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    33% {
        -moz-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    36% {
        -moz-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    39% {
        -moz-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    42% {
        -moz-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    45% {
        -moz-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    48% {
        -moz-transform: rotate(10deg);
        transform: rotate(10deg);
        opacity: 1
    }
    51% {
        -moz-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    54% {
        -moz-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    57% {
        -moz-transform: rotate(0deg);
        transform: rotate(0deg)
    }
}
@-o-keyframes calltrap_spin {
    0% {
        -o-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    30% {
        -o-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    33% {
        -o-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    36% {
        -o-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    39% {
        -o-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    42% {
        -o-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    45% {
        -o-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    48% {
        -o-transform: rotate(10deg);
        transform: rotate(10deg);
        opacity: 1
    }
    51% {
        -o-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    54% {
        -o-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    57% {
        -o-transform: rotate(0deg);
        transform: rotate(0deg)
    }
}
@keyframes calltrap_spin {
    0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    30% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg)
    }
    33% {
        -webkit-transform: rotate(-10deg);
        -moz-transform: rotate(-10deg);
        -o-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    36% {
        -webkit-transform: rotate(10deg);
        -moz-transform: rotate(10deg);
        -o-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    39% {
        -webkit-transform: rotate(-10deg);
        -moz-transform: rotate(-10deg);
        -o-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    42% {
        -webkit-transform: rotate(10deg);
        -moz-transform: rotate(10deg);
        -o-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    45% {
        -webkit-transform: rotate(-10deg);
        -moz-transform: rotate(-10deg);
        -o-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    48% {
        -webkit-transform: rotate(10deg);
        -moz-transform: rotate(10deg);
        -o-transform: rotate(10deg);
        transform: rotate(10deg);
        opacity: 1
    }
    51% {
        -webkit-transform: rotate(-10deg);
        -moz-transform: rotate(-10deg);
        -o-transform: rotate(-10deg);
        transform: rotate(-10deg)
    }
    54% {
        -webkit-transform: rotate(10deg);
        -moz-transform: rotate(10deg);
        -o-transform: rotate(10deg);
        transform: rotate(10deg)
    }
    57% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg)
    }
}

* {
  color: #fff !important;
}
</style>