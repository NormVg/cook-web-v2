<template>
  <div id="explore-header">
    <div id="dtb-head" >SEARCH FOR MEALS</div>
      <div id="dtb-search">
        <SearchSlash />
        <input
          type="text"
          placeholder="Search..."
          v-model="searchQuerry"
          @keyup.enter="handleReturn"
        />
<ExploreMenu :options="types" :default-value="currentType"/>
      </div>
  </div>
</template>

<script setup>
import { SearchSlash } from "lucide-vue-next";
import { useSearchTemplate } from "~/composable/useSearchTemplate";

const route = useRoute();

const router = useRouter();

const searchQuerry = ref('')

const searchTemplates = defineModel('search-temp')

searchQuerry.value = route.query.q || ''

const searchTemplateRaw  = await useSearchTemplate(searchQuerry.value)

searchTemplates.value = searchTemplateRaw


const handleReturn = async () => {
  // route.query.q = searchQuerry.value
  router.push({ path: route.path, query: { q: searchQuerry.value } })
  const searchTemplateRaw  = await useSearchTemplate(searchQuerry.value)

  searchTemplates.value = searchTemplateRaw

}

const currentType = ref('template')
const types = ref([
      { label: "Templates", value: "template" }
    ])



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




