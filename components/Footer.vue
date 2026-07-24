<template>
  <div
    class="section-padding-x section-padding-top bg-[#F3F3F3]"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="block md:flex justify-normal md:justify-between">
      <div class="w-full md:w-1/2" data-aos="fade-left" data-aos-duration="600">
        <img src="/images/rccg-rpc-b.svg" alt="RPC Logo" />
        <div class="flex items-start mt-8">
          <img src="/images/ic-address-1.svg" alt="" />
          <p class="ml-2 text-[#1E1F21]">
            10623 West Valley Road, SW, Calgary AB. T3B 5T2
            <br />
            <span class="indivisible-bold">Canada.</span>
          </p>
        </div>
      </div>
      <div
        class="w-full md:w-1/2"
        data-aos="fade-right"
        data-aos-duration="600"
      >
        <div class="flex justify-normal md:justify-end mt-4 md:mt-0">
          <img src="/images/ic-phone.svg" alt="" />
          <h4 class="ml-1">
            <a href="tel:+15878340780"> +1 (587) 834 0780 </a>
          </h4>
        </div>

        <div class="flex justify-normal md:justify-end">
          <div class="grid grid-cols-2 mt-12 gap-20 text-[#1E1F21]">
            <div class="text-left md:text-right">
              <div class="small-paragraph indivisible-medium">
                <nuxt-link> Our Church </nuxt-link>
              </div>
              <div class="mt-4 small-paragraph">
                <nuxt-link to="/church"> About us </nuxt-link>
              </div>
              <div class="mt-4 small-paragraph">
                <nuxt-link to="/give"> Give </nuxt-link>
              </div>
              <div class="mt-4 small-paragraph">
                <nuxt-link to="/programs"> I’m new </nuxt-link>
              </div>
            </div>
            <div class="text-left md:text-right">
              <div class="small-paragraph indivisible-medium">
                <nuxt-link> Resources </nuxt-link>
              </div>
              <div class="mt-4 small-paragraph">
                <nuxt-link to="/request-ride"> Request ride? </nuxt-link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-t border-t-[#C3C3C3] mt-10 md:mt-[84px]">
      <div class="block md:flex">
        <div
          class="w-full md:w-3/12 md:border-r border-[#C3C3C3] pt-6 md:py-10 md:pr-10"
          data-aos="fade-right"
          data-aos-duration="600"
        >
          <div class="flex items-center">
            <img src="/images/rccg-logo.svg" alt="" />
            <div class="small-paragraph ml-2">
              © {{ new Date().getFullYear() }} The Redeemed Christian Church of
              God • Restoration Power Center.
            </div>
          </div>
        </div>
        <div
          class="w-full md:w-6/12 md:border-r border-[#C3C3C3] pt-6 md:p-10"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <div class="flex gap-4 items-center">
            <nuxt-link to="https://www.instagram.com/rccgrpc/" target="_blank">
              <img src="/images/ic-ig.svg" alt="" />
            </nuxt-link>
            <nuxt-link to="https://www.youtube.com/@rccgrpc" taget="_blank">
              <img src="/images/ic-youtube.svg" alt="" />
            </nuxt-link>
            <nuxt-link to="https://www.facebook.com/rccgrpc/" target="_blank">
              <img src="/images/ic-facebook.svg" alt="" />
            </nuxt-link>
          </div>

          <!-- <div class="flex mt-4">
            <div class="small-paragraph text-[#1E1F21]">
              <nuxt-link to="/terms"> Terms </nuxt-link>
            </div>
            <div class="small-paragraph text-[#1E1F21] ml-1">
              <nuxt-link to="/privacy"> | Privacy Policy </nuxt-link>
            </div>
          </div> -->
        </div>
        <div class="w-full md:w-3/12 py-6 md:p-10">
          <div
            @click.prevent="openNewTab"
            class="cursor-pointer flex items-center mt-4 md:mt-0"
          >
            <img src="/images/gif.gif" class="h-[30px] w-[30px]" alt="" />
            <img src="/images/secure.svg" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const openNewTab = () => {
  const pageTitle = "RCCGRPC"; // Replace 'Your Page Name' with the actual name of your page
  const queryParams = new URLSearchParams({ pageName: pageTitle }).toString();
  const newTab = window.open(
    "https://chigisoft.com/edge?" + queryParams,
    "_blank"
  );
  newTab?.focus();
};
</script>

<style scoped></style>
