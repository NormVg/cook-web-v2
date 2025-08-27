import { betterAuth } from "better-auth";
import ps from "pg";
const allowedOrigins:any = JSON.parse(String(process.env.TAO_AUTH_APPS_URLS))

import { username } from "better-auth/plugins"

export const auth = betterAuth({
  advanced: {
    crossSubDomainCookies: {
      enabled: true,
      domain: process.env.AUTH_DOMAIN,
    },
  },
  trustedOrigins: allowedOrigins,

  emailAndPassword: {
    enabled: true,
  },

  plugins:[username()],

  database: new ps.Pool({
    connectionString: process.env.AUTH_DATABASE_URL,
  }),
});
