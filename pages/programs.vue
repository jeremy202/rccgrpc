<template>
  <div class="church-banner section-padding">
    <div class="pt-[100px]">
      <div class="fancy-header">Fellowship with us</div>
      <div class="w-full md:w-2/12">
        <div class="title">Our Programs</div>
      </div>
    </div>

    <div class="flex justify-center mt-10">
      <div class="bg-white rounded-[12px] p-[20px] md:p-[60px] w-full">
        <div class="big-paragraph">Coming soon…</div>
      </div>
    </div>
  </div>

  <section class="section-padding">
    <GodsPresence />
  </section>
</template>

<style scoped>
.church-banner {
  background: linear-gradient(
    136deg,
    rgba(255, 252, 222, 1),
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
