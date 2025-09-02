export const useCookUserStore = defineStore('cook-user-store', () => {
  const userCookData = ref([])

  const updateCookData = (value) => {
    userCookData.value = value
  }

  return { userCookData , updateCookData }
})
