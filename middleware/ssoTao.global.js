
export default defineNuxtRouteMiddleware(async (to, from) => {
  // console.log("-----------------------------------------------------------------------------------------------------");

  // console.log("🔄 [Middleware] Navigating:");
  // console.log("   ➤ From:", from.path);
  // console.log("   ➤ To:", to.path);

  // const { data } = await useFetch(`/api/sso/session?next=${to.path}`);

  // const isSession = data.value?.data?.[0]?.isSession;



  // if (process.client){

  //   const isSessionCokiee = useCookie('isSession')
  //   const usernameCokiee = useCookie('usernameCokiee')


  //   isSession ? isSessionCokiee.value = true : isSessionCokiee.value = false

  //   // const isSessionClientLS = Localstore.get('isSession')
  //   // console.log("🚀 ~ isSessionClientLS:", isSessionClientLS,isSession)
  // }




  // console.log("🧠 [Middleware] Session Check:");
  // console.log("   ➤ Session Active:", isSession);

  // // Authenticated user trying to access login page — redirect to home
  // if (isSession) {
  //   if (to.path === "/login" || to.path === "/login/") {
  //     console.log("🚫 [Middleware] Authenticated user can't access login page — redirecting to '/'");
  //     return await navigateTo("/");
  //   }
  // }

  // // Unauthenticated user trying to access protected page — redirect to login
  // if (!isSession) {
  //   if (to.path === "/profile" || to.path === "/profile/") {
  //     console.log("🔒 [Middleware] Unauthenticated user trying to access protected route — redirecting to '/login'");
  //     return await navigateTo("/login");
  //   }
  // }

  // console.log("✅ [Middleware] Access granted for route:", to.path);

});
