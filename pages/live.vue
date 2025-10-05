<template>
  <div class="church-banner section-padding">
    <div class="pt-[100px]" data-aos="fade-up" data-aos-duration="600">
      <div class="bg-[#797979] rounded-[12px] h-[600px] w-full flex p-10">
        <div class="bg-blur m-auto w-full">
          <div class="big-paragraph leading-[1.3] text-center">
            We are not live at the moment…
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10 md:mt-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          class="bg-white rounded-[12px] p-[20px] md:px-[40px] md:py-[56px]"
          data-aos="fade-right"
          data-aos-duration="600"
        >
          <h3>Interac</h3>
          <p class="mt-4">To give, send interac to:</p>
          <div class="big-paragraph mt-3 text-[#41B51E]">
            <nuxt-link to="mailto:rccgcalgary@gmail.com">
              rccgcalgary@gmail.com
            </nuxt-link>
          </div>
        </div>
        <div
          class="bg-white rounded-[12px] p-[20px] md:px-[40px] md:py-[56px]"
          data-aos="fade-left"
          data-aos-duration="600"
        >
          <h3>Online payment</h3>
          <p class="mt-4">Click below for online card payment:</p>
          <div class="big-paragraph mt-3 text-[#41B51E]">
            <nuxt-link to="https://square.link/u/Z8bjYY6k" target="_blank">
              Pay With Card »
            </nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.church-banner {
  background: linear-gradient(
    132deg,
    rgba(212, 223, 242, 1),
    rgba(255, 222, 222, 1)
  );
}
</style>
