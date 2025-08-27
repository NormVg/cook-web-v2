<script setup>
const props = defineProps({
  title:{
    typeof:String,
    default:"Demo Title"
  }
})

</script>

<template>
<div class="settings-card">
  <div class="scard-title">{{ props.title }}</div>
<slot>

</slot>
</div>
</template>

<style scoped>
.settings-card{
background-color: var(--bg);
border-radius: 7px;
border: 1px solid transparent;
padding: 10px;
transition: all ease-in-out 200ms;
font-size: 15px;

  gap: 10px;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  flex-direction: column;

}

/* .settings-card:hover{
border: 1px solid var(--border);

} */

.scard-title{
  font-size: 23px;
  margin-bottom: 10px;
}
</style>
