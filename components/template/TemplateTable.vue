<template>
    <div id="dt-base">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Stack</th>
            <th>Access</th>
            <th>More</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in CurrentTableData" :key="item">
            <td>
              <a :href="`/template?uid=`+item.id" :title="`@${item.category}/${item.name}`">
                @{{ item.category }}/{{ item.name }}
              </a>
            </td>
            <td class="stack-list" :title="item.stack.join(', ')">{{ item.stack.join(", ") }}</td>
            <td v-if="item.public" class="access-item-public">public</td>
            <td v-else class="access-item-private">private</td>
            <td class="dtb-btn"><ThreeDotMenu :items="DotMenuOptions" @action="handleMenuAction" :comp="item"/></td>
          </tr>
        </tbody>
      </table>
    </div>
    <LoadingToast :is-loading-visible="isLoading"/>
</template>

<script  setup>

import { useUpdateTemplate } from '~/composable/useUpdateTemplate';
import ThreeDotMenu from '../common/ThreeDotMenu.vue';
import LoadingToast from '../pop/LoadingToast.vue';

const props = defineProps({
  CurrentTableData: {
    type: Array,
    default:[]
  }
})

const emit = defineEmits(['currentTableData']);

const isLoading = ref(false);

const DotMenuOptions = [
  { id: 'open', label: 'Open', action: 'handleOpen' },
  { id: 'share', label: 'Share', action: 'handleShare' },
  { id: 'toggleAccess', label: 'Toggle Access', action: 'handleToggleAccess' },
  // { id: 'download', label: 'Download', action: 'handleDownload' },
  { id: 'delete', label: 'Delete', action: 'handleDelete' }
];

function handleOpen(item) {
  // window.location.href = `/template?uid=${item.id}`;

  window.open(`${window.location.origin}/template?uid=${item.id}`, '_blank', 'noopener,noreferrer');

}


function handleShare(item) {
  copyText(`${window.location.origin}/template?uid=${item.id}`);
  // navigator.clipboard.writeText(`${window.location.origin}/template?uid=${item.id}`);
}

const handleToggleAccess = async (item) => {
  isLoading.value = true;
  await useUpdateTemplate(item.id, { public: !item.public });
  await emit('currentTableData');
  setTimeout(() => {
    isLoading.value = false;
  }, 1000);
}

const handleMenuAction = async ({action,item}) => {
  // console.log(props);


  switch (action) {
    case 'handleOpen':
      handleOpen(item);
      break;
    case 'handleShare':
      handleShare(item);
      break;
    case 'handleToggleAccess':
      await handleToggleAccess(item);
      break;
    case 'handleDownload':
      await handleDownload(item);
      break;
    case 'handleDelete':
      await handleDelete(item);
      break;
    default:
      break;
  }
};

</script>

<style scoped>

.stack-list{
  max-width: 200px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.access-item-public{
  color: var(--green);
}


.access-item-private{
  color: var(--pink);
}

a{
  text-decoration: none;
  border-bottom:1px solid transparent ;

}

a:hover{
  border-bottom:1px solid var(--red) ;
}

#dt-base {
  color: var(--white);
  background-color: var(--bg);
  border-radius: 10px;
  min-height: 350px;
  height: 60vh;
  overflow-y: scroll;
  margin-top: 10px;
  border: 1px solid var(--border);
}

table {
  width: 100%;
  /* height: 100%; */
  border-collapse: collapse;
}

/* thead{
  border: 1px solid salmon;

}

tbody{
  border: 1px solid seagreen;

} */

tr {
  height: 35px;

  border-bottom: 1px solid var(--border);
}

tbody {
  overflow-y: scroll;
}

th {
  text-align: left;
  padding-left: 15px;
  max-height: 35px;
  min-height: 35px;

  position: sticky;
  top: 0;
  z-index: 2;
  background-color: var(--bg);
}

td {
  height: 40px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-left: 15px;
}


.dtb-btn-head {
  text-align: right;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
}

.dtb-btn {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-right: 15px;
}
</style>
