<template>
  <BasicSideBarPage sideBarName="COOK" :is-header-title="false" :is-page="true" :sideBarItem="appNav" currentLink="/app/settings">

    <DashboardHeader title="Settings" sub="Manage your account"/>


    <SettingsCard title="Account">
      <div id="settings-box">
        <div class="account-name">
          <span class="account-title">
            {{ cookUserRaw[0]?.name || 'N/A' }}
          </span>
        </div>
        <div class="account-username">
          @{{ cookUserRaw[0]?.username || 'N/A' }}
        </div>
        <div class="account-actions">
          <button @click="openAccount" class="account-btn">
            Open Account
          </button>
          <button @click="logout" class="account-btn logout-btn">
            <LogOut size="16px" />
            Logout
          </button>
        </div>
      </div>
    </SettingsCard>

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

const openAccount = () => {
  window.open('https://accounts.taohq.org', '_blank', 'noopener,noreferrer');
}

const logout = async () => {
  await authClient.signOut();
  await navigateTo("/");
}


</script>

<style scoped>

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

.account-name {
  font-size: 25px;
  font-weight: 600;
}

.account-title {
  color: var(--primary);
}

.account-username {
  font-size: 1rem;
  color: var(--text2);
  margin-bottom: 10px;
  opacity: 0.7;
}

.account-actions {
  display: flex;
  gap: 10px;
}

.account-btn {
  border: 1px solid var(--border);
  background-color: var(--bg2);
  color: var(--primary);
  padding: 6px 14px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 0.95rem;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: background 0.2s;
}

.account-btn:hover {
  background-color: var(--bg3);
}

.logout-btn {
  border-color: var(--red);
}

#settings-box {
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}


</style>

