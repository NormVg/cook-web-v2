<script setup></script>

<template>
  <div id="footer-box">
    <div id="footer-head">COOK</div>

    <div id="footer-nav">
      <a href="https://x.com/TheNormVg" class="footer-nav-item">TWITTER/X</a>
      <a href="https://github.com/TheAlphaOnes/cook" class="footer-nav-item">GITHUB</a>
      <a href="https://youtube.com/@thenormvg" class="footer-nav-item">YOUTUBE</a>
    </div>

    <div id="footer-sub">
      © 2025 COOK CLI. All rights reserved. <br />
      Powered by
      <a href="https://thealphaones.com" target="_blank" class="footer-link">TheAlphaOnes</a>
    </div>
  </div>
</template>

<style scoped>
#footer-box {
  color: #fff;
  padding: 20px;
  text-align: center;
  font-family: var(--font);
  /* border-top: 5px solid var(--white);
  border-bottom: 5px solid var(--white); */
  margin: 30px 0px;
  /* margin-top: 200px; */
}

#footer-head {
  font-size: 30px;
  font-weight: bold;
  margin-bottom: 10px;
  color: var(--green);
}

#footer-nav {
  display: flex;
  justify-content: center;
  gap: 45px;
  margin-bottom: 10px;
}

.footer-nav-item {
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  color: whitesmoke;
  text-decoration: none;
  border-bottom: 1px solid var(--bg2);
}

.footer-nav-item:hover {
  /* border-bottom: 1px solid var(--red); */
    background-color: var(--green);
  color: var(--bg);
}

#footer-sub {
  font-size: 11px;
  margin-top: 20px;
  color: var(--white);
  line-height: 30px;
}

.footer-link {
  color: var(--blue);
  font-family: var(--font-ital);
  font-size: 25px;
  text-decoration: none;
  font-weight: bold;
  transition: color 0.3s ease;
}

.footer-link:hover {
  color: var(--red);
}
</style>
