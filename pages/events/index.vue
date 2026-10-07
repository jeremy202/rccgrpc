<template>
  <div class="church-banner section-padding">
    <div class="pt-[100px]" data-aos="fade-up" data-aos-duration="600">
      <div class="fancy-header">What's happening</div>
      <div class="w-full md:w-6/12">
        <div class="title">Upcoming Events</div>
      </div>
    </div>
  </div>

  <section class="events-section section-padding-x pt-16 pb-24 md:pb-32">
    <!-- Heading row -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
      <div>
        <h1 class="leading-none">Events</h1>
        <p class="mt-2 text-[#555]">
          {{ ready ? `${filtered.length} ${filtered.length === 1 ? "Result" : "Results"}` : " " }}
        </p>
      </div>

      <div class="flex items-center gap-3">
        <label class="search">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#555" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>
          <input v-model="query" type="search" placeholder="Search" aria-label="Search events" />
        </label>
        <ShareButton
          title="Upcoming Events at RCCG Restoration Power Center"
          text="See what's happening at RPC Calgary."
          path="/events"
        />
        <button
          type="button"
          class="icon-btn"
          aria-label="Add all events to my calendar"
          title="Add all events to my calendar (.ics)"
          @click="downloadAll"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <rect x="3" y="5" width="18" height="16" rx="2" />
            <path d="M16 3v4M8 3v4M3 10h18M12 14v4M10 16h4" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Toolbar -->
    <div class="toolbar mt-6">
      <div class="flex items-center gap-1 md:gap-3">
        <button type="button" class="tb-btn uppercase indivisible-bold" @click="goToday">Today</button>
        <button type="button" class="tb-icon" aria-label="Previous month" @click="month = shiftMonth(month, -1)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m15 6-6 6 6 6"/></svg>
        </button>
        <label class="month-select">
          <select v-model="month" aria-label="Choose month">
            <option v-for="m in monthOptions" :key="m" :value="m">{{ formatMonthYear(m) }}</option>
          </select>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 8h14l-7 8z"/></svg>
        </label>
        <button type="button" class="tb-icon" aria-label="Next month" @click="month = shiftMonth(month, 1)">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m9 6 6 6-6 6"/></svg>
        </button>
      </div>

      <label class="month-select">
        <span class="sr-only">View</span>
        <select v-model="view" aria-label="Change view">
          <option value="grid">VIEW: GRID</option>
          <option value="list">VIEW: LIST</option>
        </select>
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M5 8h14l-7 8z"/></svg>
      </label>
    </div>

    <!-- Results -->
    <div v-if="!ready" class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6">
      <div v-for="n in 3" :key="n" class="card skeleton h-[440px]"></div>
    </div>

    <div v-else-if="filtered.length === 0" class="empty mt-6">
      <h5>No events {{ query ? "match your search" : "this month" }}.</h5>
      <p class="mt-2 text-[#797979]">
        Try another month, or join us for Sunday service at 10 AM.
      </p>
    </div>

    <div
      v-else
      :class="view === 'grid'
        ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-6'
        : 'flex flex-col gap-4 mt-6'"
    >
      <NuxtLink
        v-for="o in filtered"
        :key="o.event.slug + o.date"
        :to="{ path: `/events/${o.event.slug}`, query: { date: o.date } }"
        class="card group"
        :class="view === 'list' ? 'card-list' : ''"
      >
        <div class="card-media">
          <img :src="o.event.image" :alt="o.event.title" loading="lazy" />
          <div class="date-badge">
            <span class="small-paragraph text-[#555]">{{ formatMonthShort(o.date) }}</span>
            <span class="badge-day">{{ formatDayOrdinal(o.date) }}</span>
          </div>
        </div>
        <div class="card-body">
          <h5 class="card-title">{{ o.event.title }}</h5>
          <p class="card-desc">{{ o.event.description }}</p>
          <div class="card-meta">
            <div>
              <div class="meta-label">DATE</div>
              <div>{{ formatFullDate(o.date) }}</div>
            </div>
            <div>
              <div class="meta-label">TIME</div>
              <div>{{ formatTimeRange(o) }}</div>
            </div>
          </div>
        </div>
      </NuxtLink>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { events } from "~/data/events";
import {
  occurrencesBetween,
  occurrenceFor,
  todayInCalgary,
  monthStart,
  monthEnd,
  shiftMonth,
  formatMonthYear,
  formatMonthShort,
  formatDayOrdinal,
  formatFullDate,
  formatTimeRange,
  downloadIcs,
  type EventOccurrence,
} from "~/utils/eventHelpers";

useHead({
  title: "Events | RCCG Restoration Power Center Calgary",
  meta: [
    {
      name: "description",
      content:
        "Upcoming services and events at RCCG Restoration Power Center, Calgary. Add them to your calendar and share with friends.",
    },
  ],
});

