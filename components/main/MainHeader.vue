<!-- eslint-disable vue/html-self-closing -->
<template>
  <header
    class="flex flex-col justify-center items-center w-full background_header pt-4"
    :class="isMenuOpen || checkMobileScroll ? 'custom_header' : classActive">
    <div class="container">
      <div
        class="relative flex justify-between items-center lg:gap-[30px]"
      >

        <!-- Logo -->
        <NuxtLink class="block" :to="`${homeUrl}`">
          <img
            :src="headerData.logo"
            :alt="headerData.logo_alt"
            class="w-full object-contain object-center h-auto lg:max-w-[300px] max-w-[190px]"
          />
          <!-- <span class="flex flex-col gap-2 justify-center items-center text-white text-[30px] font-bold">
            <span>ROBOTHUIBUI</span>
            <span>BADIEM</span>
          </span> -->
        </NuxtLink>

        <div class="lg:flex hidden flex-col justify-center items-center">
          <ul
            class="header__menu "
          >
            <li v-for="(item, index) in headerData.items_header" :key="index" class="header__menu-item">
              <NuxtLink
                :to="item.link" 
                :class="{ 'active-menu-item': isActivePage(item.link) }" 
                class="header__menu-item-link"
              >
                {{ item.text }}
              </NuxtLink>
              <ul v-if="(item.link.includes('/san-pham')) && listCategory && listCategory.length > 0" class="header__submenu">
                <li
                  v-for="(elm, index) in listCategory"
                  :key="index"
                  class="header__submenu-item"
                >
                  <NuxtLink
                    :to="`/san-pham?category=${elm.slug}`"
                    @click="scrollToCategory()"
                    :class="{ 'text-main': isActivePage(elm.slug) }"
                    >{{ elm.name }}
                  </NuxtLink>
                </li>
              </ul>
              <ul v-if="item.submenu && item.submenu.length > 0 && !item.link.includes('/san-pham')" class="header__submenu">
                <li
                  v-for="(elm, index) in item.submenu"
                  :key="index"
                  class="header__submenu-item"
                >
                  <NuxtLink
                    :to="elm.link"
                  >
                    {{ elm.text }}
                  </NuxtLink>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        <div class="lg:flex hidden justify-end items-center gap-2">
          <div
            class="lg:flex hidden item-search-cart"
            :class="{ expanded: isSearchExpanded }"
            @mouseleave="collapseSearch"
          >
            <div
              class="search-container flex items-center transition-all duration-300 ease-in-out"
              :class="{ expanded: isSearchExpanded }"
            >
              <input
                type="text"
                class="input-search"
                v-model="searchValue"
                @change="handleSearch"
                placeholder="Tìm kiếm..."
                @mouseover="expandSearch"
              />
              <button
                class="icon-search">
                <UIcon 
                  name="i-mdi-search" 
                  class="w-[30px] h-[30px]" 
                  @mouseover="expandSearch"
                />
              </button>
            </div>
  
            <NuxtLink
              to="/gio-hang"
              class="relative py-2 cursor-pointer header-icon-cart"
            >
              <div class="top-[-4px] absolute left-3 z-20">
                <p
                  class="flex h-2 w-2 items-center justify-center rounded-full bg-main p-2.5 text-xs text-white"
                >
                  {{ count }}
                </p>
              </div>
              <UIcon
                :class="
                  route.path === homeUrl 
                  ? 'text-white' 
                  : route.path.startsWith('/blog') || (route.path.startsWith('/chi-tiet-san-pham') || route.path.startsWith('/gio-hang') || route.path.startsWith('/thanh-toan') || route.path.startsWith('/blog')) 
                    ? 'text-main' 
                    : 'text-white'
                "
                name="i-mdi-cart"
                class="w-[30px] h-[30px] p-[4px]"
              />
            </NuxtLink>
          </div>

            <!-- <ul class="list-unstyled list-inline ct-topbar__list lg:block hidden pl-2">
              <li class="ct-language">
                <div class="w-8 h-8 flex flex-col justify-center items-center " >
                  <img :src="currentLangImg" alt="Current Language" />
                </div>
                <ul class="list-unstyled ct-language__dropdown">
                  <li>
                    <a
                      class="lang-select"
                      data-lang="vn"
                      @click.prevent="changeLanguage('vn')"
                      ><img src="/images/flag_vn.png" alt="Tiếng Việt" class="w-10 h-6" /></a
                    >
                  </li>
                  <li>
                    <a
                      class="lang-select"
                      data-lang="zh-CN"
                      @click.prevent="changeLanguage('zh-CN')"
                      ><img src="/images/flag_zh.png" alt="Tiếng Trung" class="w-10 h-6" /></a
                    >
                  </li>
                  <li>
                    <a
                      class="lang-select"
                      data-lang="en"
                      @click.prevent="changeLanguage('en')"
                      ><img src="/images/flag_en.png" alt="Tiếng Anh" class="w-10 h-6" /></a
                    >
                  </li>
                </ul>
              </li>
            </ul> -->
          <!-- Tạo phần tử cho Google Translate -->
          <!-- <div id="google_translate_element"></div>
          <div id="google_translate_element_mobile"></div> -->

        </div>

        <!-- Button Show Cart Mobile -->
        <NuxtLink
          to="/gio-hang"
          class="relative lg:hidden flex justify-center items-center h-[50px] w-[50px] cursor-pointer "
          :class="{ 'cart-shake': cartStore.isCartShaking }"
        >
          <div class="top-0 absolute right-0 z-20 flex h-2 w-2 items-center justify-center rounded-full bg-main p-2.5 text-xs text-white">
            {{ count }}
          </div>
          <UIcon
            name="i-mdi-cart"
            :class="[
              isMenuOpen || checkMobileScroll ? 'text-main' : 
              (route.path === homeUrl ? 'text-white' : 
              (route.path.startsWith('/chi-tiet-san-pham') || 
              route.path.startsWith('/gio-hang') || 
              route.path.startsWith('/thanh-toan') || 
              route.path.startsWith('/blog')) ? 'text-main' : 'text-white')
            ]"
            class="w-8 h-8"
          />

        </NuxtLink>

      <!-- Button toggle menu mobile -->
        <div 
          class="lg:hidden block icon-menu cursor-pointer"
          :class="isMenuOpen ? 'icon-menu-active icon-close' : (checkMobileScroll ? 'icon-menu-active' : '')"
          @click="toggleMenu"
        >
          <span />
        </div>
      </div>
    </div>
  </header>
  <ul
    class="lg:hidden flex flex-col open_menu-mobile"
    :class="
      isMenuOpen
        ? 'opacity-100 translate-x-0 w-full'
        : 'opacity-0 translate-x-[-100%]'
    "
  >
    <div class="flex items-center relative w-full px-4 border-b border-[#f1f1f1] py-2">
      <input
        type="text"
        class="outline-none w-full bg-white rounded-[4px] text-main py-2 pl-[35px] pr-4 border-[0.5px] border-main"
        v-model="searchValue"
        @change="handleSearch"
        placeholder="Tìm kiếm..."
        @mouseover="expandSearch"
      />
      <button
        class="cursor-pointer absolute left-[24px] mt-[2px]">
        <UIcon 
          name="i-mdi-search" 
          class="w-[24px] h-[24px] text-main" 
          @mouseover="expandSearch"
        />
      </button>
    </div>
    <li
      v-for="(item, index) in headerData.items_header"
      :key="index"
      class="open_menu-mobile-item"
    >
      <NuxtLink
        :to="item.link"
        class="open_menu-mobile-item-link flex justify-between items-center"
        :class="{ 'text-main': isActivePage(item.link) }"
        @click="toggleMenu"
      >
        <span class="py-2">{{ item.text }}</span>
      </NuxtLink>
      <span
        v-if="item.link === '/san-pham'"
        class="hover:text-main absolute right-0 top-0 py-2 px-4 border-l border-[#ccc] flex flex-col items-center justify-center"
        @click="toggleSubMenuMobile(item.link)"
      >
          <UIcon
            name="i-mdi-chevron-right"
            :class="item.link === subActive ? 'rotate-90' : 'rotate-0'"
            class="w-[30px] h-[30px] p-[4px] transition-all duration-300"
          />
      </span>
      <ul
        v-if="item.link === '/san-pham'"
        class="open_submenu-mobile"
        :class="item.link === subActive ? 'block' : 'hidden'"
      >
        <li
          v-for="(elm, index) in listCategory"
          :key="index"
          @click="toggleMenu"
        >
          <NuxtLink
            :to="`/san-pham?category=${elm.slug}`"
            :class="{ 'text-main': isActivePage(elm.slug) }"
            >{{ elm.name }}
          </NuxtLink>
        </li>
      </ul>
      <span
        v-if="!(item.link === '/san-pham') && item.submenu && item.submenu.length > 0"
        class="hover:text-main absolute right-0 top-0 py-2 px-4 border-l border-[#ccc] flex flex-col items-center justify-center"
        @click="toggleSubMenuMobile(item.link)"
      >
          <UIcon
            name="i-mdi-chevron-right"
            :class="item.link === subActive ? 'rotate-90' : 'rotate-0'"
            class="w-[30px] h-[30px] p-[4px] transition-all duration-300"
          />
      </span>
      <ul
        v-if="!(item.link === '/san-pham') && item.submenu && item.submenu.length > 0"
        class="open_submenu-mobile"
        :class="item.link === subActive ? 'block' : 'hidden'"
      >
        <li
          v-for="(elm, index) in item.submenu"
          :key="index"
          @click="toggleMenu"
        >
          <NuxtLink
            :to="elm.link"
          >
            {{ elm.text }}
          </NuxtLink>
        </li>
      </ul>
    </li>
    <!-- <ul class="list-unstyled list-inline ct-topbar__list lg:hidden p-4 flex flex-col justify-end items-end">
      <li class="ct-language">
        <div class="w-10 h-6 flex flex-col justify-center items-center " >
          <img :src="currentLangImg" alt="Current Language" class=" w-full h-full object-cover" />
        </div>
        <ul class="list-unstyled ct-language__dropdown">
          <li class="w-10 h-6 flex flex-col justify-center items-center ">
            <a
              class="lang-select"
              data-lang="vi"
              @click.prevent="changeLanguage('vi')"
              ><img src="/images/flag_vn.png" alt="Tiếng Việt" class="w-full h-full object-cover" /></a
            >
          </li>
          <li class="w-10 h-6 flex flex-col justify-center items-center ">
            <a
              class="lang-select"
              data-lang="zh-CN"
              @click.prevent="changeLanguage('zh-CN')"
              ><img src="/images/flag_zh.png" alt="Tiếng Trung" class="w-full h-full object-cover" /></a
            >
          </li>
          <li class="w-10 h-6 flex flex-col justify-center items-center">
            <a
              class="lang-select"
              data-lang="en"
              @click.prevent="changeLanguage('en')"
              ><img src="/images/flag_en.png" alt="Tiếng Anh" class=" w-full h-full object-cover" /></a
            >
          </li>
        </ul>
      </li>
    </ul> -->
  </ul>
