<template>
   <div class="min-h-screen flex flex-col wapper">
     <MainHeader />
     <main class="grow">
       <slot />
     </main>
     <MainFooter/>
   </div>
 </template>
 
 <script setup lang="ts">
 </script>
 
 <style scoped>
 
 </style>
 