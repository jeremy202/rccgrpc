<template>
  <form
    class="bg-[#F3F3F3] px-5 py-10 md:px-8 rounded-[12px]"
    novalidate
    @submit.prevent="handleSubmit"
  >
    <div v-if="submitted" class="text-center py-10">
      <img src="/images/rpc-icon.svg" alt="" class="h-16 mx-auto" />
      <h4 class="mt-6">Thank you, {{ firstName }}!</h4>
      <p class="mt-3 text-[#555]">
        We've received your details and someone from our team will reach out
        to you soon. We can't wait to meet you.
      </p>
      <button type="button" class="mt-6 underline small-paragraph" @click="reset">
        Submit another response
      </button>
    </div>

    <div v-else class="grid grid-cols-1 gap-6">
      <!-- Name -->
      <div>
        <label for="nc-name" class="field-label">Name <span class="req">*</span></label>
        <input id="nc-name" v-model="form.name" type="text" autocomplete="name" placeholder="Full name" class="rccg-input w-full" />
        <p v-if="errors.name" class="err">{{ errors.name }}</p>
      </div>

      <!-- Email -->
      <div>
        <label for="nc-email" class="field-label">Email address <span class="req">*</span></label>
        <input id="nc-email" v-model="form.email" type="email" autocomplete="email" placeholder="you@example.com" class="rccg-input w-full" />
        <p v-if="errors.email" class="err">{{ errors.email }}</p>
      </div>

      <!-- Phone -->
      <div class="relative z-20">
        <label for="nc-tel" class="field-label">Phone number <span class="req">*</span></label>
        <ClientOnly>
          <VueTelInput
            v-model="form.phone"
            :input-options="{ placeholder: 'Phone number', id: 'nc-tel' }"
            :dropdown-options="{ showSearchBox: true, showFlags: true }"
            default-country="CA"
            mode="international"
            class="rccg-tel-input w-full"
            @validate="onPhoneValidate"
          />
        </ClientOnly>
        <p v-if="errors.phone" class="err">{{ errors.phone }}</p>
      </div>

      <!-- How did you hear -->
      <fieldset>
        <legend class="field-label">How did you hear about us?</legend>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
          <label v-for="opt in hearOptions" :key="opt" class="choice">
            <input v-model="form.heardFrom" type="radio" name="heardFrom" :value="opt" />
            <span>{{ opt }}</span>
          </label>
        </div>
        <div v-if="form.heardFrom === OTHER_HEAR" class="mt-3">
          <input
            v-model="form.heardFromOther"
            type="text"
            maxlength="200"
            placeholder="Please specify"
            aria-label="How did you hear about us — other"
            class="rccg-input w-full"
          />
          <p v-if="errors.heardFromOther" class="err">{{ errors.heardFromOther }}</p>
        </div>
      </fieldset>

      <!-- Prayer request -->
      <div>
        <label for="nc-prayer" class="field-label">Prayer request</label>
        <textarea
          id="nc-prayer"
          v-model="form.prayerRequest"
          rows="4"
          maxlength="3000"
          placeholder="How can we pray with you?"
          class="rccg-input w-full resize-y"
        ></textarea>
      </div>

      <!-- How can we help -->
      <fieldset>
        <legend class="field-label">How can we help? <span class="hint">Please select all that apply.</span></legend>
        <div class="grid grid-cols-1 gap-2 mt-1">
          <label v-for="opt in helpOptions" :key="opt" class="choice">
            <input v-model="form.help" type="checkbox" :value="opt" />
            <span>{{ opt }}</span>
          </label>
        </div>
        <div v-if="form.help.includes(OTHER_HELP)" class="mt-3">
          <textarea
            v-model="form.helpOther"
            rows="3"
            maxlength="1000"
            placeholder="Please tell us how we can help"
            aria-label="How can we help — other"
            class="rccg-input w-full resize-y"
          ></textarea>
          <p v-if="errors.helpOther" class="err">{{ errors.helpOther }}</p>
        </div>
      </fieldset>

      <!-- honeypot (spam trap, hidden from people) -->
      <input v-model="form.website" type="text" name="website" tabindex="-1" autocomplete="off" class="hp" aria-hidden="true" />

      <div>
        <button type="submit" class="btn-submit text-center w-full text-white" :disabled="isSubmitting">
          {{ isSubmitting ? "Sending..." : "Submit" }}
        </button>
        <p v-if="errorMessage" class="err text-center mt-3">{{ errorMessage }}</p>
      </div>
    </div>
  </form>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { VueTelInput } from "vue-tel-input";