</template>

<script setup lang="ts">
import header from '@/data/header.json';
import LANGUAGES from '@/data/lang-setting.json';
import { useCartStore } from '~/stores/cart';

const router = useRouter();
const route = useRoute();
const cartStore = useCartStore();
const listCategory = ref<any[]>([]);

// i18n
const countries = LANGUAGES.map((lang: any) => {
  return {
    name: lang.label,
    value: lang.value,
    enable: lang.isDefault
  };
});
const langDefault: any = countries.find((lang: any) => lang.enable);
const langCurrent = ref(langDefault.value);
const homeUrl = ref('/');
const headerData: any = ref(header.en);
function renderHeader() {
  for (const key of Object.keys(header)) {
    if (country.value.includes(key)) {
      langCurrent.value = key;
      headerData.value = (header as any)[key];
      break;
    } else {
      headerData.value = (header as any)[langDefault.value];
    }
  }
}
for (const key of Object.keys(header)) {
  if (route.path.includes(key)) {
    langCurrent.value = key;
    headerData.value = (header as any)[key];
    break;
  } else {
    headerData.value = (header as any)[langDefault.value];
  }
}
const country = ref(langCurrent.value);
watch(
  () => [country, langCurrent],
  () => {
    renderHeader();
    const params = route.query;

    if (country.value) {
      if (country.value === langDefault.value) {
        router.push({ path: '/', query: params });
        homeUrl.value = '/';
      } else {
        router.push({ path: `/${country.value}`, query: params });
        homeUrl.value = `/${country.value}`;
      }
    } else {
      homeUrl.value = '/';
      router.push({ path: '/' });
    }
  },
  { deep: true }
);
// end i18n

