<template>

  <div id="loader-screen-box" >
    <img :src="CookLogo" alt="cook-logo-svg" />

    <div id="lsb-marquee">
      <div class="marquee-track">
        <div class="marquee-content">
          <span>01010100000100001</span>
          <span>11000010101000001</span>
          <span>11100100100010101</span>
          <span>11111101010101111</span>
          <span>01010100101011010</span>
          <span>11110101111100001</span>
          <span>11111010101011111</span>
          <span>10101000110101000</span>
          <span>11110101001010001</span>
          <span>00101001110010101</span>
          <span>01010101001001110</span>
          <span>01100011100011100</span>
        </div>
        <!-- duplicate for infinite loop -->
        <div class="marquee-content">
          <span>01010100000100001</span>
          <span>11000010101000001</span>
          <span>11100100100010101</span>
          <span>11111101010101111</span>
          <span>01010100101011010</span>
          <span>11110101111100001</span>
          <span>11111010101011111</span>
          <span>10101000110101000</span>
          <span>11110101001010001</span>
          <span>00101001110010101</span>
          <span>01010101001001110</span>
          <span>01100011100011100</span>
        </div>
      </div>
    </div>
  </div>

</template>


<script  setup>
import CookLogo from "~/assets/img/logo.svg";
</script>

<style scoped>
#loader-screen-box {
  position: fixed;
  top: 0;
  left: 0;
  width: 99.5vw;
  height: 99vh;
  background-color: #1a1a1a70;
  backdrop-filter: blur(5px);
  z-index: 10000;
  /* border: 1px solid salmon; */
}

img {
  height: 12%;
  margin-top: 7px;
  backdrop-filter: blur(50px);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 100000;
}

#lsb-marquee {
  position: fixed;
  top: 50%;
  left: 0%;
  transform: translateY(-50%);
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: scroll-left 20s linear infinite;
}

.marquee-content {
  display: flex;
}

span {
  color: var(--green);
  font-family: monospace;
  font-size: 1.1rem;
  letter-spacing: 4px;
}

@keyframes scroll-left {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-50%);
  }
}


.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
