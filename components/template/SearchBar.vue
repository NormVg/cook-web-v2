<template>
      <div id="dtb-search">
        <SearchSlash />
        <input
          type="text"
          placeholder="Search..."
          v-model="SearchTextFiled"
          @keydown.enter="searchTemplate"
        />
      </div>

</template>

<script  setup>
import { SearchSlash } from 'lucide-vue-next';

const SearchTextFiled = ref('')


const searchTemplate = async () => {
    await navigateTo("/explore/search?text="+SearchTextFiled.value)

}
</script>

<style scoped>

#dtb-search {
  display: flex;
  align-items: center;
  justify-content: flex-start;

  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 7px 10px;
  background-color: var(--bg);
  gap: 10px;

  /* width: 90%; */
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
</style>