const isActivePage = (link: string) => {
  return route.path === link || route.path.startsWith(link + '/');
};
const classActive = ref<string>('')
watch(
  () => route.path,
  (value) => {
    classActive.value = "lg:absolute fixed header-home"
    if (value === '/') {
      classActive.value = 'lg:absolute fixed header-home'
    } else if (route.path.startsWith('/chi-tiet-san-pham') || route.path.startsWith('/gio-hang') || route.path.startsWith('/blog') || route.path.startsWith('/thanh-toan')) {
      classActive.value = 'bg-white header-page shadow'
    } else {
      classActive.value = 'lg:absolute fixed header-home'
    }
  },
  { immediate: true }
);

const isMenuOpen = ref(false);
const elementBody = ref<any>()
const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
  elementBody.value.classList.toggle("overflow-hidden")
};
// const openSubMenuMobile = ref(false);
const subActive = ref<string>('')
const toggleSubMenuMobile = (link:string) => {
  if(subActive.value === link) {
    subActive.value = ''
  } else {

    subActive.value = link
  }
};

// Products
const count = computed<number>(() => {
  return cartStore.countQuantity;
});

const isSearchExpanded = ref(false);
const scrollToCategory = () => {
  window.scrollTo({
    top: 800,
    behavior: 'smooth'
  })
}

