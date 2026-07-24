<template>
  <div class="church-banner section-padding">
    <div class="pt-[100px]" data-aos="fade-up" data-aos-duration="600">
      <div class="fancy-header">About Us</div>
      <div class="w-full md:w-5/12">
        <div class="title">Our Church</div>
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
              class="w-full md:w-5/12"
              data-aos="fade-right"
              data-aos-duration="900"
            >
              <div class="pastor-img-wrapper">
                <img
                  src="/images/img-pastor.jpg"
                  class="w-full rounded-[20px] object-cover max-h-[500px]"
                  alt="Pastor Lilian & Benson Akwue"
                />
              </div>
              <h5 class="mt-5 text-center text-[#141415]">
                Pst Lilian & Benson Akwue
              </h5>
              <p class="text-center text-[#797979] mt-1 small-paragraph">
                Parish Pastors, RPC Calgary
              </p>
            </div>
            <div
              class="w-full md:w-7/12"
              data-aos="fade-left"
              data-aos-duration="900"
            >
              <div class="pastor-quote-mark">"</div>
              <p class="leading-[1.9] text-[17px] relative z-10">
                Welcome to Restoration Power Center.
                <br /><br />
                It is a joy and privilege to serve as the Parish Pastor and to
                welcome you to what God is doing in this church family. At RPC,
                we are committed to helping you grow in your relationship with
                Christ, discover the gifts God has placed within you, and serve
                with excellence as you walk in His purpose for your life.
                <br /><br />
                We believe that as we grow together, we build God's Kingdom by
                demonstrating the love of Christ in our homes, our community,
                and beyond. We are also passionate about raising disciples and
                equipping the next generation of godly leaders who will impact
                the world for Christ.
                <br /><br />
                Whether you are visiting our website for the first time or you
                are already part of our church family, my prayer is that you
                will encounter God's presence, find a place to belong, and grow
                into all that He has called you to be.
                <br /><br />
                God bless you.
              </p>
              <div class="flex items-center gap-4 mt-8">
                <div class="signature-line"></div>
                <div>
                  <div class="fancy-header" style="font-size: 22px">
                    Pst Lilian & Benson
                  </div>
                  <h5 class="mt-0 text-[#797979] font-normal">Akwue</h5>
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
      <h1 class="text-white mt-8">Church Anniversary.</h1>
      <p class="text-[#C3C3C3] mt-2">
        Celebrating God's faithfulness in our journey together.
      </p>
    </div>

    <div class="marquee-container">
      <div class="marquee-track">
        <div
          v-for="(photo, i) in anniversaryMarquee"
          :key="i"
          class="marquee-item"
        >
          <img :src="photo" :alt="`Church Anniversary`" class="marquee-img" />
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
      <div class="leadership-card" data-aos="fade-up" data-aos-duration="800">
        <div class="leadership-placeholder">
          <p class="small-paragraph text-[#aaa]">Photo coming soon</p>
        </div>
        <h4 class="mt-6">Pastor Lilian Akwue</h4>
        <div class="fancy-header mt-2" style="color: #41b51e">Lead Pastor</div>
      </div>

      <div class="leadership-card" data-aos="fade-up" data-aos-duration="950">
        <div class="leadership-placeholder">
          <p class="small-paragraph text-[#aaa]">Photo coming soon</p>
        </div>
        <h4 class="mt-6">Pastor Lawrence Omih</h4>
        <div class="fancy-header mt-2" style="color: #00afef">
          Assistant Pastor
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
      <h1 class="text-white mt-8">Life at RPC.</h1>
      <p class="text-[#C3C3C3] mt-2">
        Moments of fellowship, worship, and community together.
      </p>
    </div>

    <div class="marquee-container">
      <div class="marquee-track marquee-reverse">
        <div v-for="(photo, i) in lifeMarquee" :key="i" class="marquee-item">
          <img :src="photo" :alt="`Life at RPC`" class="marquee-img" />
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding">
    <GladToHaveYou />
  </section>
</template>

