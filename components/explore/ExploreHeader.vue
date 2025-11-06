<template>
  <div id="explore-header">
    <div id="dtb-head" >EXPLORE THE MEALS</div>
      <div id="dtb-search">
        <SearchSlash />

        <input type="text" placeholder="Search..." v-model="searchTerm" @keyup.enter="handleReturn" />
<ExploreMenu :options="types" :default-value="currentType"/>

      </div>
    <div id="dtb-sub">SHARING CODE • WRITING FASTER • FOR LAZY DEVS</div>
  </div>
</template>

<script setup>
import { SearchSlash } from "lucide-vue-next";
import ThreeDotMenu from "../common/ThreeDotMenu.vue";
import DropDownMenu from "../common/DropDownMenu.vue";

const searchTerm = ref('')

const currentType = ref('template')
const types = ref([
      { label: "Templates", value: "template" }
    ])

const handleReturn = async () => {
    await navigateTo("/explore/search?q="+searchTerm.value)



}
</script>

<style scoped>

#explore-header{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 15px;

  margin-top: 50px;
  margin-bottom: 50px;
}

#dtb-head {
  font-size: 35px;
  font-weight: 500;
  color: var(--green);
  text-align: center;
}

#dtb-sub {
  font-size: 18px;
  font-weight: 500;
  color: var(--text-secondary);
  text-align: center;
}

#dtb-search {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 7px 10px;
  background-color: var(--bg);
  gap: 10px;

  width: 70%;
}

#dtb-search input {
  background-color: var(--bg);
  border: none;
  width: 100%;
  font-weight: 500;
  color: white;
}

input:focus {
  border: none;
  outline: none;
}

@media only screen and (max-width: 768px) {
#dtb-search {
  width: calc(100% - 20px);
}

#dtb-head {
font-size: 25px;
}
}
</style>