function expandSearch() {
  isSearchExpanded.value = true;
}

function collapseSearch() {
  isSearchExpanded.value = false;
}

const searchValue = ref('');

const handleSearch = () => {
  router.push({ 
    path: '/san-pham', 
    query: { keyword: searchValue.value } 
  });
  window.scrollTo({
    top: 800,
    behavior: 'smooth'
  });
};


const currentLang = ref('vi');
const currentLangImg = ref('/images/flag_vn.png');
const changeLanguage = (lang: string) => {
  currentLang.value = lang;
  switch (lang) {
    case 'zh-CN':
      currentLangImg.value = '/images/flag_zh.png';
      break;
    case 'en':
      currentLangImg.value = '/images/flag_en.png';
      break;
    default:
      currentLangImg.value = '/images/flag_vn.png';
      break;
  }

  const translateCombo = document.querySelector('.goog-te-combo') as HTMLSelectElement;
  if (translateCombo) {
    translateCombo.value = lang;
    const event = new Event('change');
    translateCombo.dispatchEvent(event);
  } else {
    console.error('Google Translate combo box not found.');
  }
};
const addGoogleTranslateScript = () => {
  if (!document.querySelector('script[src*="translate.google.com"]')) {
    const script = document.createElement('script');
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.body.appendChild(script);
  }
};

const googleTranslateElementInit = () => {
  const isMobile = window.innerWidth < 1024; 
  const options = {
    pageLanguage: 'auto',
    autoDisplay: false,
    includedLanguages: 'zh-CN,en,vi',
    layout: window.google.translate.TranslateElement.InlineLayout.VERTICAL
  };
  if (isMobile) {
    new window.google.translate.TranslateElement(options, 'google_translate_element_mobile');
  } else {
    new window.google.translate.TranslateElement(options, 'google_translate_element');
  }
};


