<template>
  <div class="church-banner section-padding">
    <div class="pt-[100px]">
      <div class="fancy-header">Giving</div>
      <div class="w-full md:w-3/12">
        <div class="title">Ways to Give</div>
      </div>
    </div>

    <div class="mt-10 md:mt-20">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div class="bg-white rounded-[12px] p-[20px] md:px-[40px] md:py-[56px]">
          <h3>Interac</h3>
          <p class="mt-4">To give, send interac to:</p>
          <div class="big-paragraph mt-3 text-[#41B51E]">
            <nuxt-link to="mailto:rccgcalgary@gmail.com">
              rccgcalgary@gmail.com
            </nuxt-link>
          </div>
        </div>
        <div class="bg-white rounded-[12px] p-[20px] md:px-[40px] md:py-[56px]">
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
    121deg,
    rgba(222, 255, 231, 1),
    rgba(255, 222, 222, 1)
  );
}
.church-bg {
  background: url("/images/bg-our-church-min.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  padding: 338px 60px 80px 60px;
  border-radius: 12px;
}
.bg-blur {
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(44px);
  padding: 60px;
  border-radius: 12px;
}

@media (max-width: 821px) {
  .church-bg {
    padding: 338px 20px 40px 20px;
  }
  .bg-blur {
    padding: 20px;
  }
}
</style>
