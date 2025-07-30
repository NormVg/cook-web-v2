import { db, userData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);

    if (!data?.username || !data?.email || !data?.name) {
      return apiResponse(400, [], "Missing required fields");
    }

    const newKey = `cook_connection_key_${crypto.randomUUID()}_${crypto.randomUUID()}_${new Date().toISOString()}`;
    const cook_id = `cook_user_${crypto.randomUUID()}_${crypto.randomUUID()}_${new Date().toISOString()}`;

    await db.insert(userData).values({
      id: cook_id,
      username: data.username,
      email: data.email,
      name: data.name,
      connectionKey: newKey,
    });

    return apiResponse(200, [{
      id: cook_id,
      connectionKey: newKey
    }], "User created successfully");
  } catch (error) {
    return apiResponse(500, [], "Internal server error");
  }
});