const checkMobileScroll = ref(false);
const checkScreenSize = () => {
  return window.innerWidth < 768;
};
onMounted(() => {
  window.googleTranslateElementInit = googleTranslateElementInit;
  addGoogleTranslateScript();
  elementBody.value = document.querySelector('body');
  const handleScroll = () => {
    checkMobileScroll.value = window.scrollY > 30;
  };
  const handleResize = () => {
    if (checkScreenSize()) {
      window.addEventListener('scroll', handleScroll);
    } else {
      window.removeEventListener('scroll', handleScroll);
      checkMobileScroll.value = false; 
    }
  };

  handleResize();

  window.addEventListener('resize', handleResize);

  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    window.removeEventListener('scroll', handleScroll);
  });
});
</script>

<style lang="scss" scoped>
#google_translate_element {
  display: none;
}
#google_translate_element_mobile {
  display: none;
}
.ct-language__dropdown{
	max-height: 200px;
	overflow: hidden;
	position: absolute;
	top: 105%;
  left: -5px;
  transition: all 0.2s;
	text-align: center;
  visibility: hidden;
  opacity: 0;
  visibility: hidden;
}
.ct-language{
	position: relative;
  cursor: pointer;
  color: #000;
  // img {
  //   border-radius: 3px;
  // }
}
.ct-language:hover .ct-language__dropdown{
  visibility: visible;
  opacity: 1;
	max-height: 200px;
	padding: 5px;  
  background: #fff;
  border-radius: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  margin-right: -10px;
}

@keyframes shake {
  0%,
  100% {
    transform: translateX(0);
  }
  10%,
  30%,
  50%,
  70%,
  90% {
    transform: translateX(-3px);
  }
  20%,
  40%,
  60%,
  80% {
    transform: translateX(3px);
  }
}

.cart-shake {
  animation: shake 0.8s ease-in-out;
}
.header-home {
  z-index: 11;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  .header__menu {
    height: 52px;
    border-radius: 100px;
    position: relative;
    // background: #ffffff33;
    // backdrop-filter: blur(50px);
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 5px 8px;
    .header__menu-item {
      .active-menu-item {
        color: var(--color-main) !important;
      }
      .header__menu-item-link {
        transition: all 0.3s ease-in-out;
        white-space: nowrap;
        font-weight: normal;
        font-size: 14px;
        padding: 10px 15px;
        border-radius: 100px;
        text-transform: uppercase;
        color: var(--color-white);
      }
      &:hover {
        .header__menu-item-link {
          color: var(--color-main);
        }
        .header__submenu {
          opacity: 1;
          visibility: visible;
        }
      }
    }
    .header__submenu {
      position: absolute;
      top: 50px;
      margin-left: 0px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 99;
      background: #ffffff33;
      backdrop-filter: blur(50px);
      border-radius: 0px;
      opacity: 0;
      visibility: hidden;
      transition: all .3s;
      padding: 7px;
      &::before {
        content: '';
        position: absolute;
        height: 100%;
        margin-top: -50px;
        z-index: -1;
        background: none;
        left: 0;
        right: 0;
      }
      .header__submenu-item {
        transition: all 0.2s;
        width: 100%;
        font-size: 16px;
        color: var(--color-white);
        padding: 10px;
        white-space: nowrap;
        text-transform: uppercase;
        border-radius: 0px;
        cursor: pointer;
        text-align: center;
        &:hover {
          color: var(--color-white);
          background-color: var(--color-main);
        }
      }
    }
  }

  .item-search-cart {
    align-items: center;
    justify-content: center;
    gap: 5px;
    background: #ffffff33;
    backdrop-filter: blur(50px);
    border-radius: 100px;
    padding: 5px 10px;
    position: relative;
    height: 52px;
    width: 100px;
    &::before {
      content: "";
      position: absolute;
      height: 100%;
      z-index: -1;
      background: #FFFFFF33;
      border-radius: 100px;
      backdrop-filter: blur(50px);
      transition: all 0.4s;
      right: 0;
      width: 0;
      opacity: 0;
      visibility: hidden;
    }
    &.expanded {
      background-color: transparent;
      padding-right: 0;
      &::before {
        opacity: 1;
        visibility: visible;
        width: 280px;
        height: 52px;
      }
      &.expanded .header-icon-cart {
        margin-right: -20px;
      }
    }
  }

  .search-container {
    display: flex;
    align-items: center;
    position: relative;
    .input-search {
      border-radius: 100px;
      color: var(--color-main);
      background: var(--color-white);
      height: 100%;
      padding: 0px;
      width: 0;
      opacity: 0;
      visibility: hidden;
      outline: none;
      position: absolute;
      right: 0;
      transition: all 0.4s;
      z-index: 11;
      padding: 0;
    }
    .icon-search {
      cursor: pointer;
      position: relative;
      z-index: 2;
      margin-top: 5px;
      &::before {
        content: '';
        position: absolute;
        height: 100%;
        z-index: -1;
        background: none;
        padding: 0;
        left: 0;
        right: 0;
        transition: all 0.4s;
      }
      span {
        transition: all 0.4s;
        color: var(--color-white);
      }
    }

    &.expanded .input-search {
      width: 220px;
      opacity: 1;
      visibility: visible;
      padding: 20px;
      color: var(--color-main);
    }
    &.expanded .icon-search {
      position: absolute;
      z-index: 11;
      right: 0;
      span {
        color: var(--color-main);
      }
    }
  }
}

