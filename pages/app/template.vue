<template>
  <BasicSideBarPage sideBarName="COOK" :is-header-title="false" :is-page="true" :sideBarItem="appNav" currentLink="/app/template">



  </BasicSideBarPage>
</template>

<script setup>
import BasicSideBarPage from '~/components/base/BasicSideBarPage.vue';

import { appNav } from '~/config/appNav.conf';


</script>

<style>

</style>
