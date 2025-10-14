<template>
  <section class="relative banner">
    <div class="relative z-10 flex h-full w-full flex-col justify-center">
      <p
        class="text-white fancy-header mb-2"
        data-aos="fade-up"
        data-aos-duration="600"
      >
        ✨ 2025: Year of Higher Heights
      </p>

      <div class="title text-white" data-aos="fade-up" data-aos-duration="800">
        A Place To Call <br class="hidden md:block" />
        Home...
      </div>

      <div
        class="flex items-center gap-2 mt-8 text-white"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <span class="">
          <img src="/images/ic-address.svg" alt="" />
        </span>
        <p>10623 West Valley Road, SW, Calgary AB. T3B 5T2</p>
      </div>

      <div class="flex gap-4 mt-10" data-aos="fade-up" data-aos-duration="1200">
        <Button
          to="/church"
          label="Visit Church"
          bg="linear-gradient(74deg, rgba(0, 175, 239, 1), rgba(65, 181, 30, 1))"
          textColor="#ffffff"
          border="none"
          iconImage="/images/ic-btn-arrow-w.svg"
        />

        <Button
          to="/programs"
          label="Our Programs"
          bg="transparent"
          textColor="#ffffff"
          border="1px solid rgba(255, 255, 255, 1)"
        />
      </div>

      <div
        class="md:absolute bottom-0 right-0 text-right text-white mt-10 md:mt-0"
        data-aos="fade-up"
        data-aos-duration="1400"
      >
        <div class="fancy-header">Upcoming...</div>
        <h5 class="mt-1">Mid week service</h5>
        <p class="mt-3">Online on Zoom • Every Thursday</p>
      </div>
    </div>
  </section>

  <section class="section-padding" data-aos="fade-up" data-aos-duration="800">
    <GodsPresence />
  </section>

  <!-- <section class="section-padding-x section-padding-bottom bg-grad">
    <img src="/images/dummy.png" class="w-full object-cover" alt="" />

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
      <div>
        <div class="flex gap-4 items-start">
          <img src="/images/img-placeholder-ls.svg" alt="" />
          <h5 class="text-[#2F3233]">Moment of possibilities</h5>
        </div>

        <div class="mt-2">
          <div class="flex items-center">
            <img src="/images/ic-date.svg" alt="" />
            <div class="small-paragraph ml-2">Tues, Nov. 07 • 7.00pm MT</div>
          </div>
          <div class="flex items-center mt-2">
            <img src="/images/ic-time.svg" alt="" />
            <div class="small-paragraph ml-2">In-person</div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex gap-4 items-start">
          <img src="/images/img-placeholder-ls-1.svg" alt="" />
          <h5 class="text-[#2F3233]">Moment of possibilities</h5>
        </div>

        <div class="mt-2">
          <div class="flex items-center">
            <img src="/images/ic-date.svg" alt="" />
            <div class="small-paragraph ml-2">Tues, Nov. 07 • 7.00pm MT</div>
          </div>
          <div class="flex items-center mt-2">
            <img src="/images/ic-time.svg" alt="" />
            <div class="small-paragraph ml-2">In-person</div>
          </div>
        </div>
      </div>
      <div>
        <div class="flex gap-4 items-start">
          <img src="/images/img-placeholder-ls-1.svg" alt="" />
          <h5 class="text-[#2F3233]">Moment of possibilities</h5>
        </div>

        <div class="mt-2">
          <div class="flex items-center">
            <img src="/images/ic-date.svg" alt="" />
            <div class="small-paragraph ml-2">Tues, Nov. 07 • 7.00pm MT</div>
          </div>
          <div class="flex items-center mt-2">
            <img src="/images/ic-time.svg" alt="" />
            <div class="small-paragraph ml-2">In-person</div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-10">
      <Button
        to="/programs"
        label="See more programs"
        bg="linear-gradient(74deg, rgba(0, 175, 239, 1), rgba(65, 181, 30, 1))"
        textColor="#ffffff"
        border="none"
        iconImage="/images/ic-btn-arrow-w.svg"
      />
    </div>
  </section> -->

  <section
    class="section-padding-y bg-[#2F3233] section-padding-left pr-5"
    data-aos="fade-up"
    data-aos-duration="800"
  >
    <div>
      <div class="mb-12" data-aos="fade-up" data-aos-duration="600">
        <img src="/images/ic-gap.svg" alt="" />
        <h1 class="text-white mt-8">A Place For All.</h1>
      </div>

      <div
        class="flex gap-6 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar"
        data-aos="fade-left"
        data-aos-duration="600"
      >
        <div
          v-for="(ministry, i) in ministries"
          :key="i"
          class="group ministry-card snap-start flex-shrink-0 w-[80vw] h-[600px] sm:w-[48vw] md:w-[23vw] cursor-pointer relative rounded-[12px] overflow-hidden"
        >
          <img
            :src="ministry.img"
            :alt="ministry.title"
            class="absolute inset-0 w-full h-full object-cover"
          />

          <div
            class="absolute inset-0 bg-black/60 transition-opacity duration-500 group-hover:bg-black/80"
          ></div>

          <div class="absolute bottom-12 left-4">
            <h3 class="mb-2 text-white">
              {{ ministry.title }}
            </h3>
          </div>

          <div
            class="absolute inset-x-4 hover-card bottom-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-in-out"
            :class="ministry.bg"
          >
            <h3 class="mb-2">
              {{ ministry.title }}
            </h3>
            <p class="">{{ ministry.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding">
    <GladToHaveYou />
  </section>
</template>

<script setup lang="ts">
const ministries = [
  {
    title: "Children's Church",
    img: "/images/img-children-church-min.jpg",
    desc: "Nurturing ground for the giants of tomorrow.",
    bg: "bg-[#537C47]",
  },
  {
    title: "Youth Ministry",
    img: "/images/img-youths-min.jpg",
    desc: "Our Next gen ministry for young adults.",
    bg: "bg-[#7E03AB]",
  },
  {
    title: "Men of Impact",
    img: "/images/img-men-min.jpg",
    desc: "Our Men's ministry building Men of Impact.",
    bg: "bg-[#F28D21]",
  },
  {
    title: "Vessels of Honour",
    img: "/images/img-women-min.jpg",
    desc: "Our Women ministry building vessels of honour.",
    bg: "bg-[#AB033E]",
  },
];
</script>

<style scoped>
.banner {
  background: linear-gradient(
      180deg,
      rgba(47, 50, 51, 0.65),
      rgba(47, 50, 51, 1)
    ),
    url(/images/bg-rpc-hero-min.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 350px 180px 100px 180px;
}
.bg-grad {
  background-image: linear-gradient(#ffffff 30%, #eff2f7 70%);
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
.hover-card {
  border-radius: 16px 16px 0 0;
}
@media (max-width: 821px) {
  .banner {
    padding: 200px 20px 100px 20px;
  }
}
</style>