.icon-menu {
  position: relative;
  width: 35px;
  height: 25px;
  cursor: pointer;
  &::before {
    content: '';
    transition: all cubic-bezier(0.62, 0.28, 0.23, 0.99) 0.7s;
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: var(--color-white);
    bottom: 0px;
    left: 0px;
  }
  &::after {
    content: '';
    transition: all cubic-bezier(0.62, 0.28, 0.23, 0.99) 0.7s;
    position: absolute;
    top: 0px;
    right: 0px;
    height: 2px;
    width: 100%;
    background-color: var(--color-white);
  }
  span {
    position: absolute;
    height: 2px;
    width: 100%;
    background-color: var(--color-white);
    bottom: 0px;
    top:0px;
    margin: auto;
    opacity: 1;
    transition: all 0.2s ease-in-out;
  }
}
.icon-close {
  &::after {
    transform: translateY(10.5px) rotate(45deg);
  }
  &::before {
    transform: translateY(-12.5px) rotate(-45deg);
  }
  span {
    opacity: 0;
  }
}

.open_menu-mobile {
  width: 100%;
  position: fixed;
  z-index: 11;
  transition: all 0.3s ease-in-out;
  box-shadow: 1px 2px 4px rgba(0, 0, 0, 0.3);
  max-width: 100%;
  top: 65px !important;
  bottom: 0;
  background: #fff;
  left: 0;
  color: #000;
  overflow: auto;
  .open_menu-mobile-item {
    position: relative;
    border-bottom: 1px solid #f1f1f1;
    float: none !important;
    display: block;
    margin: 0;
    padding: 0;
    .open_menu-mobile-item-link {
      text-decoration: none;
      position: relative;
      font-weight: 500;
      font-size: 16px;
      color: #000;
      line-height: 30px;
      padding-left: 20px;
      padding-right: 5px;
      text-transform: uppercase;
      &:hover {
        color: var(--color-main);
        background: var(--color-secondary);
      }
    }
  }

  .open_submenu-mobile {
    transition: all 0.4s ease-in-out;
    position: relative !important;
    margin: 0 !important;
    padding: 0 !important;
    left: auto !important;
    width: auto !important;
    border-top: 1px solid #f1f1f1;
    li {
      display: block;
      transition: all 0.2s ease-in-out;
      font-weight: 500;
      font-size: 16px;
      color: #000;
      line-height: 26px;
      padding-top: 8px;
      padding-bottom: 8px;
      padding-right: 5px;
      padding-left: 45px;
      border-bottom: 1px solid #f1f1f1;
      &:hover {
        color: var(--color-main);
        background: var(--color-secondary);
      }
    }
  }
}

