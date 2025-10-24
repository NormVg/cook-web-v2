import { useCookUserStore } from "~/strore/useCookUserStore";
import { useTaoUserStore } from "~/strore/useTaoUserStore";
import { authClient } from "~/utils/auth-client";

export default defineNuxtRouteMiddleware(async (to, from) => {
  console.log("-----------------------------------------------------------------------------------------------------");

  console.log("🔄 [Middleware] Navigating:");
  console.log("   ➤ From:", from.path);
  console.log("   ➤ To:", to.path);

  const { data: session } = await authClient.useSession(useFetch);
  console.log("🚀 ~ session:", session.value)

  const config = useRuntimeConfig()

    const taoUserStore = useTaoUserStore()
    const cookUserStore = useCookUserStore()


  if (!session.value) {

    taoUserStore.updateTaoData([])
    cookUserStore.updateCookData([])

    if (String(to.path).startsWith("/app")  ) {

      return navigateTo(config.public.taoAuthURL || "/?next=" + to.path,{external: true} );
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
