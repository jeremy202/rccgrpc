<template>
  <div>
    <NuxtLayout class="layouts">
      <Transition name="fade" mode="out-in">
        <NuxtPage />
      </Transition>
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
