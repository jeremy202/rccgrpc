<template>
  <!-- Hero -->
  <section class="relative banner overflow-hidden">
    <div class="orb orb-blue"></div>
    <div class="orb orb-green"></div>

    <div class="relative z-10 flex h-full w-full flex-col justify-center">
      <p
        class="text-white fancy-header mb-3 flex items-center gap-3"
        data-aos="fade-up"
        data-aos-duration="500"
      >
        <span class="year-badge">{{ settings.theme_year }}</span>
        {{ settings.theme_title }}
      </p>

      <div
        class="title text-white leading-[1.05]"
        data-aos="fade-up"
        data-aos-duration="700"
      >
        A Place To
        <span class="hero-gradient-text"> Call</span>
        <br class="hidden md:block" />
        Home...
      </div>

      <div
        class="flex items-center gap-2 mt-8 text-white/75"
        data-aos="fade-up"
        data-aos-duration="900"
      >
        <img src="/images/ic-address.svg" alt="" />
        <p>{{ settings.address }}</p>
      </div>

      <div
        class="flex flex-wrap gap-4 mt-10"
        data-aos="fade-up"
        data-aos-duration="1100"
      >
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
          bg="rgba(255,255,255,0.1)"
          textColor="#ffffff"
          border="1px solid rgba(255, 255, 255, 0.3)"
        />
      </div>

      <div
        class="md:absolute bottom-0 right-0 mt-12 md:mt-0"
        data-aos="fade-left"
        data-aos-duration="1000"
      >
        <NuxtLink to="/events" class="glass-upcoming block">
          <div class="fancy-header text-white/60" style="font-size: 16px">
            {{ home.upcoming_label }}
          </div>
          <h5 class="mt-1 text-white">{{ home.upcoming_title }}</h5>
          <p class="mt-2 text-white/60 small-paragraph">
            {{ home.upcoming_subtitle }}
          </p>
          <p class="mt-3 small-paragraph text-white">See all events →</p>
        </NuxtLink>
      </div>
    </div>

    <div class="scroll-indicator">
      <div class="scroll-mouse">
        <div class="scroll-wheel"></div>
      </div>
    </div>
  </section>

  <!-- Stats strip -->
  <section class="stats-strip" data-aos="fade-up" data-aos-duration="600">
    <div v-for="(stat, i) in stats" :key="i" class="stat-group">
      <div class="stat-item">
        <div class="stat-value">{{ stat.value }}</div>
        <div class="stat-label">{{ stat.label }}</div>
      </div>
      <div v-if="i < stats.length - 1" class="stat-divider"></div>
    </div>
  </section>

  <!-- Services -->
  <section class="section-padding" data-aos="fade-up" data-aos-duration="700">
    <GodsPresence />
  </section>

  <!-- Ministries -->
  <section class="section-padding-y bg-[#2F3233] section-padding-left pr-5">
    <div class="mb-12" data-aos="fade-up" data-aos-duration="600">
      <img src="/images/ic-gap.svg" alt="" />
      <h1 class="text-white mt-8">A Place For All.</h1>
      <p class="text-[#C3C3C3] mt-3 text-[17px]">
        Discover where you belong at RPC.
      </p>
    </div>

    <div
      class="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar"
    >
      <NuxtLink
        v-for="(ministry, i) in ministries"
        :key="i"
        to="/ministries"
        class="group ministry-card snap-start flex-shrink-0 w-[80vw] h-[580px] sm:w-[48vw] md:w-[23vw] cursor-pointer relative rounded-[20px] overflow-hidden"
        :data-aos="'fade-up'"
        :data-aos-duration="700"
        :data-aos-delay="i * 100"
      >
        <img
          :src="ministry.img"
          :alt="ministry.title"
          class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />

        <div
          class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-all duration-500"
        ></div>

        <div class="absolute top-5 left-5">
          <span class="ministry-number">0{{ i + 1 }}</span>
        </div>

        <div class="absolute bottom-20 left-5 right-5">
          <h3 class="text-white text-[22px] leading-tight">
            {{ ministry.title }}
          </h3>
        </div>

        <div
          class="absolute inset-x-0 bottom-0 px-5 py-20 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500 ease-out"
          :class="ministry.bg"
          style="border-radius: 0 0 20px 20px"
        >
          <h3 class="mb-2 text-[19px]">{{ ministry.title }}</h3>
          <p class="small-paragraph leading-[1.6] opacity-90">
            {{ ministry.desc }}
          </p>
        </div>
      </NuxtLink>
    </div>
  </section>

  <section class="section-padding">
    <GladToHaveYou />
  </section>
