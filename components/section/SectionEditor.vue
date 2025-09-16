<template>
  <section
    v-if="block.status"
    :data-cms-bind="dataBinding"
    class="md:py-[50px] py-[25px]"
    :style="{backgroundColor:block.background}"
  >
    <div class="container">
      <!-- eslint-disable -->
      <div v-html="block.content" />
      <!-- eslint-enable -->
    </div>
  </section>
</template>

<script lang="ts" setup>
interface Props {
  dataBinding: any;
  block: any;
}

defineProps<Props>();
</script>
