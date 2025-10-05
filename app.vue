<template>
  <div>
    <NuxtLayout class="layouts">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();
router.afterEach(() => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
