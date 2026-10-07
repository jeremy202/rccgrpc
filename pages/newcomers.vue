<template>
  <div class="section-padding">
    <div class="pt-[100px] block md:flex justify-between gap-10">
      <div class="w-full md:w-4/12" data-aos="fade-right" data-aos-duration="600">
        <div class="fancy-header">New here?</div>
        <div class="title leading-[1.05]">Welcome Home</div>
        <p class="mt-4 leading-[1.7]">
          We're so glad you visited Restoration Power Center. We'd love to get
          to know you, pray with you, and help you find your place in our
          church family.
        </p>
        <p class="mt-4 leading-[1.7]">
          Fill in the form and someone from our team will reach out to you.
        </p>
        <div class="flex items-start gap-2 mt-8 text-[#555]">
          <img src="/images/ic-address-1.svg" alt="" />
          <p class="small-paragraph">
            {{ settings.address }}<br />{{ settings.country }}
          </p>
        </div>
      </div>
      <div id="newcomer-form" class="w-full md:w-7/12 mt-10 md:mt-0 scroll-mt-28" data-aos="fade-left" data-aos-duration="600">
        <NewcomerForm />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { settings } from "~/utils/siteContent";

useHead({
  title: "New Here? | RCCG Restoration Power Center Calgary",
  meta: [
    {
      name: "description",
      content:
        "New to RCCG Restoration Power Center Calgary? Let us know you visited — we'd love to connect with you and pray with you.",
    },
  ],
});
</script>
