<template>
  <header
    :class="[
      'fixed top-0 left-0 z-50 w-full border-b transition duration-300',
      isHomePage
        ? 'header-bg text-white border-[#797979]'
        : 'bg-white text-[#141415] border-[#797979]',
    ]"
  >
    <nav class="flex items-center justify-between h-20 px-[20px] md:px-[180px]">
      <div class="flex items-center space-x-3">
        <div v-if="isHomePage">
          <NuxtLink to="/">
            <img src="/images/rccg-rpc-logo.svg" alt="RPC Logo" />
          </NuxtLink>
        </div>
        <div v-else>
          <NuxtLink to="/">
            <img src="/images/rccg-rpc-b.svg" alt="RPC Logo" />
          </NuxtLink>
        </div>
      </div>

      <div class="hidden md:flex items-stretch h-full">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="linkClasses(link)"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
      <button
        @click="toggleMenu"
        class="flex items-center uppercase md:hidden p-3 rounded-[8px] transition duration-150 border-l header-bg"
      >
        <span class="leading-none"> •: MENU </span>
      </button>
    </nav>
    <div
      v-if="isMenuOpen"
      class="md:hidden flex flex-col space-y-4 px-6 py-6 border-t transition duration-200 header-bg"
    >
      <NuxtLink
        v-for="link in links"
        :key="link.to"
        :to="link.to"
        :class="[
          'py-2',
          link.label === 'Give'
            ? isHomePage
              ? 'bg-white text-gray-900 font-semibold px-4 rounded hover:bg-gray-200'
              : 'bg-[#41B51E] text-white font-semibold px-4 rounded hover:bg-gray-800'
            : 'hover:opacity-80',
        ]"
        @click="isMenuOpen = false"
      >
        {{ link.label }}
      </NuxtLink>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);

const isHomePage = computed(() => route.path === "/");

const links = [
  { label: "Home", to: "/" },
  { label: "Church", to: "/church" },
  { label: "Programs", to: "/programs" },
  { label: "Give", to: "/give" },
  // { label: "•: MENU", to: "/menu" },
];

const isActive = (path: string) => route.path === path;
const linkClasses = (link: { label: string; to: string }) => {
  const base =
    "flex items-center px-[31px] border-l transition duration-150 h-full";
  const border = isHomePage.value ? "border-[#797979]" : "border-gray-300";

  if (link.label === "Give") {
    return isHomePage.value
      ? `${base} ${border} bg-white text-[#1E1F21]`
      : `${base} ${border} bg-[#41B51E] text-white`;
  }

  const hover = isHomePage.value ? "hover:bg-gray-700/50" : "hover:bg-gray-100";

  const active = isActive(link.to) ? "indivisible-medium" : "";

  return `${base} ${border} ${hover} ${active}`;
};
</script>

<style scoped>
.header-bg {
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(4px);
}
</style>
