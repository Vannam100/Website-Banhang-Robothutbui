<template>
  <article class="group relative overflow-hidden rounded-lg">
    <div class="aspect-[4/4] relative">
      <img
        v-if="image"
        :src="image"
        :alt="title"
        class="w-full h-full object-cover transition-all duration-500 transform group-hover:grayscale grayscale-0 group-hover:scale-95"
      />

      <div
        class="absolute inset-0 bg-black opacity-40 transition-opacity duration-500 group-hover:opacity-0"
      ></div>

      <!-- Content -->
      <div
        class="absolute inset-0 flex flex-col justify-end mb-20 items-center p-6 text-white"
      >
        <p class="text-main text-sm uppercase tracking-wider mb-2 font-bold">
          {{ category }}
        </p>
        <h3 class="text-3xl font-bold leading-tight">
          {{ title }}
        </h3>
        <button
          @click="url && $router.push(url)"
          :target="open_new_tab ? '_blank' : '_self'"
        >
          <svg
            class="w-12 h-12 cursor-pointer transition-colors duration-300 fill-current text-black group-hover:text-white hidden group-hover:block"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M18.25 15.5a.75.75 0 00.75-.75v-9a.75.75 0 00-.75-.75h-9a.75.75 0 000 1.5h7.19L6.22 16.72a.75.75 0 101.06 1.06L17.5 7.56v7.19c0 .414.336.75.75.75z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
  </article>
</template>

<script setup lang="ts">
interface Props {
  image: string;
  title: string;
  category: string;
  excerpt?: string;
  date?: string;
  url?: string;
  open_new_tab?: boolean;
  showReadMore?: boolean;
  readMoreText?: string;
}

defineProps<Props>();
</script>

<style scoped>
/* Additional hover effects */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

.group:hover .group-hover\:bg-opacity-50 {
  background-opacity: 0.5;
}

.group:hover .group-hover\:opacity-100 {
  opacity: 1;
}
</style>
