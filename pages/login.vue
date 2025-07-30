<template>
  <div>
    login page
  </div>
</template>

<script  setup>

onMounted(() => {
  window.location.href = "/api/sso/login";
});

</script>

<style>

</style>
