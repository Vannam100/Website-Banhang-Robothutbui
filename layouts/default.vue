<template>
  <div class="min-h-screen flex-col flex">
    <MainHeader />
    <main class="grow">
      <slot />
    </main>
    <MainFooter />
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
section {
  display: flex;
  justify-content: center;
}
</style>
