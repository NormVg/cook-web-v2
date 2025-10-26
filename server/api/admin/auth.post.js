import { apiResponse } from "~/utils/apiResponse";
import crypto from "crypto";

export default defineEventHandler(async (event) => {
  try {
    const runtimeConfig = useRuntimeConfig();

    // Get credentials from environment variables
    const ADMIN_USERNAME = runtimeConfig.adminUsername;
    const ADMIN_PASSWORD = runtimeConfig.adminPassword;

    const body = await readBody(event);
    const { username, password } = body;

    if (!username || !password) {
      return apiResponse(400, [], "Username and password required");
    }

    // Check credentials
    if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
      return apiResponse(401, [], "Invalid credentials");
    }

    // Generate a simple token
    const token = crypto.randomBytes(32).toString('hex');

    return apiResponse(200, { token, username }, "Login successful");
  } catch (error) {
    console.error("Admin auth error:", error);
    return apiResponse(500, [], "Internal server error");
  }
});
