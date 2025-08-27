<template>
  <BasicSideBarPage sideBarName="COOK" :is-header-title="false" :is-page="true" :sideBarItem="appNav" currentLink="/app/settings">

    <DashboardHeader title="Settings" sub="Manage your account"/>


  <SettingsCard title="CLI Connection Key">
      <div id="key-comp">
        {{ ConnectionKey
          ? ConnectionKey.slice(0, 25) +
            '*'.repeat(
              Math.min(
                45,
                ConnectionKey.length - 25
              )
            )
          : ''
        }}
      </div>

      <div id="kc-btns">
        <div @click="CopyKey()">
          <Copy size="18px" />
          COPY
        </div>
        <div @click="reNewKeys()">
          <RotateCcwKey size="18px" />
          RENEW
        </div>
      </div>
  </SettingsCard>

  </BasicSideBarPage>
</template>


<script setup>
import BasicSideBarPage from '~/components/base/BasicSideBarPage.vue';
import ConstructionTape from '~/components/common/ConstructionTape.vue';
import SettingsCard from '~/components/settings/settings-card.vue';
import { useCookUser } from '~/composable/useCookUser';
import { useGetUser } from '~/composable/useGetUser';
import { appNav } from '~/config/appNav.conf';
import { LogOut, Copy, RotateCcwKey } from "lucide-vue-next";
import { useRenewConKey } from '~/composable/useRenewConKey';
import DashboardHeader from '~/components/common/DashboardHeader.vue';


const ConnectionKey = ref('********************')

const userData = await useGetUser()
const cookUserRaw = await useCookUser(userData)

ConnectionKey.value = cookUserRaw[0]?.connectionKey || '********************'
// const cookUser = cookUserRaw[0]


const CopyKey = () => {
  copyText(ConnectionKey.value)
};


const reNewKeys = async () => {
  const newKey = await useRenewConKey(cookUserRaw[0])
  ConnectionKey.value = newKey || '********************'
};

</script>

<style scoped>
#settings-box {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  gap: 15px;
}

#key-comp {
  font-family: monospace;
  border: 1px solid var(--border);
  width: max-content;
  max-width: calc(100% - 20px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding: 5px 10px;
  border-radius: 5px;
  background-color: var(--bg2);
  /* max-width: 20%; */

}

#kc-btns {
  display: flex;
  gap: 10px;
}

#kc-btns div {
  border: 1px solid var(--border);
  border-radius: 5px;
  background-color: var(--bg2);
  padding: 5px 10px;
  user-select: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
}

#kc-btns div:hover {
  background-color: var(--bg3);
}

#kc-btns div:active {
  background-color: var(--bg);
}


</style>
