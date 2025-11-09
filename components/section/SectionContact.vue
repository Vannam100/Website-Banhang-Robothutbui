<template>
  <section
    v-if="block?.status"
    :data-cms-bind="dataBinding"
    class="mt-28"
    :style="{ backgroundColor: block.background_color || '#ffffff' }"
  >
    <div class="min-h-screen bg-white">
      <!-- Hero Section -->
      <div class="bg-white py-16">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p
            class="text-base text-main font-bold uppercase tracking-wider mb-4"
          >
            {{ block?.sub_title || "GET IN TOUCH" }}
          </p>
          <h1 class="sm:text-6xl text-4xl font-bold text-black mb-16">
            {{ block?.title || "Contact Us" }}
          </h1>

          <!-- Contact Cards -->
          <div
            v-if="block?.contact_cards && block.contact_cards.length"
            class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto mb-20"
          >
            <div
              v-for="(card, index) in block.contact_cards"
              :key="index"
              :class="[
                'group rounded-2xl px-8 py-16 text-white text-left transition-all duration-500 hover:bg-main hover:-translate-y-3 transform',
                index === 2 ? 'bg-main' : 'bg-black',
              ]"
            >
              <div
                class="w-16 h-16 rounded-full flex items-center justify-start mb-6"
              >
                <img
                  v-if="card.image"
                  :src="card.image"
                  :alt="card.image_alt"
                  class="w-16 h-16 object-cover transition-all duration-300 filter brightness-0 invert"
                />
              </div>
              <div class="text-content">
                <div
                  class="text-xl text-white ckeditor-custom"
                  v-html="card.content"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>

  </section>
</template>

<script setup lang="ts">

// Define props
const props = defineProps<{
  block?: any;
  dataBinding?: any;
}>();

</script>

<style>
.contact-button {
  min-width: 180px;
  height: 48px;
  border-radius: 24px;
  background-color: transparent;
  position: relative;
}

.circle {
  transition: transform 0.4s ease-in-out;
}

.contact-button:hover .circle {
  transform: translateX(calc(100% + 50px)) translateY(-50%);
}

.button-text {
  position: relative;
  z-index: 10;
}

/* CKEditor Custom Styles */
.ckeditor-custom {
  line-height: 1.6;
}

.ckeditor-custom p {
  margin-bottom: 1rem;
}

.ckeditor-custom p:last-child {
  margin-bottom: 0;
}

.ckeditor-custom strong {
  font-weight: 600;
  color: #1f2937;
}

.ckeditor-custom em {
  font-style: italic;
  color: #c44953;
}

.ckeditor-custom br {
  line-height: 0.5;
}
</style>
