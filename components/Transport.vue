<template>
  <form
    class="bg-[#F3F3F3] px-5 py-10 rounded-[12px]"
    @submit.prevent="handleSubmit"
  >
    <div class="grid grid-cols-1 gap-6">
      <div data-aos="fade-up" data-aos-duration="600">
        <input
          type="text"
          id="name"
          v-model="form.name"
          placeholder="Full name"
          class="rccg-input w-full"
        />
        <p v-if="errors.name" class="text-red-500 small-paragraph">
          {{ errors.name }}
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="600">
        <input
          type="tel"
          id="tel"
          v-model="form.phone"
          placeholder="Phone number"
          class="rccg-input w-full"
        />
        <p v-if="errors.phone" class="text-red-500 small-paragraph mt-1">
          {{ errors.phone }}
        </p>
      </div>

      <div data-aos="fade-up" data-aos-duration="600" class="relative z-10">
        <DateTimePicker v-model="pickedDateTime" />
        <p v-if="errors.rideTime" class="text-red-500 small-paragraph mt-1">
          {{ errors.rideTime }}
        </p>
      </div>

      <div class="w-full" data-aos="fade-up" data-aos-duration="600">
        <input
          type="text"
          id="address"
          v-model="form.address"
          placeholder="Full pick-up/drop-off address"
          class="rccg-input w-full"
        />
        <div class="small-paragraph text-[#1E1F21] mt-2">Calgary only</div>
        <p v-if="errors.address" class="text-red-500 small-paragraph mt-1">
          {{ errors.address }}
        </p>
      </div>

      <div class="relative z-1">
        <PassengerInfo v-model="passengerInfo" />
        <p
          v-if="errors.passengerInfo"
          class="text-red-500 small-paragraph mt-1"
        >
          {{ errors.passengerInfo }}
        </p>
      </div>
      <div class="small-paragraph text-[#1E1F21] indivisible-semibold">
        By clicking “Submit ride request” below, you accept our Terms and agree
        to our privacy policy.
      </div>

      <div>
        <button
          type="submit"
          class="btn-submit text-center w-full text-white"
          :disabled="isSubmitting"
        >
          {{ isSubmitting ? "Submitting..." : "Submit ride request" }}
        </button>
      </div>

      <p v-if="successMessage" class="text-green-600 text-center mt-4">
        {{ successMessage }}
      </p>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";

const form = ref({
  name: "",
  phone: "",
  rideTime: "",
  address: "",
  passengerInfo: {
    adults: 1,
    children: 0,
    infants: 0,
  },
});

const passengerInfo = ref({
  adults: 1,
  children: 0,
  infants: 0,
});

const pickedDateTime = ref("");

const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const successMessage = ref("");

watch(
  passengerInfo,
  (val) => {
    form.value.passengerInfo = val;
  },
  { deep: true }
);

watch(pickedDateTime, (val) => {
  form.value.rideTime = val;
});

const validate = () => {
  errors.value = {};

  if (!form.value.name.trim()) errors.value.name = "Full name is required";
  if (!form.value.phone.trim()) errors.value.phone = "Phone number is required";
  if (!form.value.rideTime)
    errors.value.rideTime = "Select when you need the ride";
  if (!form.value.address.trim()) errors.value.address = "Address is required";

  const totalPassengers =
    form.value.passengerInfo.adults +
    form.value.passengerInfo.children +
    form.value.passengerInfo.infants;

  if (totalPassengers === 0)
    errors.value.passengerInfo = "Please provide passenger info";

  return Object.keys(errors.value).length === 0;
};

const handleSubmit = async () => {
  if (!validate()) return;

  isSubmitting.value = true;
  successMessage.value = "";

  try {
    const response = await fetch("/email.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    });

    const result = await response.json();

    if (result.success) {
      successMessage.value =
        "Your ride request has been submitted successfully!";

      form.value = {
        name: "",
        phone: "",
        rideTime: "",
        address: "",
        passengerInfo: { adults: 1, children: 0, infants: 0 },
      };

      passengerInfo.value = { adults: 1, children: 0, infants: 0 };
      pickedDateTime.value = "";
    } else {
      alert(result.message || "Something went wrong. Please try again.");
    }
  } catch (error) {
    console.error(error);
    alert("Unable to submit form. Please check your connection.");
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped></style>
