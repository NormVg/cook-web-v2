<script setup>
const props = defineProps({

  headerName : {
    default:"TheAlphaOnes"
  }
});
</script>

<template>

  <div id="template-header">
    <div id="th-brand">
      <div v-if="props.headerName === 'TheAlphaOnes'" class="th-brand-or">
        <!-- <img :src="logo" alt="" /> -->
        TheAlphaOnes
      </div>
      <div v-else class="th-brand-cus">
        {{ headerName }}
      </div>

    </div>

    <div id="nav-links">
      <NuxtLink to="/" class="nav-link"> Home </NuxtLink>

      <!-- <NuxtLink to="/" class="nav-link"> Docs </NuxtLink> -->

      <NuxtLink to="https://discord.gg/BafRxadauZ" class="nav-link"> Community </NuxtLink>
    </div>
  </div>
</template>

<style scoped>

#template-header {
  /* width: 100%; */
  height: 40px;
  background-color: var(--bg2);
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 3px 20px;
  margin-right: 10px;
  margin-left: 10px;
  border: 1px solid transparent;
  transition: all ease-in-out 200ms;
}

#th-brand {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  /* border: 1px solid saddlebrown; */
}




#th-brand img {
  height: 35px;
}

.th-brand-or {
  display: flex;
  justify-content: center;
  align-items: center;
  color: whitesmoke;
  font-family: var(--font-ital);
  /* font-weight: 500; */
  font-size: 30px;
  gap: 10px;
}

.th-brand-cus{
  font-family: var(--font-k2d);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--theme-color);
  /* font-weight: 500; */
  font-size: 23px;
  gap: 10px;
}


#template-header:hover {
  border: 1px solid var(--border);
}

#nav-links {
  display: flex;
  gap: 20px;
}

.nav-link {
  color: var(--white);
  text-decoration: none;
  font-size: 16px;
  font-weight: 500;
  border-bottom: 2px solid transparent;
  transition: all 200ms ease-in-out;
}

.nav-link:hover {
  border-bottom: 2px solid var(--red);
}

@media only screen and (max-width: 768px) {
#th-brand div {
  font-size: 25px;

}

#template-header {
  /* width: 100%; */

  padding: 3px 20px;
  margin-right: 0px;
  margin-left: 0px;

}
}



</style>
