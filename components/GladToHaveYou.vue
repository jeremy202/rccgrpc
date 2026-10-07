<template>
  <div class="mb-10" data-aos="fade-up" data-aos-duration="600">
    <img src="/images/ic-gap.svg" alt="" />
    <h1 class="mt-6">We're Glad To Have You.</h1>
  </div>

  <div class="glad-card" data-aos="fade-up" data-aos-duration="800">
    <div class="quote-decoration">"</div>

    <div class="flex flex-col md:flex-row items-center gap-10 md:gap-14">
      <div class="w-full md:w-5/12 relative" data-aos="fade-right" data-aos-duration="900">
        <div class="img-frame">
          <img
            :src="pastors.photo"
            class="pastor-img"
            :alt="`${pastors.title_prefix} ${pastors.first_names} ${pastors.surname}`"
          />
        </div>
      </div>

      <div class="w-full md:w-7/12 py-4" data-aos="fade-left" data-aos-duration="900">
        <p v-for="(para, i) in toParagraphs(home.welcome_message)" :key="i" class="leading-[1.9] text-[#1E1F21] text-[17px]" :class="{ 'mt-4': i > 0 }">
          {{ para }}
        </p>

        <div class="signature-row mt-8">
          <div class="signature-line"></div>
          <div>
            <div class="fancy-header" style="font-size: 22px;">{{ pastors.first_names }}</div>
            <h5 class="mt-0 text-[#797979] font-normal">{{ pastors.surname }} — {{ pastors.role }}</h5>
          </div>
        </div>

        <div class="mt-8 flex flex-wrap gap-4 relative z-10">
          <Button
            to="/church"
            label="About the church"
            bg="linear-gradient(74deg, rgba(0, 175, 239, 1), rgba(65, 181, 30, 1))"
            textColor="#ffffff"
            border="none"
            iconImage="/images/ic-btn-arrow-w.svg"
          />
          <Button
            to="/programs"
            label="Our Programs"
            bg="#F5F5F7"
            textColor="#141415"
            border="none"
            iconImage="/images/ic-right-arrow-green.svg"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { home, pastors, toParagraphs } from "~/utils/siteContent";
</script>

<style scoped>
.glad-card {
  position: relative;
  background: linear-gradient(135deg, #fafdf7 0%, #f4f8ff 100%);
  border: 1px solid rgba(65, 181, 30, 0.14);
  border-radius: 28px;
  padding: 52px;
  overflow: hidden;
}

.glad-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 3px;
  background: linear-gradient(74deg, rgba(0, 175, 239, 1), rgba(65, 181, 30, 1));
  border-radius: 28px 28px 0 0;
}

.quote-decoration {
  position: absolute;
  top: 10px;
  right: 44px;
  font-family: "Albert Sans", sans-serif;
  font-size: 180px;
  font-weight: 900;
  line-height: 1;
  color: rgba(65, 181, 30, 0.055);
  pointer-events: none;
  user-select: none;
}

.img-frame {
  position: relative;
}

.img-frame::before {
  content: '';
  position: absolute;
  inset: -10px;
  background: linear-gradient(135deg, rgba(0, 175, 239, 0.12), rgba(65, 181, 30, 0.12));
  border-radius: 30px;
  z-index: 0;
}

.pastor-img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 460px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.14);
}

.signature-row {
  display: flex;
  align-items: center;
  gap: 16px;
}

.signature-line {
  width: 44px;
  height: 2.5px;
  background: linear-gradient(74deg, rgba(0, 175, 239, 1), rgba(65, 181, 30, 1));
  border-radius: 2px;
  flex-shrink: 0;
}

@media (max-width: 821px) {
  .glad-card {
    padding: 28px 24px;
    border-radius: 20px;
  }
  .quote-decoration {
    font-size: 110px;
    top: 8px;
    right: 20px;
  }
  .pastor-img {
    height: 320px;
  }
}
</style>
