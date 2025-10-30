<template>
      <div id="info-box" >
      <div class="ib-head">Template Information</div>

      <div class="ib-info">
        version:
        <span class="ib-text">{{ props.version }}</span>
      </div>

      <div class="ib-info author-link">
        author:
        <NuxtLink :to="`/explore/user/${props.author}`" class="ib-text author-name">
          {{ props.author }}
        </NuxtLink>
      </div>

      <div class="ib-info">
        publish:
        <span class="ib-text">{{ props.date }}</span>
      </div>

      <div class="ib-info">
        category:
        <span class="ib-text">{{ props.category }}</span>
      </div>

      <div class="ib-info-card">
        stack:
        <span class="ib-card" v-for="item in props.stack" :key="item">{{
          item
        }}</span>
      </div>

      <div class="ib-info github-card">
        <NuxtLink :to="props.github">
          <Link color="#00FF87" size="15px" />
          <span class="ib-text"> GitHub Repository </span>
        </NuxtLink>
      </div>

      <div class="ib-head">Stats</div>

      <div class="ib-info">
        <Download size="18" /> downloads:
        <span class="ib-text">{{ props.downloads }}</span>
      </div>
    </div>

</template>

<script setup>
import { Download,Link } from 'lucide-vue-next';

const props = defineProps({
  version:{
    default:"1.0.0"
  },
  author:{
    default:"thenormvg"
  },
  date:{
    default:"2025-07-07"
  },
  category:{
    default:"nuxt"
  },
  stack:{
    default:['tsx','ts','py','go']
  },
  github:{
    default:"https://taohq.org"
  },
  downloads:{default:2}
})
</script>

<style scoped>

a {
  text-decoration: none;
}

.author-link {
  cursor: pointer;
}

.author-name {
  transition: opacity 0.2s ease;
}

.author-name:hover {
  opacity: 0.7;
}

.github-card:hover {
  border-bottom: 1px solid var(--green);
}

.ib-info {
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 10px;
  width: max-content;
  border-bottom: 1px solid transparent;
}

.ib-text {
  color: var(--green);
}

.ib-info-card {
  margin: 10px;
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
}

.ib-card {
  background-color: var(--bg2);
  border: 1px solid var(--border);
  border-radius: 5px;
  padding: 1px 7px;
  font-size: 13px;
  color: whitesmoke;
  /* display: flex;
  justify-content: center;
  align-items: center; */

  height: max-content;
  width: max-content;
}
.ib-head {
  color: whitesmoke;
  margin: 10px;
  font-size: 20px;
  font-weight: 600;
  margin-top: 10px;
}


#info-box {
  /* height: 100%; */
  min-height: calc(97vh - 80px);

  width: 250px;
  background-color: var(--bg);
  border: 1px solid var(--border);
  /* border: 1px solid salmon; */
  border-radius: 10px;
}

@media only screen and (max-width: 768px){
#info-box{
  width: 100%;
  min-height: max-content;
}
}
</style>