import "vue-tel-input/vue-tel-input.css";

const OTHER_HEAR = "Other";
const OTHER_HELP = "Other";

const hearOptions = ["A friend", "A family member", "Social Media", OTHER_HEAR];
const helpOptions = [
  "I'm new to the church",
  "I'm new to Calgary",
  "I'd like to speak to a Pastor",
  "I need Prayer",
  "I'd like to know more about being a Christian",
  OTHER_HELP,
];

const blank = () => ({
  name: "",
  email: "",
  phone: "",
  heardFrom: "",
  heardFromOther: "",
  prayerRequest: "",
  help: [] as string[],
  helpOther: "",
  website: "",
});

const form = ref(blank());
const errors = ref<Record<string, string>>({});
const isSubmitting = ref(false);
const submitted = ref(false);
const errorMessage = ref("");
const isPhoneValid = ref(false);

const firstName = computed(() => form.value.name.trim().split(/\s+/)[0] || "friend");

const onPhoneValidate = (result: { valid?: boolean }) => {
  isPhoneValid.value = !!result?.valid;
};

const validate = () => {
  const e: Record<string, string> = {};
  const f = form.value;
  if (!f.name.trim()) e.name = "Please enter your name";
  if (!f.email.trim()) e.email = "Please enter your email address";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim()))
    e.email = "Please enter a valid email address";
  if (!f.phone.trim()) e.phone = "Please enter your phone number";
  else if (!isPhoneValid.value) e.phone = "Please enter a valid phone number";
  if (f.heardFrom === OTHER_HEAR && !f.heardFromOther.trim())
    e.heardFromOther = "Please tell us how you heard about us";
  if (f.help.includes(OTHER_HELP) && !f.helpOther.trim())
    e.helpOther = "Please tell us how we can help";
  errors.value = e;
  return Object.keys(e).length === 0;
};

const handleSubmit = async () => {
  errorMessage.value = "";
  if (!validate()) return;
  isSubmitting.value = true;
  try {
    const res = await fetch("/newcomer.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form.value),
    });
    const result = await res.json().catch(() => ({}));
    if (res.ok && result.success) {
      submitted.value = true;
      if (typeof window !== "undefined") {
        document.getElementById("newcomer-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      errorMessage.value = result.message || "Something went wrong. Please try again.";
    }
  } catch {
    errorMessage.value = "Unable to send the form. Please check your connection and try again.";
  } finally {
    isSubmitting.value = false;
  }
};

const reset = () => {
  form.value = blank();
  errors.value = {};
  submitted.value = false;
};
</script>

<style scoped>
.field-label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  color: #1e1f21;
}
.req {
  color: #d22;
}
.hint {
  font-weight: 400;
  color: #797979;
  font-size: 13px;
  margin-left: 4px;
}
.err {
  color: #e02424;
  font-size: 13px;
  margin-top: 6px;
}
.choice {
  display: flex;
  align-items: center;
  gap: 10px;
  background: #e7e7e7;
  border-radius: 10px;
  padding: 12px 14px;
  cursor: pointer;
  transition: background 0.2s ease;
}
.choice:hover {
  background: #dedede;
}
.choice input {
  width: 18px;
  height: 18px;
  accent-color: #41b51e;
  flex-shrink: 0;
}
.rccg-input:focus {
  outline: 2px solid rgba(0, 175, 239, 0.5);
}
.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  opacity: 0;
}

/* phone input to match the rccg-input look */
:deep(.vue-tel-input) {
  background: #e7e7e7;
  box-shadow: 0 1px 0 rgba(161, 161, 161, 1);
  border-radius: 12px;
  border: none;
}
:deep(.vue-tel-input:focus-within) {
  box-shadow: 0 1px 0 rgba(161, 161, 161, 1);
  border: none;
}
:deep(.vti__dropdown) {
  background: transparent;
  border-right: 1px solid rgba(161, 161, 161, 0.4);
  border-radius: 12px 0 0 12px;
  padding: 0 12px;
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
:deep(.vti__search_box) {
  background: #e7e7e7;
  border: none;
  border-radius: 8px;
  padding: 8px 12px;
  width: calc(100% - 24px);
  margin: 8px 12px;
}
</style>
