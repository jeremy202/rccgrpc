<template>
  <div ref="root" class="relative inline-block">
    <button
      type="button"
      class="icon-btn"
      :aria-expanded="open"
      aria-haspopup="menu"
      aria-label="Share"
      @click="share"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
        <path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4" />
      </svg>
    </button>
    <div v-if="showLabel" class="icon-caption">Share</div>

    <Transition name="pop">
      <div v-if="open" class="menu" :class="align === 'left' ? 'left-0' : 'right-0'" role="menu">
        <button type="button" class="menu-item" role="menuitem" @click="copy">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e1f21" stroke-width="1.8" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>
          {{ copied ? "Link copied!" : "Copy link" }}
        </button>
        <a :href="facebook" target="_blank" rel="noopener" class="menu-item" role="menuitem" @click="open = false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#1877F2" aria-hidden="true"><path d="M24 12a12 12 0 1 0-13.9 11.9v-8.4h-3V12h3V9.4c0-3 1.8-4.7 4.5-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9V12h3.4l-.5 3.5h-2.9v8.4A12 12 0 0 0 24 12z"/></svg>
          Facebook
        </a>
        <a :href="whatsapp" target="_blank" rel="noopener" class="menu-item" role="menuitem" @click="open = false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.8 14.2c-.2.7-1.4 1.3-2 1.4-.5.1-1.2.1-1.9-.1-.4-.1-1-.3-1.7-.6-3-1.3-4.9-4.3-5.1-4.5-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.3.5-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.6 2 1.1 1 2 1.3 2.3 1.4.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.6-.1l1.9.9c.3.1.5.2.5.3.1.2.1.7-.1 1.4z"/></svg>
          WhatsApp
        </a>
        <a :href="xUrl" target="_blank" rel="noopener" class="menu-item" role="menuitem" @click="open = false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#000" aria-hidden="true"><path d="M17.8 2h3.3l-7.2 8.3L22.4 22h-6.6l-5.2-6.8L4.6 22H1.3l7.7-8.8L.9 2h6.8l4.7 6.2zm-1.2 18h1.8L6.5 3.9H4.5z"/></svg>
          X (Twitter)
        </a>
        <a :href="email" class="menu-item" role="menuitem" @click="open = false">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#1e1f21" stroke-width="1.8" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
          Email
        </a>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from "vue";

const props = withDefaults(
  defineProps<{
    title: string;
    text?: string;
    /** path like /events/foo — origin is added automatically */
    path?: string;
    showLabel?: boolean;
    align?: "left" | "right";
  }>(),
  { text: "", path: "", showLabel: false, align: "right" }
);

const open = ref(false);
const copied = ref(false);
const root = ref<HTMLElement | null>(null);
const origin = ref("https://rccgrpc.ca");

const url = computed(() => origin.value + (props.path || ""));
const enc = encodeURIComponent;
const facebook = computed(() => `https://www.facebook.com/sharer/sharer.php?u=${enc(url.value)}`);
const whatsapp = computed(() => `https://wa.me/?text=${enc(`${props.title} ${url.value}`)}`);
const xUrl = computed(() => `https://twitter.com/intent/tweet?text=${enc(props.title)}&url=${enc(url.value)}`);
const email = computed(
  () => `mailto:?subject=${enc(props.title)}&body=${enc(`${props.text ? props.text + "\n\n" : ""}${url.value}`)}`
);

const share = async () => {
  // Phones get the native share sheet; desktops get our menu.
  const nav = navigator as Navigator & { share?: (d: ShareData) => Promise<void> };
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  if (nav.share && isTouch) {
    try {
      await nav.share({ title: props.title, text: props.text, url: url.value });
      return;
    } catch {
      /* user cancelled — fall through to menu */
      return;
    }
  }
  open.value = !open.value;
};

const copy = async () => {
  try {
    await navigator.clipboard.writeText(url.value);
  } catch {
    const t = document.createElement("textarea");
    t.value = url.value;
    document.body.appendChild(t);
    t.select();
    document.execCommand("copy");
    t.remove();
  }
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
    open.value = false;
  }, 1400);
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
  min-width: 200px;
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
