<template>
    <div id="dt-head">{{props.title}}</div>

    <div id="dt-sub">{{props.sub}}</div>

</template>

<script  setup>
const props = defineProps({
  title:{
    type:String,
    default:"Dashboard"
  },
  sub:{
    type:String,
    default:"Welcome to your dashboard"
  }
})
</script>

<style scoped>
#dt-head {
  font-size: 40px;
  color: whitesmoke;
}

#dt-sub {
  font-size: 15px;
  color: var(--white);
}
</style>
