<template>
  <div class="church-banner section-padding">
    <div class="pt-[100px]" data-aos="fade-up" data-aos-duration="600">
      <div class="fancy-header">About Us</div>
      <div class="w-full md:w-5/12">
        <div class="title">Our Church</div>
      </div>
      <div class="mt-8">
        <Button
          to="/newcomers"
          label="New here? Connect with us"
          bg="linear-gradient(74deg, rgba(0, 175, 239, 1), rgba(65, 181, 30, 1))"
          textColor="#ffffff"
          border="none"
          iconImage="/images/ic-btn-arrow-w.svg"
        />
      </div>
    </div>
  </div>

  <!-- Message from the Pastor -->
  <section
    class="section-padding bg-[#EFF2F7]"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="flex justify-center">
      <div class="w-full">
        <img
          src="/images/ic-gap.svg"
          alt=""
          data-aos="fade-up"
          data-aos-duration="600"
        />
        <h1 class="mt-6" data-aos="fade-up" data-aos-duration="700">
          Message from the Pastor
        </h1>

        <div
          class="pastor-card mt-10"
          data-aos="fade-up"
          data-aos-duration="900"
        >
          <div class="pastor-card-accent"></div>
          <div class="flex flex-col md:flex-row gap-10 items-start">
            <div
              class="w-full md:w-5/12 md:sticky md:top-[88px] md:self-start"
              data-aos="fade-right"
              data-aos-duration="900"
            >
              <div class="pastor-img-wrapper">
                <img
                  :src="pastors.photo"
                  class="w-full rounded-[20px] object-cover max-h-[500px]"
                  :alt="`${pastors.title_prefix} ${pastors.first_names} ${pastors.surname}`"
                />
              </div>
              <h5 class="mt-5 text-center text-[#141415]">
                {{ pastors.title_prefix }} {{ pastors.first_names }} {{ pastors.surname }}
              </h5>
              <p class="text-center text-[#797979] mt-1 small-paragraph">
                {{ pastors.role_long }}
              </p>
            </div>
            <div
              class="w-full md:w-7/12"
              data-aos="fade-left"
              data-aos-duration="900"
            >
              <div class="pastor-quote-mark">"</div>
              <p
                v-for="(para, i) in toParagraphs(pastors.message)"
                :key="i"
                class="leading-[1.9] text-[17px] relative z-10"
                :class="{ 'mt-6': i > 0 }"
              >
                {{ para }}
              </p>
              <div class="flex items-center gap-4 mt-8">
                <div class="signature-line"></div>
                <div>
                  <div class="fancy-header" style="font-size: 22px">
                    {{ pastors.title_prefix }} {{ pastors.first_names }}
                  </div>
                  <h5 class="mt-0 text-[#797979] font-normal">{{ pastors.surname }}</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Church History — Timeline -->
  <section class="section-padding" data-aos="fade-up" data-aos-duration="600">
    <div class="flex justify-center">
      <div class="w-full">
        <img
          src="/images/ic-gap.svg"
          alt=""
          data-aos="fade-up"
          data-aos-duration="600"
        />
        <h1 class="mt-6" data-aos="fade-up" data-aos-duration="700">
          Church History
        </h1>
        <p
          class="mt-3 text-[#797979] text-[17px]"
          data-aos="fade-up"
          data-aos-duration="800"
        >
          The story God has been writing since 2017.
        </p>

        <div class="timeline mt-14">
          <div
            v-for="(milestone, i) in milestones"
            :key="i"
            class="timeline-item"
            :data-aos="i % 2 === 0 ? 'fade-right' : 'fade-left'"
            data-aos-duration="800"
            :data-aos-delay="i * 60"
          >
            <div class="timeline-dot">
              <div class="timeline-dot-inner"></div>
            </div>
            <div class="timeline-card">
              <div class="timeline-date">{{ milestone.date }}</div>
              <h5 class="mt-2 text-[#141415]">{{ milestone.title }}</h5>
              <p class="mt-2 text-[#555] leading-[1.7] small-paragraph">
                {{ milestone.desc }}
              </p>
            </div>
          </div>

          <div class="timeline-end">
            <div class="timeline-end-dot"></div>
            <p class="text-[#41B51E] indivisible-bold small-paragraph mt-3">
              The story continues...
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Church Anniversary Gallery — marquee -->
  <section
    class="section-padding-y bg-[#2F3233] overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="section-padding-left pr-5 mb-12">
      <img src="/images/ic-gap.svg" alt="" />
      <h1 class="text-white mt-8">{{ galleries.church_anniversary.title }}</h1>
      <p class="text-[#C3C3C3] mt-2">
        {{ galleries.church_anniversary.subtitle }}
      </p>
    </div>

    <div class="marquee-container">
      <div class="marquee-track">
        <div
          v-for="(photo, i) in anniversaryMarquee"
          :key="i"
          class="marquee-item"
        >
          <img :src="photo" :alt="galleries.church_anniversary.title" class="marquee-img" />
        </div>
      </div>
    </div>
  </section>

  <!-- Our Leadership -->
  <section
    class="section-padding bg-[#EFF2F7]"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <img src="/images/ic-gap.svg" alt="" />
    <h1 class="mt-6" data-aos="fade-up" data-aos-duration="700">
      Our Leadership
    </h1>
    <p
      class="mt-3 text-[#797979] text-[17px]"
      data-aos="fade-up"
      data-aos-duration="800"
    >
      Meet the team leading our church family with wisdom and love.
    </p>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
      <div
        v-for="(leader, i) in pastors.leadership"
        :key="i"
        class="leadership-card"
        data-aos="fade-up"
        :data-aos-duration="800 + i * 150"
      >
        <img
          v-if="leader.photo"
          :src="leader.photo"
          :alt="leader.name"
          class="leadership-photo"
        />
        <div v-else class="leadership-placeholder">
          <p class="small-paragraph text-[#aaa]">Photo coming soon</p>
        </div>
        <h4 class="mt-6">{{ leader.name }}</h4>
        <div class="fancy-header mt-2" :style="{ color: i % 2 === 0 ? '#41b51e' : '#00afef' }">
          {{ leader.role }}
        </div>
      </div>
    </div>
  </section>

  <!-- Life at RPC — marquee -->
  <section
    class="section-padding-y bg-[#2F3233] overflow-hidden"
    data-aos="fade-up"
    data-aos-duration="600"
  >
    <div class="section-padding-left pr-5 mb-12">
      <img src="/images/ic-gap.svg" alt="" />
      <h1 class="text-white mt-8">{{ galleries.life_at_rpc.title }}</h1>
      <p class="text-[#C3C3C3] mt-2">
        {{ galleries.life_at_rpc.subtitle }}
      </p>
    </div>

    <div class="marquee-container">
      <div class="marquee-track marquee-reverse">
        <div v-for="(photo, i) in lifeMarquee" :key="i" class="marquee-item">
          <img :src="photo" :alt="galleries.life_at_rpc.title" class="marquee-img" />
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding">
    <GladToHaveYou />
  </section>
