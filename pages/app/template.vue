<template>
  <BasicSideBarPage sideBarName="COOK" :is-header-title="false" :is-page="true" :sideBarItem="appNav" currentLink="/app/template" :is-footer="false">


    <DashboardHeader title="Templates" sub="Manage your templates here. You can create, edit, and delete templates as needed."/>

    <TemplateBar :-table-data="templateList" @change-type="onTypeChange" @changeSearch="onSearchChange" />
    <TemplateTable :-current-table-data="templateListFinal" @currentTableData="updateTemplateList"/>

  </BasicSideBarPage>
</template>

<script setup>
import BasicSideBarPage from '~/components/base/BasicSideBarPage.vue';
import DashboardHeader from '~/components/common/DashboardHeader.vue';
import TemplateBar from '~/components/template/TemplateBar.vue';
import { useGetUser } from '~/composable/useGetUser';
import { useUserTemplateList } from '~/composable/useUserTemplateList';

import { appNav } from '~/config/appNav.conf';
import { useFuse
 } from '@vueuse/integrations/useFuse'

const userData = await useGetUser()

const templateList = ref([])

const templateSearchString = ref('')

const templateListType = ref('all')

const templateListRaw = await useUserTemplateList(userData)
templateList.value = templateListRaw

const updateTemplateList = async () => {
  const templateListRaw = await useUserTemplateList(userData)
  templateList.value = templateListRaw

  // Logic to update the template list, e.g., re-fetch from the server
}

const onSearchChange = (item)=>{
  templateSearchString.value = item
}

const onTypeChange = async (type) => {
  templateListType.value = type

}
console.log(templateList);


const templateListFinal = computed(()=>{

  // const templates = templateStore.allActiveTemplates;


  const templatesOverTypes =  templateList.value.filter(template => {
    return templateListType.value === 'all' || template.category === templateListType.value;
  });

  if (templateSearchString.value === ''){
    return templatesOverTypes
  }else{
      const searchList = templatesOverTypes.map((item) => ({
    item,
    searchKey: `@${item.category}/${item.name}`,
  }));

  const searchData = searchList.map((entry) => entry.searchKey);

  const { results } = useFuse(templateSearchString.value, searchData);

  const matchedItems = results.value.map((res) => {
    const match = searchList.find((entry) => entry.searchKey === res.item);
    return match?.item;
  });


  return matchedItems



  }

})

</script>

<style>

</style>