const ready = ref(false);
const today = ref("");
const month = ref("");
const query = ref("");
const view = ref<"grid" | "list">("grid");

onMounted(() => {
  today.value = todayInCalgary();
  month.value = today.value.slice(0, 7);
  ready.value = true;
});

const goToday = () => {
  month.value = today.value.slice(0, 7);
};

const monthOptions = computed(() => {
  if (!today.value) return [];
  const base = today.value.slice(0, 7);
  const list: string[] = [];
  for (let i = -3; i <= 12; i++) list.push(shiftMonth(base, i));
  if (month.value && !list.includes(month.value)) {
    list.push(month.value);
    list.sort();
  }
  return list;
});

const occurrences = computed<EventOccurrence[]>(() => {
  if (!month.value) return [];
  let from = monthStart(month.value);
  // In the current month only show what's still to come
  if (month.value === today.value.slice(0, 7)) from = today.value;
  return occurrencesBetween(from, monthEnd(month.value));
});

const filtered = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return occurrences.value;
  return occurrences.value.filter((o) =>
    [o.event.title, o.event.subtitle, o.event.description, o.event.location]
      .join(" ")
      .toLowerCase()
      .includes(q)
  );
});

const downloadAll = () => {
  const list = events
    .map((e) => occurrenceFor(e))
    .filter((o): o is EventOccurrence => !!o);
  downloadIcs(list, window.location.origin, "rccg-rpc-events");
};
</script>

<style scoped>
.church-banner {
  background: linear-gradient(136deg, rgba(255, 252, 222, 1), rgba(255, 222, 222, 1));
}
.events-section {
  background: #f4f4f6;
}
.search {
  display: flex;
  align-items: center;
  gap: 8px;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 9px 12px;
  width: 200px;
}
.search input {
  outline: none;
  width: 100%;
  background: transparent;
  font-size: 15px;
}
.icon-btn {
  width: 42px;
  height: 42px;
  border-radius: 9999px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: #e9e9ec;
  color: #1e1f21;
  transition: background 0.2s ease;
}
.icon-btn:hover {
  background: #dcdce0;
}
.toolbar {
  background: #fff;
  border-radius: 6px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  padding: 14px 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  flex-wrap: wrap;
}
.tb-btn {
  font-size: 13px;
  letter-spacing: 0.5px;
  color: #555;
  padding: 6px 8px;
  border-radius: 6px;
}
.tb-btn:hover,
.tb-icon:hover {
  background: #f1f1f3;
}
.tb-icon {
  padding: 6px;
  border-radius: 6px;
  color: #555;
}
.month-select {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  color: #555;
  font-size: 13px;
  letter-spacing: 0.5px;
}
.month-select select {
  appearance: none;
  background: transparent;
  padding: 6px 18px 6px 6px;
  cursor: pointer;
  outline: none;
  text-transform: uppercase;
}
.month-select svg {
  position: absolute;
  right: 2px;
  pointer-events: none;
}

.card {
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.12);
}
.card-media {
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: #ddd;
}
.card-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}
.card:hover .card-media img {
  transform: scale(1.04);
}
.date-badge {
  position: absolute;
  top: 8px;
  left: 8px;
  background: #fff;
  border-radius: 2px;
  min-width: 64px;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
}
.badge-day {
  font-size: 20px;
  color: #333;
}
.card-body {
  padding: 20px 18px 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
}
.card-title {
  font-family: "indivisible", sans-serif;
  font-weight: 600;
  font-size: 20px;
  color: #1e1f21;
}
.card-desc {
  margin-top: 14px;
  color: #333;
  line-height: 1.55;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.card-meta {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  margin-top: auto;
  padding-top: 18px;
  color: #333;
}
.meta-label {
  font-weight: 700;
  color: #1e1f21;
  margin-bottom: 4px;
}

/* list view */
.card-list {
  flex-direction: row;
}
.card-list .card-media {
  width: 320px;
  flex-shrink: 0;
  aspect-ratio: auto;
  min-height: 200px;
}
@media (max-width: 821px) {
  .card-list {
    flex-direction: column;
  }
  .card-list .card-media {
    width: 100%;
    aspect-ratio: 16 / 9;
    min-height: 0;
  }
  .search {
    width: 100%;
  }
}

.skeleton {
  background: linear-gradient(90deg, #ececef 25%, #f6f6f8 50%, #ececef 75%);
  background-size: 200% 100%;
  animation: shimmer 1.4s infinite;
}
@keyframes shimmer {
  to {
    background-position: -200% 0;
  }
}
.empty {
  background: #fff;
  border-radius: 6px;
  padding: 48px 24px;
  text-align: center;
}
</style>
