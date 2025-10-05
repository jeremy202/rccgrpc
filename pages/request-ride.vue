<script setup lang="ts">
import Transport from "~/components/Transport.vue";
</script>

<template>
  <div class="section-padding">
    <div class="pt-[100px] block md:flex justify-between">
      <div class="w-full md:w-4/12">
        <div class="fancy-header">Transport</div>
        <div class="title">Ride to Church</div>
        <p class="mt-3">
          Fill the form to join the Church bus this Sunday. For Planning
          Purposes, it is very important that you send in your request, no later
          than 5pm before Saturday.
        </p>
      </div>
      <div class="w-full md:w-6/12">
        <Transport />
      </div>
    </div>
  </div>
</template>

<style scoped>
@media (max-width: 821px) {
  .church-bg {
    padding: 338px 20px 40px 20px;
  }
  .bg-blur {
    padding: 20px;
  }
}
</style>
