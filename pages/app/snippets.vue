<template>
  <BasicSideBarPage
    sideBarName="COOK"
    :is-header-title="false"
    :is-page="true"
    :sideBarItem="appNav"
    currentLink="/app/snippets"
  >
      <div class="soon-wrapper">
    <div class="soon-box">
      <div class="soon-line">prompts book</div>
      <div class="soon-subtle">coming soon</div>
    </div>
    <div class="construction-tape">

      <ConstructionTape/>
    </div>
  </div>

  </BasicSideBarPage>
</template>

<script setup>
import BasicSideBarPage from "~/components/base/BasicSideBarPage.vue";
import ConstructionTape from '~/components/common/ConstructionTape.vue';
import { appNav } from '~/config/appNav.conf';

</script>
<style scoped>
.soon-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  font-family: var(--font-mont);
  background-color: var(--bg2);
  padding: 20px;

}

.soon-box {
  text-align: center;
  padding: 10px 20px;

}

.soon-line {
  font-size: 24px;
  font-weight: 500;
  color: var(--white);
  margin-bottom: 10px;
}

.soon-subtle {
  font-size: 14px;
  color: var(--fg2);
  opacity: 0.4;
  letter-spacing: 1px;
}


</style>

