<template>
  <div class="ministries-banner section-padding">
    <div class="pt-[100px]" data-aos="fade-up" data-aos-duration="600">
      <div class="fancy-header">Discover</div>
      <div class="w-full md:w-4/12">
        <div class="title">Our Ministries</div>
      </div>
    </div>
  </div>

  <!-- Children's Church -->
  <section class="section-padding" data-aos="fade-up" data-aos-duration="600">
    <div class="flex flex-col md:flex-row gap-14 items-start">
      <div class="w-full md:w-1/2" data-aos="fade-right" data-aos-duration="800">
        <span class="ministry-pill" style="background: #537C47;">Children's Church</span>
        <h1 class="mt-6">Children's Church</h1>
        <div class="section-accent-line mt-4"></div>
        <p class="mt-6 leading-[1.9] text-[17px]">
          Welcome to the Children's Ministry at Restoration Power Center.
          <br /><br />
          We are passionate about helping children grow in their knowledge and love of God in a safe, joyful, and engaging environment. Through Bible-based teaching, worship, and fun activities, we aim to lay a strong spiritual foundation that helps each child understand their identity in Christ and develop a personal relationship with Him.
          <br /><br />
          Our desire is to partner with parents in raising children who love God, love others, and shine as young disciples of Jesus in their homes, school, and community.
        </p>
      </div>
      <div class="w-full md:w-1/2" data-aos="fade-left" data-aos-duration="800">
        <div class="photo-mosaic">
          <div class="mosaic-main">
            <img :src="childrenPhotos[0]" alt="Children's Church" class="mosaic-img" />
          </div>
          <div class="mosaic-grid">
            <div v-for="(photo, i) in childrenPhotos.slice(1)" :key="i" class="mosaic-cell">
              <img :src="photo" :alt="`Children's Church ${i + 2}`" class="mosaic-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Youth Ministry -->
  <section class="section-padding bg-[#F8F9FC]" data-aos="fade-up" data-aos-duration="600">
    <div class="flex flex-col md:flex-row-reverse gap-14 items-start">
      <div class="w-full md:w-1/2" data-aos="fade-left" data-aos-duration="800">
        <span class="ministry-pill" style="background: #7E03AB;">Youth Ministry</span>
        <h1 class="mt-6">Youth Ministry</h1>
        <div class="section-accent-line mt-4" style="background: linear-gradient(74deg, #7E03AB, #00AFEF);"></div>
        <p class="mt-6 leading-[1.9] text-[17px]">
          Welcome to the Youth Ministry at Restoration Power Center.
          <br /><br />
          We are a community of young people growing in faith, purpose, and identity in Christ. Our focus is to help every young person build a strong relationship with God, discover their God-given purpose, and develop the character and confidence to impact their generation.
          <br /><br />
          Through fellowship, discipleship, worship, and practical teaching, we are raising young disciples who live boldly for Christ in every area of life.
        </p>
      </div>
      <div class="w-full md:w-1/2" data-aos="fade-right" data-aos-duration="800">
        <div class="photo-mosaic">
          <div class="mosaic-main">
            <img :src="youthPhotos[0]" alt="Youth Ministry" class="mosaic-img" />
          </div>
          <div class="mosaic-grid">
            <div v-for="(photo, i) in youthPhotos.slice(1)" :key="i" class="mosaic-cell">
              <img :src="photo" :alt="`Youth Ministry ${i + 2}`" class="mosaic-img" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Men of Impact -->
  <section class="section-padding" data-aos="fade-up" data-aos-duration="600">
    <div class="flex flex-col md:flex-row gap-14 items-center">
      <div class="w-full md:w-1/2" data-aos="fade-right" data-aos-duration="800">
        <span class="ministry-pill" style="background: #F28D21;">Men's Ministry</span>
        <h1 class="mt-6">Men of Impact</h1>
        <div class="section-accent-line mt-4" style="background: linear-gradient(74deg, #F28D21, #FFD000);"></div>
        <p class="mt-6 leading-[1.9] text-[17px]">
          Welcome to the Men's Ministry at Restoration Power Center.
          <br /><br />
          We are dedicated to raising men who are grounded in God's Word, strong in faith, and faithful in their calling. Our goal is to equip men to lead with integrity in their homes, serve with excellence in the church, and be a positive influence in society.
          <br /><br />
          Through fellowship, teaching, and accountability, we encourage men to grow spiritually and live as examples of Christ in every area of life.
        </p>
      </div>
      <div class="w-full md:w-1/2" data-aos="fade-left" data-aos-duration="800">
        <div class="single-img-wrapper">
          <img
            src="/images/img-men-min.jpg"
            alt="Men of Impact"
            class="single-ministry-img"
          />
        </div>
      </div>
    </div>
  </section>

  <!-- Vessels of Honour -->
  <section class="section-padding dark-section" data-aos="fade-up" data-aos-duration="600">
    <div class="flex flex-col md:flex-row-reverse gap-14 items-center">
      <div class="w-full md:w-1/2" data-aos="fade-left" data-aos-duration="800">
        <span class="ministry-pill" style="background: #AB033E;">Women's Ministry</span>
        <h1 class="mt-6 text-white">Vessels of Honour</h1>
        <div class="section-accent-line mt-4" style="background: linear-gradient(74deg, #AB033E, #FF6B8A);"></div>
        <p class="mt-6 leading-[1.9] text-[17px] text-[#C3C3C3]">
          Welcome to the Women's Ministry at Restoration Power Center.
          <br /><br />
          This is a place where women are encouraged, strengthened, and equipped to flourish in every area of life. We are committed to nurturing spiritual growth, building strong sisterhood, and empowering women to walk in their God-given identity and purpose.
          <br /><br />
          Through prayer, fellowship, and the Word of God, we support one another in becoming godly influences in our homes, church, workplace, and community.
        </p>
      </div>
      <div class="w-full md:w-1/2" data-aos="fade-right" data-aos-duration="800">
        <div class="single-img-wrapper">
          <img
            src="/images/img-women-min.jpg"
            alt="Vessels of Honour"
            class="single-ministry-img"
          />
        </div>
      </div>
    </div>
  </section>

  <section class="section-padding">
    <GladToHaveYou />
  </section>
