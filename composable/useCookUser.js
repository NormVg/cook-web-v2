import { useCookUserStore } from "~/strore/useCookUserStore";

export const useCookUser = async (dataUser) => {

  const runtimeConfig = useRuntimeConfig()

  const cookUserStore = useCookUserStore()

  if (cookUserStore.userCookData.length === 0) {

    // Try to fetch existing user
    const { data: userData } = await useFetch(`/api/v2/user/get-by-user`, {
      headers: {
        "X-COOK-APP": "web",
        "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
      },
      query: {
        username: dataUser.username
      }
    });

    console.log("🚀 ~ getTemplateData ~ userData by xyzzzz:", userData.value);

    // If user not found, create them
    if (userData.value?.status === 404 || !userData.value?.data || userData.value?.data.length === 0) {
      console.log("User not found, creating new Cook user...");

      try {
        const { data: newUserData } = await useFetch(`/api/v2/user/create`, {
          method: 'POST',
          headers: {
            "X-COOK-APP": "web",
            "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
          },
          body: {
            username: dataUser.username,
            email: dataUser.email,
            name: dataUser.name
          }
        });

        console.log("🚀 ~ New user created:", newUserData.value);

        // Fetch the newly created user to get full data
        const { data: fetchedUser } = await useFetch(`/api/v2/user/get-by-user`, {
          headers: {
            "X-COOK-APP": "web",
            "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
          },
          query: {
            username: dataUser.username
          }
        });

        cookUserStore.updateCookData(fetchedUser.value?.data)
        return fetchedUser.value?.data;

      } catch (createError) {
        console.error("Error creating user:", createError);
        return [];
      }
    }

    cookUserStore.updateCookData(userData.value?.data)
    return userData.value?.data;

  } else {
    console.log("<cook-user-data-avalable>", cookUserStore.userCookData);
    return cookUserStore.userCookData
  }

}