</template>

<script setup lang="ts">
import { settings, home } from "~/utils/siteContent";

const stats = home.stats;

const ministries = [
  {
    title: "Children's Church",
    img: "/images/img-children-church-min.jpg",
    desc: "Helping children grow in their knowledge and love of God in a safe, joyful, and engaging environment.",
    bg: "bg-[#537C47]",
  },
  {
    title: "Youth Ministry",
    img: "/images/img-youths-min.jpg",
    desc: "A community of young people growing in faith, purpose, and identity in Christ.",
    bg: "bg-[#7E03AB]",
  },
  {
    title: "Men of Impact",
    img: "/images/img-men-min.jpg",
    desc: "Raising men grounded in God's Word, faithful in their calling, and leading with integrity.",
    bg: "bg-[#F28D21]",
  },
  {
    title: "Vessels of Honour",
    img: "/images/img-women-min.jpg",
    desc: "Encouraging, strengthening, and equipping women to walk in their God-given identity and purpose.",
    bg: "bg-[#AB033E]",
  },
];
</script>

<style scoped>
/* ── Hero ── */
.banner {
  background: linear-gradient(
      180deg,
      rgba(47, 50, 51, 0.6),
      rgba(47, 50, 51, 0.98)
    ),
    url(/images/bg-rpc-hero-min.jpg);
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 360px 180px 120px 180px;
}

@media (max-width: 821px) {
  .banner {
    padding: 210px 20px 120px 20px;
  }
}

/* Gradient orbs */
.orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  pointer-events: none;
  animation: orb-float 10s ease-in-out infinite;
}

.orb-blue {
  width: 520px;
  height: 520px;
  background: rgba(0, 175, 239, 0.18);
  top: -120px;
  right: -80px;
  animation-delay: 0s;
}

.orb-green {
  width: 380px;
  height: 380px;
  background: rgba(65, 181, 30, 0.14);
  bottom: -60px;
  left: 8%;
  animation-delay: -5s;
}

@keyframes orb-float {
  0%,
  100% {
    transform: translate(0, 0) scale(1);
  }
  33% {
    transform: translate(24px, -18px) scale(1.06);
  }
  66% {
    transform: translate(-12px, 12px) scale(0.96);
  }
}

/* Hero text */
.hero-gradient-text {
  background: linear-gradient(
    74deg,
    rgba(0, 175, 239, 1),
    rgba(65, 181, 30, 1)
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.year-badge {
  display: inline-block;
  font-family: "indivisible", sans-serif;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 1.5px;
  padding: 3px 10px;
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.14);
  border: 1px solid rgba(255, 255, 255, 0.25);
}

/* Glass upcoming card */
.glass-upcoming {
  background: rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 16px;
  padding: 20px 24px;
}

/* Scroll indicator */
.scroll-indicator {
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}

.scroll-mouse {
  width: 24px;
  height: 38px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 12px;
  display: flex;
  justify-content: center;
  padding-top: 6px;
}

.scroll-wheel {
  width: 3px;
  height: 8px;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 3px;
  animation: scroll-bounce 2s ease-in-out infinite;
}

@keyframes scroll-bounce {
  0%,
  100% {
    transform: translateY(0);
    opacity: 1;
  }
  50% {
    transform: translateY(7px);
    opacity: 0.35;
  }
}

/* Stats strip */
.stats-strip {
  background: #1e1f21;
  padding: 28px 180px;
  display: flex;
  align-items: center;
}

.stat-group {
  display: flex;
  align-items: center;
  flex: 1;
}

.stat-item {
  flex: 1;
  text-align: center;
}

.stat-value {
  font-family: "Albert Sans", sans-serif;
  font-weight: 900;
  font-size: 26px;
  color: #ffffff;
  line-height: 1.1;
}

.stat-label {
  font-size: 11px;
  color: #797979;
  text-transform: uppercase;
  letter-spacing: 1.2px;
  margin-top: 5px;
}

.stat-divider {
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.1);
  flex-shrink: 0;
}

@media (max-width: 821px) {
  .stats-strip {
    padding: 24px 20px;
    flex-wrap: wrap;
    gap: 0;
  }
  .stat-group {
    width: 50%;
    flex: none;
  }
  .stat-divider {
    display: none;
  }
  .stat-item {
    padding: 12px 0;
  }
}

/* Ministry cards */
.ministry-number {
  font-family: "Albert Sans", sans-serif;
  font-weight: 900;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.45);
  letter-spacing: 1.5px;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}
.no-scrollbar {
  -ms-overflow-style: none;
  scrollbar-width: none;
}
</style>