</template>

<script setup lang="ts">
const childrenPhotos = [
  '/images/children-church/IMG_0264.JPG',
  '/images/children-church/IMG_0265.JPG',
  '/images/children-church/IMG_0363.JPG',
  '/images/children-church/IMG_0364.JPG',
  '/images/children-church/IMG_0368.JPG',
  '/images/children-church/IMG_0369.JPG',
  '/images/children-church/IMG_0370.JPG',
];

const youthPhotos = [
  '/images/youth-church/IMG_0525.jpg',
  '/images/youth-church/IMG_0530.jpg',
  '/images/youth-church/IMG_0533.jpg',
  '/images/youth-church/IMG_0540.jpg',
  '/images/youth-church/IMG_0544.jpg',
  '/images/youth-church/IMG_3264.jpg',
  '/images/youth-church/IMG_3280.jpg',
];
</script>

<style scoped>
.ministries-banner {
  background: linear-gradient(136deg, rgba(222, 240, 255, 1), rgba(222, 255, 236, 1));
}

.dark-section {
  background: #2F3233;
}

/* Pill tag */
.ministry-pill {
  display: inline-block;
  color: white;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.8px;
  padding: 5px 18px;
  border-radius: 20px;
}

/* Accent line */
.section-accent-line {
  width: 56px;
  height: 3px;
  background: linear-gradient(74deg, rgba(0, 175, 239, 1), rgba(65, 181, 30, 1));
  border-radius: 3px;
}

/* Photo mosaic */
.photo-mosaic {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.mosaic-main {
  width: 100%;
  height: 300px;
  border-radius: 18px;
  overflow: hidden;
}

.mosaic-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.mosaic-cell {
  height: 160px;
  border-radius: 14px;
  overflow: hidden;
}

.mosaic-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.mosaic-main:hover .mosaic-img,
.mosaic-cell:hover .mosaic-img {
  transform: scale(1.07);
}

/* Single image */
.single-img-wrapper {
  position: relative;
}

.single-img-wrapper::before {
  content: '';
  position: absolute;
  inset: -10px;
  background: linear-gradient(135deg, rgba(0, 175, 239, 0.1), rgba(65, 181, 30, 0.1));
  border-radius: 28px;
  z-index: 0;
}

.single-ministry-img {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 460px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.16);
  transition: transform 0.5s ease;
}

.single-ministry-img:hover {
  transform: scale(1.02);
}
</style>
