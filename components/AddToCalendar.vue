<template>
  <div ref="root" class="relative inline-block">
    <button
      type="button"
      class="icon-btn"
      :aria-expanded="open"
      aria-haspopup="menu"
      :aria-label="label"
      @click="open = !open"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M16 3v4M8 3v4M3 10h18M12 14v4M10 16h4" />
      </svg>
    </button>
    <div v-if="showLabel" class="icon-caption">{{ label }}</div>

    <Transition name="pop">
      <div v-if="open" class="menu" :class="align === 'left' ? 'left-0' : 'right-0'" role="menu">
        <a :href="google" target="_blank" rel="noopener" class="menu-item" role="menuitem" @click="open = false">
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>
          Google calendar
        </a>
        <button type="button" class="menu-item" role="menuitem" @click="ics">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#111" aria-hidden="true"><path d="M16.4 12.6c0-2.5 2-3.7 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.3 1-4.2 2.5-1.8 3.1-.5 7.7 1.3 10.2.9 1.2 1.9 2.6 3.2 2.6 1.3-.1 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.3 3.1-2.5 1-1.4 1.4-2.8 1.4-2.9-.1 0-2.8-1-2.8-4.2zM13.9 5.2c.7-.8 1.2-2 1-3.2-1 0-2.3.7-3 1.5-.7.7-1.3 1.9-1.1 3.1 1.2.1 2.3-.6 3.1-1.4z"/></svg>
          Apple calendar
        </button>
        <a :href="outlook" target="_blank" rel="noopener" class="menu-item" role="menuitem" @click="open = false">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><rect x="2" y="4" width="12" height="16" rx="2" fill="#0A64D6"/><path d="M14 7h7a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1h-7z" fill="#28A8EA"/><ellipse cx="8" cy="12" rx="3" ry="3.6" fill="none" stroke="#fff" stroke-width="1.8"/></svg>
          Outlook calendar
        </a>
        <a :href="yahoo" target="_blank" rel="noopener" class="menu-item" role="menuitem" @click="open = false">
          <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true"><text x="3" y="19" font-family="Arial Black, Arial" font-weight="900" font-size="18" fill="#6001D2">Y!</text></svg>
          Yahoo calendar
        </a>
        <button type="button" class="menu-item" role="menuitem" @click="ics">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#555" aria-hidden="true"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>
          Other calendar (.ics)
        </button>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";
import {
  googleCalendarUrl,
  outlookCalendarUrl,
  yahooCalendarUrl,
  downloadIcs,
  type EventOccurrence,
} from "~/utils/eventHelpers";

const props = withDefaults(
  defineProps<{
    occurrence: EventOccurrence;
    label?: string;
    showLabel?: boolean;
    align?: "left" | "right";
  }>(),
  { label: "Add to calendar", showLabel: false, align: "right" }
);

const open = ref(false);
const root = ref<HTMLElement | null>(null);
const origin = ref("https://rccgrpc.ca");

const google = computed(() => googleCalendarUrl(props.occurrence, origin.value));
const outlook = computed(() => outlookCalendarUrl(props.occurrence, origin.value));
const yahoo = computed(() => yahooCalendarUrl(props.occurrence, origin.value));

const ics = () => {
  downloadIcs([props.occurrence], origin.value, props.occurrence.event.slug);
  open.value = false;
};

const onDoc = (e: MouseEvent) => {
  if (root.value && !root.value.contains(e.target as Node)) open.value = false;
};
const onKey = (e: KeyboardEvent) => {
  if (e.key === "Escape") open.value = false;
};
onMounted(() => {
  origin.value = window.location.origin;
  document.addEventListener("click", onDoc);
  document.addEventListener("keydown", onKey);
});
onUnmounted(() => {
  document.removeEventListener("click", onDoc);
  document.removeEventListener("keydown", onKey);
});
</script>

<style scoped>
.icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #f1f1f3;
  color: #1e1f21;
  transition: background 0.2s ease;
}
.icon-btn:hover {
  background: #e4e4e7;
}
.icon-caption {
  font-size: 13px;
  text-align: center;
  margin-top: 6px;
  color: #1e1f21;
}
.menu {
  position: absolute;
  top: 50px;
  z-index: 40;
  min-width: 230px;
  background: #fff;
  border-radius: 14px;
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.14);
  padding: 8px;
}
.menu-item {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  border-radius: 10px;
  font-size: 14px;
  color: #1e1f21;
  white-space: nowrap;
}
.menu-item:hover {
  background: #f3f3f5;
}
.pop-enter-active,
.pop-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}
.pop-enter-from,
.pop-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>
