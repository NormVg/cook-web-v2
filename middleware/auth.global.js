import { authClient } from "~/utils/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("-----------------------------------------------------------------------------------------------------");

  console.log("🔄 [Middleware] Navigating:");
  console.log("   ➤ From:", from.path);
  console.log("   ➤ To:", to.path);

  const { data: session } = await authClient.useSession(useFetch);
  console.log("🚀 ~ session:", session.value)

  const config = useRuntimeConfig()


  if (!session.value) {


    if (String(to.path).startsWith("/app")  ) {

      return navigateTo(config.public.taoAuthURL || "/",{external: true} );
    }


  }

  if (session.value) {



    if (to.path === "/") {
      if (to.query.r === 'no') {
        return navigateTo("/app/template")
      }
      return navigateTo("/app");
    }
  }

});
