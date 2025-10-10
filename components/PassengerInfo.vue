<template>
  <div class="relative w-full">
    <div
      @click="toggleDropdown"
      class="flex justify-between items-center rccg-input cursor-pointer relative"
    >
      <div>
        <p class="">Passengers information</p>
        <p class="small-paragraph mt-1">
          {{ totalPassengers }} passenger(s), {{ passengers.infants }} infant(s)
        </p>
      </div>
      <span class="text-gray-500">▼</span>
    </div>

    <div
      v-if="showDropdown"
      class="absolute w-full mt-2 bg-[#e7e7e7] rounded-lg shadow p-4 z-[9999] transition-all ease-out"
    >
      <div
        v-for="(label, key) in passengerTypes"
        :key="key"
        class="flex justify-between items-center py-2"
      >
        <div>
          <p class="font-medium">{{ label.title }}</p>
          <p v-if="label.subtitle" class="text-sm text-gray-500">
            {{ label.subtitle }}
          </p>
        </div>

        <div class="flex items-center space-x-3">
          <div
            class="w-8 h-8 rounded bg-gray-300 text-lg font-bold cursor-pointer text-center"
            @click="decrement(key)"
          >
            -
          </div>
          <span class="w-4 text-center">{{ passengers[key] }}</span>
          <div
            class="w-8 h-8 rounded bg-gray-300 text-lg font-bold cursor-pointer text-center"
            @click="increment(key)"
          >
            +
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      adults: 0,
      children: 0,
      infants: 0,
    }),
  },
});

const emit = defineEmits(["update:modelValue"]);

const showDropdown = ref(false);
const passengers = ref({ ...props.modelValue });

const passengerTypes = {
  adults: { title: "Adults (age 12+)" },
  children: { title: "Children (age 2-11)" },
  infants: { title: "Infants (under 2)" },
};

watch(passengers, (val) => emit("update:modelValue", val), { deep: true });

const increment = (key) => passengers.value[key]++;
const decrement = (key) => {
  if (passengers.value[key] > 0) passengers.value[key]--;
};
const toggleDropdown = () => (showDropdown.value = !showDropdown.value);

const totalPassengers = computed(
  () => passengers.value.adults + passengers.value.children
);
</script>

<style scoped>
button:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}
</style>
