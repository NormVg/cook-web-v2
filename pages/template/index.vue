<template>
  <BasicPage :is-page="isPage" header-name="COOK">
    <main>
      <div class="main-box">
        <SearchBar />
        <TemplateHead
          :version="templateData.version"
          :name="templateData.name"
          :id="templateData.id"
          :public="templateData.public"
          :date="templateData.date"
        />

        <div id="markdown-box">
          <MarkdownRender :md="templateData.info" />
        </div>
      </div>

      <div class="info-box">
        <SideInfo
          :version="templateData.version"
          :category="templateData.category"
          :public="templateData.public"
          :date="templateData.date"
          :author="templateData.author"
          :stack="templateData.stack"
          :github="templateData.github"
          :downloads="templateData.downloads"
        />
      </div>
    </main>
  </BasicPage>
</template>

<script setup>
import BasicPage from "~/components/base/BasicPage.vue";
import MarkdownRender from "~/components/common/MarkdownRender.vue";
import SearchBar from "~/components/template/SearchBar.vue";
import SideInfo from "~/components/template/SideInfo.vue";
import { useGetUser } from "~/composable/useGetUser";
import { useGetTemplate } from "~/composable/useGetTemplate";
import { useIsSession } from "~/composable/useIsSession";
import { useGetPublicTemplate } from "~/composable/useGetPublicTemplate";

const isPage = ref(true);
const markdown = ref("# My Template");
const route = useRoute();

const isSession = await useIsSession();

const userData = await useGetUser();

console.log(userData, "🚀 ~ userData:", userData);

const templateData = ref({
  id: "loading...",
  name: "loading...",
  version: "loading...",
  public: false,
  date: "loading...",
  info: "# Loading...",
  category: "loading...",
});

if (isSession) {
  console.log("User is logged in");

  const templateDataRaw = await useGetTemplate(route.query.uid, userData);
  if (templateDataRaw.length === 0) {

    const templateDataPublicRaw = await useGetPublicTemplate(route.query.uid);

  if (templateDataPublicRaw.length === 0) {
    isPage.value = false;
  }
    templateData.value = templateDataPublicRaw[0];


  }

  templateData.value = templateDataRaw[0];
} else {
  const templateDataRaw = await useGetPublicTemplate(route.query.uid);

  if (templateDataRaw.length === 0) {
    isPage.value = false;
  }

  templateData.value = templateDataRaw[0];

  console.log(templateDataRaw, "🚀 ~ templateDataRaw:", templateDataRaw);

  console.log("User is not logged in");
}

// console.log("🚀 ~ templateData:", templateData)
</script>

<style scoped>
.main-box {
  /* border: 1px solid salmon; */
  width: 100%;
  min-height: calc(97vh - 80px);
}

main {
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


@media only screen and (max-width: 768px){
  main{
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
  }

  #markdown-box{
    width: 100%;
    margin-left: 0;
  }
}
</style>