</template>

<script setup lang="ts">
import { pastors, history, galleries, toParagraphs, loop } from "~/utils/siteContent";

const milestones = history.milestones;
const anniversaryMarquee = loop(galleries.church_anniversary.photos);
const lifeMarquee = loop(galleries.life_at_rpc.photos);
</script>

<style scoped>
.church-banner {
  background: linear-gradient(
    136deg,
    rgba(255, 252, 222, 1),
    rgba(255, 222, 222, 1)
  );
}

/* Pastor card */
.pastor-card {
  background: white;
  border-radius: 24px;
  padding: 52px;
  position: relative;
  overflow: clip;
  box-shadow: 0 4px 40px rgba(0, 0, 0, 0.06);
}

.pastor-card-accent {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(
    74deg,
    rgba(0, 175, 239, 1),
    rgba(65, 181, 30, 1)
  );
}

.pastor-img-wrapper {
  position: relative;
}
.pastor-img-wrapper::before {
  content: "";
  position: absolute;
  inset: -8px;
  background: linear-gradient(
    135deg,
    rgba(0, 175, 239, 0.1),
    rgba(65, 181, 30, 0.1)
  );
  border-radius: 28px;
  z-index: 0;
}
.pastor-img-wrapper img {
  position: relative;
  z-index: 1;
}

.pastor-quote-mark {
  position: absolute;
  top: 20px;
  right: 40px;
  font-family: "Albert Sans", sans-serif;
  font-size: 160px;
  font-weight: 900;
  color: rgba(65, 181, 30, 0.05);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

.signature-line {
  width: 44px;
  height: 2.5px;
  background: linear-gradient(
    74deg,
    rgba(0, 175, 239, 1),
    rgba(65, 181, 30, 1)
  );
  border-radius: 2px;
  flex-shrink: 0;
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 32px;
}

.timeline::before {
  content: "";
  position: absolute;
  left: 7px;
  top: 0;
  bottom: 0;
  width: 2px;
  background: linear-gradient(
    to bottom,
    rgba(0, 175, 239, 0.4),
    rgba(65, 181, 30, 0.4)
  );
}

.timeline-item {
  position: relative;
  margin-bottom: 40px;
}

.timeline-dot {
  position: absolute;
  left: -28px;
  top: 16px;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  background: white;
  border: 2px solid rgba(0, 175, 239, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.timeline-dot-inner {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: linear-gradient(
    74deg,
    rgba(0, 175, 239, 1),
    rgba(65, 181, 30, 1)
  );
}

.timeline-card {
  background: white;
  border: 1px solid #eee;
  border-radius: 16px;
  padding: 24px 28px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.timeline-card:hover {
  transform: translateX(6px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
}

.timeline-date {
  display: inline-block;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: white;
  background: linear-gradient(
    74deg,
    rgba(0, 175, 239, 1),
    rgba(65, 181, 30, 1)
  );
  padding: 3px 12px;
  border-radius: 20px;
}

.timeline-end {
  position: relative;
  padding-left: 0;
  padding-top: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
  padding-left: 4px;
}

.timeline-end-dot {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: linear-gradient(
    74deg,
    rgba(0, 175, 239, 1),
    rgba(65, 181, 30, 1)
  );
  position: absolute;
  left: -30px;
  top: 8px;
}

/* Leadership cards */
.leadership-card {
  background: white;
  border-radius: 20px;
  padding: 36px;
  border: 1px solid #eef0f4;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.leadership-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.09);
}

.leadership-photo {
  width: 100%;
  height: 300px;
  object-fit: cover;
  object-position: top;
  border-radius: 14px;
}

.leadership-placeholder {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #f0f4ff, #f0fff4);
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px dashed #dde2ef;
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
}

.marquee-track {
  display: flex;
  gap: 16px;
  width: max-content;
  animation: marquee-scroll 50s linear infinite;
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
  width: 280px;
  height: 360px;
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

@media (max-width: 821px) {
  .pastor-card {
    padding: 24px;
    border-radius: 18px;
  }
  .pastor-quote-mark {
    font-size: 100px;
    top: 10px;
    right: 16px;
  }
  .timeline {
    padding-left: 28px;
  }
}
</style>
