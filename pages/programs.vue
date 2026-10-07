<template>
  <div class="church-banner section-padding">
    <div class="pt-[100px]" data-aos="fade-left" data-aos-duration="600">
      <div class="fancy-header">Fellowship with us</div>
      <div class="w-full md:w-3/12">
        <div class="title">Our Programs</div>
      </div>
    </div>
  </div>

  <!-- Marriage Seminar -->
  <section
    class="section-padding-y bg-[#2F3233] overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="section-padding-left pr-5 mb-12">
      <img src="/images/ic-gap.svg" alt="" />
      <!-- <span class="event-pill" style="background: #AB033E;">Event</span> -->
      <h1 class="text-white mt-4">{{ galleries.marriage_seminar.title }}</h1>
      <p class="text-[#C3C3C3] mt-2">
        {{ galleries.marriage_seminar.subtitle }}
      </p>
    </div>

    <div class="marquee-container">
      <div class="marquee-track">
        <div
          v-for="(photo, i) in marriageMarquee"
          :key="i"
          class="marquee-item"
        >
          <img :src="photo" :alt="galleries.marriage_seminar.title" class="marquee-img" />
        </div>
      </div>
    </div>
  </section>

  <!-- Church Picnic -->
  <section
    class="section-padding-y overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="section-padding-left pr-5 mb-12">
      <img src="/images/ic-gap.svg" alt="" />
      <!-- <span class="event-pill" style="background: #00AFEF;">Event</span> -->
      <h1 class="mt-4">{{ galleries.church_picnic.title }}</h1>
      <p class="text-[#797979] mt-2">
        {{ galleries.church_picnic.subtitle }}
      </p>
    </div>

    <div class="marquee-container">
      <div class="marquee-track marquee-reverse">
        <div v-for="(photo, i) in picnicMarquee" :key="i" class="marquee-item">
          <img :src="photo" :alt="galleries.church_picnic.title" class="marquee-img" />
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding">
    <GodsPresence />
  </section>
</template>

<script setup lang="ts">
import { galleries, loop } from "~/utils/siteContent";

const marriageMarquee = loop(galleries.marriage_seminar.photos);
const picnicMarquee = loop(galleries.church_picnic.photos);
</script>

<style scoped>
.church-banner {
  background: linear-gradient(
    136deg,
    rgba(255, 252, 222, 1),
    rgba(255, 222, 222, 1)
  );
}

.event-pill {
  display: inline-block;
  color: white;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  padding: 4px 14px;
  border-radius: 20px;
  margin-bottom: 4px;
}

/* Marquee */
.marquee-container {
  overflow: hidden;
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 8%,
    black 92%,
    transparent 100%
  );
}

.marquee-track {
  display: flex;
  gap: 16px;
  width: max-content;
  animation: marquee-scroll 55s linear infinite;
  will-change: transform;
}

.marquee-reverse {
  animation-direction: reverse;
}

.marquee-container:hover .marquee-track {
  animation-play-state: paused;
}

.marquee-item {
  flex-shrink: 0;
  width: 300px;
  height: 380px;
  border-radius: 16px;
  overflow: hidden;
}

.marquee-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.marquee-item:hover .marquee-img {
  transform: scale(1.06);
}

@keyframes marquee-scroll {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}
</style>
