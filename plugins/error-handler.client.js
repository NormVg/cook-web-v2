export default defineNuxtPlugin(() => {
  const router = useRouter()

  if (process.env.NODE_ENV === 'development') {
    // Mode 1

    router.onError((error) => {
      console.log(error.message);
      if (error.message.includes('error loading dynamically imported module')) {
        window.location.reload()
      }
    })

  }
})