.header-page {
  width: 100%;
  height: 100px;
  z-index: 11;
  top: 0;
  left: 0;
  transition: all 0.3s ease-in-out;
  .header__menu {
    height: 52px;
    border-radius: 100px;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 15px;
    padding: 5px 8px;
    .header__menu-item {
      .active-menu-item {
        color: #000 !important;      }
      .header__menu-item-link {
        color: var(--color-main);
        transition: all 0.2s ease-in-out;
        white-space: nowrap;
        font-weight: normal;
        font-size: 14px;
        padding: 10px 15px;
        border-radius: 100px;
        text-transform: uppercase;
      }
      &:hover {
        .header__menu-item-link {
          color: #000 !important;
        }
        .header__submenu {
          opacity: 1;
          visibility: visible;
        }
      }
    }
    .header__submenu {
      position: absolute;
      top: 50px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      z-index: 99;
      // background-color: var(--color-secondary) !important;
      backdrop-filter: blur(50px);
      border-radius: 0px;
      opacity: 0;
      visibility: hidden;
      padding: 7px;
      &::before {
        content: '';
        position: absolute;
        height: 100%;
        margin-top: -50px;
        z-index: -1;
        background: none;
        left: 0;
        right: 0;
      }
      .header__submenu-item {
        transition: all 0.2s;
        width: 100%;
        font-size: 16px;
        color: var(--color-main);
        padding: 10px;
        white-space: nowrap;
        text-transform: uppercase;
        border-radius: 0px;
        cursor: pointer;
        text-align: center;
        &:hover {
          color: var(--color-white);
          // background-color: var(--color-main);
        }
      }
    }
  }
  .item-search-cart {
    background-color: var(--color-secondary) !important;
    align-items: center;
    justify-content: center;
    gap: 5px;
    backdrop-filter: blur(50px);
    border-radius: 100px;
    padding: 5px 10px;
    position: relative;
    height: 52px;
    width: 100px;
    &::before {
      content: '';
      background-color: var(--color-secondary) !important;
      position: absolute;
      height: 100%;
      z-index: -1;
      border-radius: 100px;
      backdrop-filter: blur(50px);
      transition: all 0.4s;
      right: 0;
    }
    &.expanded .header-icon-cart {
      margin-right: -20px;
    }
    &.expanded {
      background-color: transparent;
      padding-right: 0;
      &::before {
        width: 280px;
        height: 52px;
      }
    }
  }
  .search-container {
    display: flex;
    align-items: center;
    position: relative;
    .input-search {
      color: var(--color-main) !important;
      background: var(--color-white) !important;
      border-radius: 100px;
      width: 0;
      height: 100%;
      width: 0;
      opacity: 0;
      outline: none;
      position: absolute;
      right: 0;
      transition: all 0.4s;
      z-index: 11;
    }

    .icon-search {
      cursor: pointer;
      position: relative;
      z-index: 2;
      &::before {
        content: '';
        position: absolute;
        height: 100%;
        z-index: -1;
        background: none;
        left: 0;
        right: 0;
      }
      span {
        color: var(--color-main) !important;
      }
    }

    &.expanded .input-search {
      width: 220px;
      opacity: 1;
      padding: 20px;
      color: var(--color-main) !important;
    }
    &.expanded .icon-search {
      position: absolute;
      z-index: 11;
      right: 0;
      span {
        color: var(--color-main) !important;
      }
    }
  }

  .icon-menu {
    &::before,
    &::after,
    span {
      background-color: var(--color-main);
    }
  }
}

@media (max-width: 1024px) { 
  .background_header {
    height: auto;
    background: rgb(255 255 255 / 20%);
    transition: all 0.3s;
  }
  .custom_header{
    background-color: var(--color-white) !important;
    position: fixed;
    height: auto;
    top: 0;
    z-index: 11 !important;
  }
}
.icon-menu-active {
  &::before {
    background-color: var(--color-main);
  }
  &::after {
    background-color: var(--color-main);
  }
  span {
    background-color: var(--color-main);
  }
}

</style>



