<template>
  <div class="mb-12" data-aos="fade-up" data-aos-duration="600">
    <img src="/images/ic-gap.svg" alt="" />
    <h1 class="mt-8">We’re Glad To Have You.</h1>
  </div>

  <div class="bg-rotated" data-aos="fade-up" data-aos-duration="1000">
    <div class="bg-content flex items-center gap-6">
      <div class="w-full md:w-1/2 hidden md:block">
        <img
          data-aos="fade-right"
          data-aos-duration="800"
          src="/images/img-pastor.jpg"
          class="rounded-[12px] h-[500px] ml-8"
          alt=""
        />
      </div>
      <div class="w-full md:w-1/2 md:pr-20 py-10">
        <p
          class="leading-[24px] text-[#141415]"
          data-aos="fade-left"
          data-aos-duration="800"
        >
          At RPC we love to see people thrive in their divine gifts and
          abilities. We strategically position members to maximize their hidden
          potential to build the kingdom of God with excellence and passion, and
          to impact our community through the love of Christ. We are committed
          to raising the next generation of leaders in the kingdom and in RCCG
          worldwide.
        </p>
        <div
          class="fancy-header mt-6"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          Lilian & Benson
        </div>
        <h5 class="mt-1" data-aos="fade-up" data-aos-duration="600">Akwue</h5>

        <div
          class="mt-5 md:flex gap-4 relative z-10"
          data-aos="fade-up"
          data-aos-duration="600"
        >
          <Button
            to="/church"
            label="About the church"
            bg="#41B51E"
            textColor="#ffffff"
            border="none"
            iconImage="/images/ic-right-arrow.svg"
          />
          <Button
            class="mt-4 md:mt-0"
            to="/programs"
            label="See more programs"
            bg="#FFFFFF"
            textColor="#141415"
            border="none"
            iconImage="/images/ic-right-arrow-green.svg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script></script>

<style scoped>
.bg-rotated {
  position: relative;
  height: 480px;
  border-radius: 12px;
}

.bg-rotated::before {
  content: "";
  position: absolute;
  inset: 0;
  background: #f3f4de;
  transform: rotate(-6deg);
  transform-origin: center;
  border-radius: 12px;
  z-index: 0;
}

.bg-content {
  position: relative;
  z-index: 1;
  padding: 20px;
}
</style>
