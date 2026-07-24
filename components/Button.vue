<template>
  <NuxtLink :to="to" class="app-btn" :style="buttonStyle">
    <span>{{ label }}</span>
    <img v-if="iconImage" :src="iconImage" alt="icon" class="icon-img" />
    <span v-else-if="icon" class="icon"></span>
  </NuxtLink>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  to: { type: String, default: "#" },
  label: { type: String, required: true },
  bg: { type: String, default: "linear-gradient(to right, #22d3ee, #3b82f6)" },
  textColor: { type: String, default: "#ffffff" },
  border: { type: String, default: "none" },
  icon: { type: Boolean, default: false },
  iconImage: { type: String, default: "" },
});

const buttonStyle = computed(() => ({
  background: props.bg,
  color: props.textColor,
  border: props.border,
}));
</script>

<style scoped>
.app-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 14px 28px;
  border-radius: 9999px;
  text-decoration: none;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  box-shadow: 0 4px 18px rgba(0, 0, 0, 0.16);
  cursor: pointer;
  font-family: "indivisible", sans-serif;
  font-weight: 500;
  font-style: normal;
  position: relative;
  overflow: hidden;
  white-space: nowrap;
}

.app-btn::after {
  content: '';
  position: absolute;
  top: -50%;
  left: -75%;
  width: 50%;
  height: 200%;
  background: rgba(255, 255, 255, 0.18);
  transform: skewX(-20deg);
  transition: left 0.5s ease;
  pointer-events: none;
}

.app-btn:hover::after {
  left: 130%;
}

.app-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(0, 0, 0, 0.22);
}

.app-btn:active {
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.16);
}
</style>
