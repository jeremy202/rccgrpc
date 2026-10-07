<template>
  <div v-if="ev" class="detail section-padding-x pt-[130px] md:pt-[150px] pb-24 md:pb-32">
    <NuxtLink to="/events" class="back small-paragraph">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>
      All events
    </NuxtLink>

    <div class="max-w-[900px] mx-auto">
      <div class="hero-img mt-6">
        <img :src="ev.image" :alt="ev.title" />
      </div>

      <div class="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mt-8">
        <div class="flex-1 min-w-0">
          <h3 class="text-[#141415] leading-tight">{{ ev.title }}</h3>
          <p v-if="ev.subtitle" class="mt-2 text-[18px] text-[#555]">{{ ev.subtitle }}</p>

          <div class="flex flex-wrap items-center gap-x-6 gap-y-2 mt-4 text-[#555]">
            <span class="inline-flex items-center gap-2">
              <img src="/images/ic-date.svg" alt="" class="h-4 opacity-70" />
              <ClientOnly>
                <span>{{ occ ? formatLongDate(occ.date) : "" }}</span>
                <template #fallback><span>{{ repeatLabel(ev) || "" }}</span></template>
              </ClientOnly>
            </span>
            <span class="inline-flex items-center gap-2">
              <img src="/images/ic-time.svg" alt="" class="h-4 opacity-70" />
              {{ formatTime(ev.start) }} - {{ formatTime(ev.end) }}
            </span>
            <span v-if="ev.repeat" class="repeat-pill">{{ repeatLabel(ev) }}</span>
          </div>
        </div>

        <div class="flex items-start gap-4 shrink-0">
          <ClientOnly>
            <AddToCalendar v-if="occ" :occurrence="occ" show-label />
          </ClientOnly>
          <ShareButton
            :title="ev.title"
            :text="ev.subtitle || ''"
            :path="`/events/${ev.slug}`"
            show-label
          />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <div class="md:col-span-2 desc">
          <p v-for="(para, i) in paragraphs" :key="i" class="mb-4 leading-[1.7]">{{ para }}</p>
        </div>
        <aside class="info-card">
          <div class="meta-label">LOCATION</div>
          <a
            v-if="ev.locationUrl"
            :href="ev.locationUrl"
            target="_blank"
            rel="noopener"
            class="mt-1 block underline-offset-2 hover:underline"
          >{{ ev.location }}</a>
          <div v-else class="mt-1">{{ ev.location }}</div>

          <div class="meta-label mt-5">WHEN</div>
          <ClientOnly>
            <div class="mt-1">{{ occ ? formatFullDate(occ.date) : "" }}</div>
          </ClientOnly>
          <div>{{ formatTime(ev.start) }} - {{ formatTime(ev.end) }}</div>
          <div v-if="ev.repeat" class="text-[#797979] small-paragraph mt-1">
            Repeats {{ repeatLabel(ev).toLowerCase() }}
          </div>
        </aside>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import {
  findEvent,
  occurrenceFor,
  formatLongDate,
  formatFullDate,
  formatTime,
  repeatLabel,
  type EventOccurrence,
} from "~/utils/eventHelpers";

const route = useRoute();
const ev = findEvent(String(route.params.slug));

if (!ev) {
  throw createError({ statusCode: 404, statusMessage: "Event not found", fatal: true });
}

const occ = ref<EventOccurrence | null>(null);
onMounted(() => {
  const d = typeof route.query.date === "string" ? route.query.date : undefined;
  occ.value = occurrenceFor(ev!, d && /^\d{4}-\d{2}-\d{2}$/.test(d) ? d : undefined);
});

const paragraphs = computed(() => ev!.description.split(/\n\s*\n/));

useHead({
  title: `${ev.title} | RCCG Restoration Power Center Calgary`,
  meta: [
    { name: "description", content: ev.subtitle || ev.description.slice(0, 150) },
    { property: "og:title", content: ev.title },
    { property: "og:description", content: ev.subtitle || ev.description.slice(0, 150) },
    { property: "og:image", content: `https://rccgrpc.ca${ev.image}` },
  ],
});
</script>

<style scoped>
.back {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: #555;
  text-transform: uppercase;
  letter-spacing: 0.6px;
}
.back:hover {
  color: #141415;
}
.hero-img {
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 16 / 7;
  background: #eee;
}
.hero-img img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.repeat-pill {
  font-size: 12px;
  padding: 3px 10px;
  border-radius: 9999px;
  background: rgba(65, 181, 30, 0.12);
  color: #2f8a14;
}
.desc {
  color: #333;
}
.info-card {
  background: #f4f4f6;
  border-radius: 12px;
  padding: 22px;
  align-self: start;
  color: #333;
}
.meta-label {
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.6px;
  color: #1e1f21;
}
@media (max-width: 821px) {
  .hero-img {
    aspect-ratio: 16 / 9;
  }
}
</style>
