<template>
  <div class="relative w-full">
    <button
      @click="togglePicker"
      class="rccg-input w-full text-left flex items-center justify-between"
    >
      <span class="text-gray-500" v-if="!displayValue">
        When do you need this ride?
      </span>
      <span v-else>{{ displayValue }}</span>
      <i class="ri-calendar-line text-gray-400"></i>
    </button>
    <div
      v-if="open"
      class="absolute z-20 bg-white shadow-lg rounded-2xl p-4 mt-2 w-[320px] border border-gray-100"
    >
      <div class="flex items-center justify-between mb-2">
        <button @click="prevMonth" class="text-gray-500 hover:text-black">
          ‹
        </button>
        <div class="text-lg font-medium">
          {{ months[currentMonth] }} {{ currentYear }}
        </div>
        <button @click="nextMonth" class="text-gray-500 hover:text-black">
          ›
        </button>
      </div>

      <div
        class="grid grid-cols-7 text-center text-xs font-semibold text-gray-400 mb-1"
      >
        <div v-for="day in weekDays" :key="day">{{ day }}</div>
      </div>
      <div class="grid grid-cols-7 text-center gap-1 mb-3">
        <div
          v-for="(day, index) in calendarDays"
          :key="index"
          class="py-2 text-sm rounded-lg cursor-pointer"
          :class="{
            'text-gray-300': day.type !== 'current',
            'bg-blue-600 text-white': isSelected(day),
            'hover:bg-gray-100': day.type === 'current' && !isSelected(day),
          }"
          @click="selectDate(day)"
        >
          {{ day.date }}
        </div>
      </div>
      <div class="flex justify-center items-center gap-2 border-t pt-3">
        <input
          type="number"
          v-model="hour"
          min="0"
          max="23"
          class="w-14 text-center border rounded-lg py-2"
        />
        :
        <input
          type="number"
          v-model="minute"
          min="0"
          max="59"
          class="w-14 text-center border rounded-lg py-2"
        />
      </div>

      <button
        @click="confirm"
        class="mt-4 w-full bg-blue-600 text-white rounded-lg py-2 font-medium hover:bg-blue-700"
      >
        Confirm
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: String,
});
const emit = defineEmits(["update:modelValue"]);

const open = ref(false);
const selectedDate = ref<Date | null>(null);

const today = new Date();
const currentYear = ref(today.getFullYear());
const currentMonth = ref(today.getMonth());
const hour = ref(today.getHours());
const minute = ref(today.getMinutes());

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekDays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const togglePicker = () => (open.value = !open.value);

const daysInMonth = (year: number, month: number) =>
  new Date(year, month + 1, 0).getDate();

const firstDayOfMonth = (year: number, month: number) =>
  new Date(year, month, 1).getDay() || 7;

const calendarDays = computed(() => {
  const days: { date: number; type: string; fullDate: Date }[] = [];
  const totalDays = daysInMonth(currentYear.value, currentMonth.value);
  const startDay = firstDayOfMonth(currentYear.value, currentMonth.value);
  const prevMonthDays = daysInMonth(currentYear.value, currentMonth.value - 1);
  for (let i = startDay - 2; i >= 0; i--) {
    const date = prevMonthDays - i;
    const fullDate = new Date(currentYear.value, currentMonth.value - 1, date);
    days.push({ date, type: "prev", fullDate });
  }

  for (let i = 1; i <= totalDays; i++) {
    const fullDate = new Date(currentYear.value, currentMonth.value, i);
    days.push({ date: i, type: "current", fullDate });
  }
  const remaining = 42 - days.length;
  for (let i = 1; i <= remaining; i++) {
    const fullDate = new Date(currentYear.value, currentMonth.value + 1, i);
    days.push({ date: i, type: "next", fullDate });
  }

  return days;
});

const prevMonth = () => {
  if (currentMonth.value === 0) {
    currentMonth.value = 11;
    currentYear.value--;
  } else currentMonth.value--;
};

const nextMonth = () => {
  if (currentMonth.value === 11) {
    currentMonth.value = 0;
    currentYear.value++;
  } else currentMonth.value++;
};

const selectDate = (day: any) => {
  selectedDate.value = day.fullDate;
};

const isSelected = (day: any) => {
  if (!selectedDate.value) return false;
  return day.fullDate.toDateString() === selectedDate.value.toDateString();
};

const displayValue = computed(() => props.modelValue);

const confirm = () => {
  if (!selectedDate.value) return alert("Please select a date");

  const formattedTime = `${hour.value
    .toString()
    .padStart(2, "0")}:${minute.value.toString().padStart(2, "0")}`;
  const formattedDate = `${
    months[selectedDate.value.getMonth()]
  } ${selectedDate.value.getDate()}, ${selectedDate.value.getFullYear()}`;
  const value = `${formattedDate} - ${formattedTime}`;

  emit("update:modelValue", value);
  open.value = false;
};
</script>

<style scoped></style>
