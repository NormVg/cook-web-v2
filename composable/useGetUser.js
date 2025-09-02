import { useTaoUserStore } from "~/strore/useTaoUserStore";

export const useGetUser = async () => {

  const taoUserStore = useTaoUserStore()

  if (taoUserStore.userTaoData.length === 0) {


    const { data: userData } = await useFetch(`/api/v2/user/tao-user`);

    console.log("🚀 ~ getTemplateData ~ userData:", userData.value);

    taoUserStore.updateTaoData(userData.value?.data)

    return userData.value?.data[0] || {};
  }else{
    console.log("<tao-user-data-avalable>",taoUserStore.userTaoData);

    return taoUserStore.userTaoData[0]
  }
};
