<template>
  <form
    class="bg-[#F3F3F3] px-5 py-10 rounded-[12px]"
    @submit.prevent="handleSubmit"
  >
    <div class="grid grid-cols-1 gap-6">
      <div>
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

      <div class="relative z-20">
        <ClientOnly>
          <VueTelInput
            v-model="form.phone"
            :input-options="{ placeholder: 'Phone number', id: 'tel' }"
            :dropdown-options="{ showSearchBox: true, showFlags: true }"
            default-country="CA"
            mode="international"
            class="rccg-tel-input w-full"
            @validate="onPhoneValidate"
          />
        </ClientOnly>
        <p v-if="errors.phone" class="text-red-500 small-paragraph mt-1">
          {{ errors.phone }}
        </p>
      </div>

      <div class="relative z-10">
        <DateTimePicker v-model="pickedDateTime" />
        <p v-if="errors.rideTime" class="text-red-500 small-paragraph mt-1">
          {{ errors.rideTime }}
        </p>
      </div>

      <div class="w-full">
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
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

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
const isPhoneValid = ref(false);

const onPhoneValidate = (result: { valid: boolean }) => {
  isPhoneValid.value = result.valid;
};

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
  else if (!isPhoneValid.value)
    errors.value.phone = "Enter a valid phone number";
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

<style scoped>
/* Match rccg-input look */
:deep(.vue-tel-input) {
  background: #e7e7e7;
  box-shadow: 0 1px 0 rgba(161, 161, 161, 1);
  border-radius: 12px;
  border: none;
  outline: none;
}

:deep(.vue-tel-input:focus-within) {
  box-shadow: 0 1px 0 rgba(161, 161, 161, 1);
  border: none;
  outline: none;
}

:deep(.vti__dropdown) {
  background: transparent;
  border: none;
  border-right: 1px solid rgba(161, 161, 161, 0.4);
  border-radius: 12px 0 0 12px;
  padding: 0 12px;
}

:deep(.vti__dropdown:hover),
:deep(.vti__dropdown.open) {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 12px 0 0 12px;
}

:deep(.vti__input) {
  background: transparent;
  border: none;
  outline: none;
  padding: 15px 20px;
  font-family: "indivisible", sans-serif;
  font-size: 16px;
  font-weight: 500;
  color: #1e1f21;
  width: 100%;
}

:deep(.vti__input::placeholder) {
  color: #1e1f21;
}

:deep(.vti__dropdown-list) {
  border-radius: 12px;
  border: 1px solid #ddd;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  background: #fff;
  z-index: 100;
}

:deep(.vti__dropdown-item) {
  padding: 10px 16px;
  font-family: "indivisible", sans-serif;
  font-size: 14px;
}

:deep(.vti__dropdown-item.highlighted),
:deep(.vti__dropdown-item:hover) {
  background: #e7e7e7;
}

:deep(.vti__search_box) {
  background: #e7e7e7;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  font-family: "indivisible", sans-serif;
  font-size: 14px;
  width: calc(100% - 24px);
  margin: 8px 12px;
}
</style>
