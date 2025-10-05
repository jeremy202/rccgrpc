<template>
  <img src="/images/ic-gap.svg" alt="" />
  <h1 class="mt-6" data-aos="fade-up" data-aos-duration="1000">
    Join Us In God’s Presence.
  </h1>
  <div
    class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mt-12"
  >
    <div class="space-y-10">
      <div class="flex space-x-6" data-aos="fade-up" data-aos-duration="1200">
        <div
          class="flex-shrink-0 time-stamp text-white p-[4px] rounded-[6px] self-start"
        >
          10.00AM
        </div>
        <div class="flex-grow text-[#1E1F21]">
          <p class="fancy-header">Worship Service</p>
          <div class="big-paragraph indivisible-bold mt-1">
            Sundays (In-Person + Online)
          </div>
          <p class="mt-2">10623 West Valley Road, SW, Calgary AB. T3B 5T2</p>
        </div>
      </div>

      <div class="flex space-x-6" data-aos="fade-up" data-aos-duration="1400">
        <div
          class="flex-shrink-0 time-stamp text-white p-[4px] rounded-[6px] self-start"
        >
          07.30 PM
        </div>
        <div class="flex-grow text-[#1E1F21]">
          <p class="fancy-header">Mid-week Service</p>
          <div class="big-paragraph indivisible-bold mt-1">
            Thursdays (Online)
          </div>
          <p class="mt-2">On Zoom</p>
        </div>
      </div>
      <div
        class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4"
        data-aos="fade-up"
        data-aos-duration="1600"
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
          bg="#4A4B4D"
          textColor="#ffffff"
          border="none"
        />
      </div>
    </div>
    <div class="grid grid-cols-2 gap-4">
      <img
        data-aos="fade-up"
        data-aos-duration="1800"
        src="/images/img-worship-min.jpg"
        alt="Church members smiling"
        class="w-full h-auto object-cover rounded-[12px] transition transform hover:scale-[1.02] duration-300 cursor-pointer"
      />
      <!-- Image 2 -->
      <img
        data-aos="fade-up"
        data-aos-duration="2000"
        src="/images/img-worship-2-min.jpg"
        alt="People interacting happily"
        class="w-full h-full object-cover rounded-[12px] transition transform hover:scale-[1.02] duration-300 cursor-pointer"
      />
    </div>
  </div>
</template>

<style scoped>
.time-stamp {
  background: linear-gradient(
    250deg,
    rgba(20, 20, 21, 1),
    rgba(121, 121, 121, 1)
  );
}
</style>
