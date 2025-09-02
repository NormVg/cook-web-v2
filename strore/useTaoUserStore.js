export const useTaoUserStore = defineStore('tao-user-store', () => {
  const userTaoData = ref([])

  const updateTaoData = (value) => {
    userTaoData.value = value
  }

  return { userTaoData , updateTaoData }
})
