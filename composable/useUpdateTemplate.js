export const useUpdateTemplate = async (templateId, updateData) => {

  const config = useRuntimeConfig()

  const data = await $fetch('/api/v2/template/update',{
        headers:{
      "X-COOK-APP": "web",
      "X-COOK-KEY": config.public.taoTokenWeb,
    },
    method:'POST',
    body:{
      uid: templateId,
      updateData:updateData
    }
  })
}
