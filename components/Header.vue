<template>
  <header
    :class="[
      'fixed top-0 left-0 z-50 w-full border-b transition-all duration-400',
      isHomePage
        ? isScrolled
          ? 'bg-[#0d0e0f]/95 backdrop-blur-md text-white border-white/10'
          : 'header-bg text-white border-white/15'
        : 'bg-white text-[#141415] border-gray-200',
    ]"
  >
    <nav class="flex items-center justify-between h-20 px-[20px] md:px-[32px] xl:px-[180px]">
      <div class="flex items-center space-x-3">
        <NuxtLink to="/">
          <img
            :src="
              isHomePage
                ? '/images/rccg-rpc-logo.svg'
                : '/images/rccg-rpc-b.svg'
            "
            alt="RPC Logo"
            class="h-10 transition-all duration-300"
          />
        </NuxtLink>
      </div>

      <div class="hidden md:flex items-stretch h-full">
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="linkClasses(link)"
        >
          {{ link.label }}
          <span v-if="isActive(link.to)" class="active-dot"></span>
        </NuxtLink>
      </div>

      <button
        @click="toggleMenu"
        class="flex items-center uppercase md:hidden p-3 rounded-[8px] transition duration-150 border-l header-bg"
      >
        <span class="leading-none">•: MENU</span>
      </button>
    </nav>

    <Transition name="mobile-menu">
      <div
        v-if="isMenuOpen"
        class="md:hidden flex flex-col space-y-4 px-6 py-6 border-t header-bg"
      >
        <NuxtLink
          v-for="link in links"
          :key="link.to"
          :to="link.to"
          :class="[
            'py-2 transition-opacity duration-150 hover:opacity-70',
            isActive(link.to) ? 'indivisible-semibold' : '',
          ]"
          @click="isMenuOpen = false"
        >
          {{ link.label }}
        </NuxtLink>
      </div>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const isMenuOpen = ref(false);
const isScrolled = ref(false);
const toggleMenu = () => (isMenuOpen.value = !isMenuOpen.value);

const isHomePage = computed(() => route.path === "/");

const handleScroll = () => {
  isScrolled.value = window.scrollY > 80;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});

const links = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/church" },
  { label: "Ministries", to: "/ministries" },
  { label: "Events", to: "/events" },
  { label: "Programs", to: "/programs" },
  { label: "Give", to: "/give" },
];

const isActive = (path: string) =>
  path === "/" ? route.path === "/" : route.path === path || route.path.startsWith(path + "/");

const linkClasses = (link: { label: string; to: string }) => {
  const base =
    "relative flex items-center px-[16px] lg:px-[28px] border-l transition-all duration-150 h-full text-[15px]";
  const border = isHomePage.value ? "border-white/15" : "border-gray-200";
  const hover = isHomePage.value ? "hover:bg-white/10" : "hover:bg-gray-50";
  const active = isActive(link.to) ? "indivisible-semibold" : "";
  return `${base} ${border} ${hover} ${active}`;
};
</script>

<style scoped>
.header-bg {
  background-color: rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(5px);
}

.active-dot {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: linear-gradient(
    74deg,
    rgba(0, 175, 239, 1),
    rgba(65, 181, 30, 1)
  );
}

.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.28s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
