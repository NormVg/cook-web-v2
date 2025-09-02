import { useCookUserStore } from "~/strore/useCookUserStore";

export const useCookUser = async (dataUser) => {

  const runtimeConfig =   useRuntimeConfig()

  const cookUserStore = useCookUserStore()

  if (cookUserStore.userCookData.length === 0){


    const { data: userData } = await useFetch(`/api/v2/user/get-by-user`,{
      headers: {
        "X-COOK-APP": "web",
        "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
      },
      query:{
        username:dataUser.username
      }
    });

    console.log("🚀 ~ getTemplateData ~ userData by xyzzzz:", userData.value);

    cookUserStore.updateCookData(userData.value?.data)


    return userData.value?.data ;
  }else{
    console.log("<cook-user-data-avalable>",cookUserStore.userCookData);

    return cookUserStore.userCookData
  }

}
