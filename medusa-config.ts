import { loadEnv, defineConfig } from "@medusajs/framework/utils"

loadEnv(process.env.NODE_ENV || "development", process.cwd())

export default defineConfig({
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    databaseDriverOptions: {
      ...(process.env.DATABASE_URL?.includes("sslmode=disable")
        ? { ssl: false }
        : { ssl: { rejectUnauthorized: false } }),
    },
    redisUrl: process.env.REDIS_URL,
    http: {
      storeCors: process.env.STORE_CORS || "http://localhost:3000",
      adminCors: process.env.ADMIN_CORS || "http://localhost:9000",
      authCors: process.env.AUTH_CORS || "http://localhost:9000",
      jwtSecret: process.env.JWT_SECRET || "lmrk_jwt_supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "lmrk_cookie_supersecret",
    },
  },
  admin: {
    backendUrl: process.env.BACKEND_URL,
    disable: process.env.DISABLE_MEDUSA_ADMIN === "true",
  },
  modules: [],
})
