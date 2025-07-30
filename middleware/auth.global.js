import { authClient } from "~/utils/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("-----------------------------------------------------------------------------------------------------");

  console.log("🔄 [Middleware] Navigating:");
  console.log("   ➤ From:", from.path);
  console.log("   ➤ To:", to.path);

  const { data: session } = await authClient.useSession(useFetch);
  console.log("🚀 ~ session:", session.value)



  if (!session.value) {


    if (String(to.path).startsWith("/app")  ) {
      return navigateTo("/");
    }


  }

  if (session.value) {



    if (to.path === "/") {
      return navigateTo("/profile");
    }
  }

});
