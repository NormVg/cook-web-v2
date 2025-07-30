import { betterAuth } from "better-auth";
import ps from "pg";
const allowedOrigins:any = JSON.parse(String(process.env.TAO_AUTH_APPS_URLS))


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

  database: new ps.Pool({
    connectionString: process.env.DATABASE_URL,
  }),
});
