export const useFeedback = async (body) => {

  const runtimeConfig = useRuntimeConfig();


  await $fetch('/api/v2/feedback/create',{
    method:'POST',
    body:body,
    headers: {
            "X-COOK-APP": "web",
            "X-COOK-KEY": runtimeConfig.public.taoTokenWeb,
    },
  })


}
