<template>
<BasicPage :is-page="isPage" header-name="COOK">

  <main>

    <div class="main-box">
      <SearchBar/>
      <TemplateHead :version="templateData.version" :name="templateData.name" :id="templateData.id" :public="templateData.public" :date="templateData.date" />

      <div id="markdown-box">

        <MarkdownRender :md="templateData.info" />
      </div>
    </div>

    <div class="info-box">

      <SideInfo :version="templateData.version" :category="templateData.category" :public="templateData.public" :date="templateData.date" :author="templateData.author" :stack="templateData.stack" :github="templateData.github" :downloads="templateData.downloads"/>
    </div>
  </main>

</BasicPage>
</template>

<script setup>
import BasicPage from '~/components/base/BasicPage.vue';
import MarkdownRender from '~/components/common/MarkdownRender.vue';
import SearchBar from '~/components/template/SearchBar.vue';
import SideInfo from '~/components/template/SideInfo.vue';
import { useGetUser } from '~/composable/useGetUser';
import { useGetTemplate } from '~/composable/useGetTemplate';

const isPage = ref(true)
const markdown = ref('# My Template')
const route = useRoute();

const userData  = await useGetUser()

const templateData  = await useGetTemplate(route.query.uid,userData)




console.log("🚀 ~ templateData:", templateData)

</script>

<style scoped>
.main-box{
  /* border: 1px solid salmon; */
  width: 100%;
  min-height: calc(97vh - 80px);

}



main{
  display: flex;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
}


#markdown-box {
  /* border: 1px solid salmon; */
  width: 95%;
  margin-left: 25px;
  margin-top: 20px;
}

</style>
