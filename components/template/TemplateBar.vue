<template>

    <div id="dt-bar">
      <div id="dtb-search">
        <SearchSlash />
        <input type="text" placeholder="Search..." v-model="SearchTextFiled" @input="onText" />
      </div>

      <div id="dtb-drop">
        <DropDownMenu
          :options="templateTypes"
          default-value="all"
          @change="handleSelectionChange"
        />
      </div>
    </div>
    </template>

<script setup>
import DropDownMenu from '../common/DropDownMenu.vue';


import { SearchSlash } from "lucide-vue-next";


const props = defineProps({
  TableData:{
    type:Array,
    default:[]
  }
})

const SearchTextFiled = ref("")


const emit = defineEmits(['changeType','changeSearch'])

const templateTypes =  computed(()=>{
  var base = [{ label: "All", value: "all" }]


  const categories = Array.from(new Set(props.TableData.map(item => item.category).filter(Boolean)));
  const options = categories.map(cat => ({
    label: cat.charAt(0).toUpperCase() + cat.slice(1),
    value: cat
  }));
  return base.concat(options);
})


const onText = () => {
  console.log(SearchTextFiled.value);

  emit('changeSearch',SearchTextFiled.value)
}


const handleSelectionChange = (value) => {
  console.log(value);
  emit('changeType',value.value)
};

</script>

<style scoped>

#dt-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 30px;
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

  width: 30%;
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

@media only screen and (max-width: 768px){

#dt-bar {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  flex-direction: column-reverse;
  margin-top: 30px;
  gap: 10px;
}

#dtb-search{
  width: calc(100% - 20px);
}
}
</style>
