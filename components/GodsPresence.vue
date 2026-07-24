<template>
  <img src="/images/ic-gap.svg" alt="" data-aos="fade-up" data-aos-duration="600" />
  <h1 class="mt-6" data-aos="fade-up" data-aos-duration="700">
    Join Us In God's Presence.
  </h1>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-12">
    <div class="space-y-6">
      <div class="service-card" data-aos="fade-up" data-aos-duration="800">
        <div class="service-time">
          <span class="service-clock">10:00</span>
          <span class="service-ampm">AM</span>
        </div>
        <div class="flex-grow">
          <p class="fancy-header" style="color: #00AFEF;">Worship Service</p>
          <div class="big-paragraph indivisible-bold mt-1 text-[#1E1F21]">
            Sundays (In-Person + Online)
          </div>
          <p class="mt-2 text-[#797979] small-paragraph">
            10623 West Valley Road, SW, Calgary AB. T3B 5T2
          </p>
        </div>
      </div>

      <div class="service-card" data-aos="fade-up" data-aos-duration="950">
        <div class="service-time service-time-green">
          <span class="service-clock">7:30</span>
          <span class="service-ampm">PM</span>
        </div>
        <div class="flex-grow">
          <p class="fancy-header" style="color: #41B51E;">Mid-week Service</p>
          <div class="big-paragraph indivisible-bold mt-1 text-[#1E1F21]">
            Thursdays (Online)
          </div>
          <p class="mt-2 text-[#797979] small-paragraph">On Zoom</p>
        </div>
      </div>

      <div
        class="flex flex-col sm:flex-row gap-4"
        data-aos="fade-up"
        data-aos-duration="1100"
      >
        <Button
          to="/request-ride"
          label="Request a ride"
          bg="linear-gradient(74deg, rgba(0, 175, 239, 1), rgba(65, 181, 30, 1))"
          textColor="#ffffff"
          border="none"
          iconImage="/images/ic-btn-arrow-w.svg"
        />
        <Button
          to="/live"
          label="Join online"
          bg="#1E1F21"
          textColor="#ffffff"
          border="none"
        />
      </div>
    </div>

    <div class="images-grid" data-aos="fade-up" data-aos-duration="900">
      <img
        src="/images/img-worship-min.jpg"
        alt="Church service"
        class="grid-img grid-img-1"
      />
      <img
        src="/images/img-worship-2-min.jpg"
        alt="Worship gathering"
        class="grid-img grid-img-2"
      />
    </div>
  </div>
</template>

<style scoped>
.service-card {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 24px;
  border-radius: 18px;
  background: #f8f9fb;
  border: 1px solid #eeeff2;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.08);
  background: #ffffff;
}

.service-time {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 175, 239, 0.1), rgba(65, 181, 30, 0.1));
  border: 1.5px solid rgba(0, 175, 239, 0.2);
  border-radius: 14px;
  padding: 14px 18px;
  min-width: 72px;
}

.service-time-green {
  background: linear-gradient(135deg, rgba(65, 181, 30, 0.1), rgba(0, 175, 239, 0.06));
  border-color: rgba(65, 181, 30, 0.25);
}

.service-clock {
  font-family: "Albert Sans", sans-serif;
  font-weight: 900;
  font-size: 20px;
  color: #1E1F21;
  line-height: 1;
}

.service-ampm {
  font-size: 10px;
  font-weight: 700;
  color: #aaa;
  margin-top: 4px;
  letter-spacing: 0.5px;
}

.images-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}

.grid-img {
  width: 100%;
  height: 280px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.grid-img-1 {
  margin-top: 0;
}

.grid-img-2 {
  margin-top: 40px;
}

.grid-img:hover {
  transform: scale(1.03) rotate(-1deg);
  box-shadow: 0 16px 48px rgba(0, 0, 0, 0.18);
}

.grid-img-2:hover {
  transform: scale(1.03) rotate(1deg);
}
</style>
