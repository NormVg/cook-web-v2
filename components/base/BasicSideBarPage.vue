<script setup>
import "~/assets/github-markdown-dark.css";
// import MarkdownRender from "~/components/MarkdownRender.vue";
import BasicNotFound from "./BasicNotFound.vue";
import BasicHeader from "./BasicHeader.vue";
import BasicFooter from "./BasicFooter.vue";
import BasicSideBarHeader from "./BasicSideBarHeader.vue";
import SideBarCard from "../card/SideBarCard.vue";
import { CircleX } from "lucide-vue-next";

// import logo from "~/assets/img/logo.svg";
const props = defineProps({
  isPage: {
    default: false
  },
  sideBarName:{
    default:"SideVar"
  },
  sideBarItem:{
    default:[
      {
        name:"Item 01",
        link:""
      },
      {
        name:"Item 02",
        link:""
      },
      {
        name:"Item 03",
        link:""
      },
  ]
  },
  currentLink:{
    default:""
  },
  isHeaderTitle:{
    default:true
  }
});

const { isMobile } = useDevice()
console.log("🚀 ~ isMobile:", isMobile)

const isSideBar = ref(true)

if (isMobile){
  isSideBar.value = false
}

const toggleSideBar = () => {
    isSideBar.value = !isSideBar.value
}

</script>

<template>
  <div id="con-box">
    <Transition name="slide-fade">
    <div id="sidebar-box" v-if="isSideBar">

      <div>

        <div id="sb-head" class="sb-head-phone" >{{ props.sideBarName }} <CircleX @click="toggleSideBar"  /></div>
        <div id="sb-head" class="sb-head-desk" >{{ props.sideBarName }} </div>

      </div>
      <div id="sb-list">

        <SideBarCard v-for="item in props.sideBarItem" :key="item.id" :name="item.name" :link="item.link" :currentLink="props.currentLink" :icon="item.icon"/>


      </div>
    </div>
    </Transition>
  <div id="sp-box">

    <BasicSideBarHeader :isSidebar="isSideBar" :callback="toggleSideBar"  :isTitle="props.isHeaderTitle"/>
    <!-- <BasicHeader/> -->
  <div id="temp-box">



    <div id="main-box" v-if="!isPage">
      <!-- <EqualNot size="60px" color="#c63c3c"/> -->

      <BasicNotFound/>
        <BasicFooter/>

    </div>

    <div id="main-box" v-if="isPage">
        <slot></slot>
        <BasicFooter/>
    </div>


  </div>
        <!-- <BasicFooter/> -->
  </div>
  </div>

</template>

<style scoped>


#con-box{
  display: flex;
  flex-direction: row;
  justify-content: stretch;
  align-items: flex-start;
  /* border: 1px solid salmon; */
}

#sp-box{
  width: 100%;
}
#sidebar-box {
  width: 20%;
  /* z-index: 10; */
  min-height: calc(98vh - 10px);
  /* border: 1px solid var(--white); */
  background-color: var(--bg2);
  border-radius: 10px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  gap: 10px;
  flex-direction: column;
  padding: 0 10px;
  padding-top: 10px;

  margin-left: 10px;
  border: 1px solid transparent;
  transition: all ease-in-out 200ms;
  position: sticky;
  top: 0px;
  /* margin-top: 0px; */
}

#sidebar-box:hover {
  border: 1px solid var(--border);
}

#sb-head{
  color: var(--green);
  font-size: 17px;
  margin-left: 10px;
  margin-top: 2px;
  /* border: 1px solid var(--red); */

  /* margin-top: 20px; */
}

#sb-list{
margin-left: 10px;
margin-top: 20px;
display: flex;
flex-direction: column;
align-items: flex-start;
justify-content: flex-start;
gap:10px
}

#main-box {
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: flex-start;
  align-items: stretch;
  /* border: 1px solid salmon; */

}


#temp-box {
  min-height: calc(97vh - 80px);
  /* width: 100%; */
  display: flex;

  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  /* gap: 10px; */
  padding: 15px;
  border-radius: 10px;
  background-color: var(--bg2);
  border: 1px solid transparent;
  transition: all ease-in-out 200ms;
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  margin-bottom: 3px;
}

#temp-box:hover {
  border: 1px solid var(--border);
}





.sb-head-phone{
  display: none;
}

.sb-head-desk{
  display: block;
}

@media only screen and (max-width: 768px) {
#sidebar-box {
  width: 80vw;
  position: fixed;

  top: 85px;
  left: 50%;
  transform: translateX(-50%);
  margin-left: 0px;
  min-height: calc(80vh - 10px);

  z-index: 10;
  background-color: var(--bg);
  overflow-y: auto;
  border: 1px solid var(--border);
}


#temp-box {


  margin-left: 0px;
  margin-right: 0px;

}


#sb-head{
  color: var(--green);
  font-size: 35px;
  margin-left: 20px;
  margin-top: 20px;
  /* border: 1px solid var(--red); */

  /* margin-top: 20px; */
}

#sb-list{
margin-left: 20px;
margin-top: 20px;
}


.sb-head-phone{
  display: block;
}

.sb-head-desk{
  display: none;
}

}


.slide-fade-enter-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}
</style>
