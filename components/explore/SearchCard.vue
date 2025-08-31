<template>
  <div class="e-card" :title="props.name" @click="openLink(props.link)">
    <main>

      <div class="ecard-head">
        <div class="ecard-name" :title="props.name">{{props.name}}</div>
        <div class="ecard-type" :title="props.type">{{props.type}}</div>

      </div>
      <div class="ecards-body" >
        <div v-for="(item, index) in props.items" :key="index" class="ecard-item">{{item}}</div>
      </div>
    </main>

    <main class="ecard-info">
      <div>
        <Download size="14" />
        Downloads: {{ props.downloads }}
      </div>
      <div class="ecard-info-2">
        <span>

          <span>
            version: {{ props.version }}
          </span> •
          <span>
            author: {{ props.author }}
          </span> •
          <span>
            published: {{ props.published }}
          </span>
        </span>
      </div>
    </main>
    </div>
</template>

<script setup>
import { Download,Link } from 'lucide-vue-next';

const props = defineProps({
  name: {
    type: String,
    default: '@nuxt/nuxt-pinia-dizzle'
  },
  type: {
    type: String,
    default: 'template'
  },
  items: {
    type: Array,
    default: () => ['item 1', 'item 2', 'item 3', 'item 2', 'item 3']
  },
  downloads: {
    type: Number,
    default: 1234
  },
  link: {
    type: String,
    default: 'https://www.npmjs.com/package/@nuxt/nuxt-pinia-dizzle'
  },
  version: {
    type: String,
    default: '1.0.0'
  },
  author: {
    type: String,
    default: 'unknown'
  },
  published: {
    type: String,
    default: '2024/01/01'
  }
});

const openLink = (url) => {
  if (url) {
    window.open(url, '_blank');
  }
}

</script>

<style scoped>
.e-card{
  background-color: var(--bg);
  /* aspect-ratio: 300 / 100; */
  width: 100%;
  height: 90px;
  border-radius: 10px;
  border: 1px solid var(--border);
  margin-right: 10px;
  margin-bottom: 10px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  cursor: pointer;
  transition: all 0.3s ease;
}

.e-card:hover{
  border: 1px solid var(--fg2);
}

.ecard-info{
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-end;
  padding: 10px;
  font-size: 14px;
  font-weight: 300;
  color: var(--text2);

}

.ecard-info div{
  display: flex;
  align-items: center;
  gap: 5px;
}



.ecard-head{
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 10px;
  padding-top: 15px;
}

.ecard-name{
  font-weight: 600;
  font-size: 18px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.ecard-type{
  font-size: 13px;
  color: var(--pink);
  padding: 2px 5px;
  border-radius: 7px;
  border: 1px solid var(--pink);
  font-weight: 300;

}

.ecards-body{
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 5px;
  padding: 10px;

  padding-top: 5px;
  overflow-x:auto;
  scrollbar-width: none;
}

.ecard-item{
  background-color: var(--bg2);
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;

}
@media only screen and (max-width: 768px) {
main{
  width: 100%;
}

.e-card{
  flex-direction: column;
  height: max-content;
}
.ecard-info {
  align-items: flex-start;
  padding:  10px;
padding-top: 5px;
  width: 100%;

}



.ecard-info-2 span{
  display: none;
  height: 10px;
  width: 100%;
}
}
</style>
