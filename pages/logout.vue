<template>
  <div>user logout</div>
</template>

<script setup>
onMounted(() => {
  window.location.href = "/api/sso/auth?next=/";
});
</script>