<script setup lang="ts">
const milestones = [
  {
    date: "July 2017",
    title: "The Call to Calgary",
    desc: "Pastor Seun Jonathan and his family arrive in Calgary, answering God's call with faith and obedience. Six months of prayer, planning, and preparation follow alongside the Provincial Pastor.",
  },
  {
    date: "December 31, 2017",
    title: "A Night of Hope",
    desc: "44 people gather for a crossover service into the new year — the very first gathering of Restoration Power Center. The Jonathan family, the Olowokudejo family, and Mrs. Florence Eleko were among the faithful founders.",
  },
  {
    date: "January 7, 2018",
    title: "First Sunday Service",
    desc: "The doors officially open at Crestmont Community Hall, Calgary. A small gathering of believers united by faith, purpose, and a desire to see lives transformed by the power of Jesus Christ.",
  },
  {
    date: "April 2018",
    title: "A New Home",
    desc: "Growing in faith and number, RPC moves to its current home at Victory Village, 10623 West Valley Road, SW, Calgary — a place to call home.",
  },
  {
    date: "September 16, 2018",
    title: "Official RCCG Inauguration",
    desc: 'Restoration Power Center is officially inaugurated as a multicultural parish of the Redeemed Christian Church of God (RCCG), fulfilling the divine mandate: "Taking Over the Land for Jesus."',
  },
  {
    date: "November 1, 2018",
    title: "Midweek Service Begins",
    desc: "The first official midweek service launches with a film premiere and prayer service — combining creativity with ministry to engage people in fresh and meaningful ways.",
  },
  {
    date: "2021",
    title: '"What\'s Next" Movie',
    desc: 'RPC partners with POGEM to produce the evangelistic movie "What\'s Next", using the power of storytelling to communicate the Gospel to a wider audience.',
  },
  {
    date: "September 29, 2024",
    title: "A New Chapter",
    desc: "Pastor Lilian Akwue takes the mantle of Parish Pastor, with the steadfast support of her husband, Benson Akwue — continuing to lead with wisdom, compassion, and unwavering commitment.",
  },
];

const anniversaryPhotos = [
  "/images/church-anniversary/IMG_0223.JPG",
  "/images/church-anniversary/IMG_0226.JPG",
  "/images/church-anniversary/IMG_0227.JPG",
  "/images/church-anniversary/IMG_0235.JPG",
  "/images/church-anniversary/IMG_0246.JPG",
  "/images/church-anniversary/IMG_0257.JPG",
  "/images/church-anniversary/IMG_0290.JPG",
  "/images/church-anniversary/IMG_0299.JPG",
  "/images/church-anniversary/IMG_0306.JPG",
  "/images/church-anniversary/IMG_0310.JPG",
  "/images/church-anniversary/IMG_0318.JPG",
  "/images/church-anniversary/IMG_0349.JPG",
  "/images/church-anniversary/IMG_0350.JPG",
  "/images/church-anniversary/IMG_0386.JPG",
  "/images/church-anniversary/IMG_0403.JPG",
  "/images/church-anniversary/IMG_0408.JPG",
  "/images/church-anniversary/IMG_0421.JPG",
];

const lifePhotos = [
  "/images/workers-appreciation/IMG_0116.JPG",
  "/images/workers-appreciation/IMG_0129.JPG",
  "/images/workers-appreciation/IMG_0133.JPG",
  "/images/workers-appreciation/IMG_0135.JPG",
  "/images/workers-appreciation/IMG_0145.JPG",
  "/images/workers-appreciation/IMG_0146.JPG",
  "/images/workers-appreciation/IMG_0162.JPG",
  "/images/workers-appreciation/IMG_0206.JPG",
  "/images/workers-appreciation/IMG_0230.JPG",
  "/images/randoms/IMG_0005.JPG",
  "/images/randoms/IMG_0011.JPG",
  "/images/randoms/IMG_0016.JPG",
  "/images/randoms/IMG_0024.JPG",
  "/images/randoms/IMG_0044.JPG",
  "/images/randoms/IMG_0050.JPG",
  "/images/randoms/IMG_0051.JPG",
  "/images/randoms/IMG_0052.JPG",
  "/images/randoms/IMG_0064.JPG",
];

const anniversaryMarquee = [...anniversaryPhotos, ...anniversaryPhotos];
const lifeMarquee = [...lifePhotos, ...lifePhotos];
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
  overflow: hidden;
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
