import { and, eq } from "drizzle-orm";
import { db, userData } from "~/db/index";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const body = getQuery(event);

    if (!body || !body.uid || !body.username || !body.email) {


      return apiResponse(400, [], "args not found");
    }

    console.log(body);


    const newKey = `cook_connection_key_${crypto.randomUUID()}_${crypto.randomUUID()}_${new Date().toISOString()}`;

    const a = await db
      .update(userData)
      .set({
        connectionKey: newKey,
      })
      .where(
        and(
          eq(userData.id, body.uid),    
          eq(userData.email, body.email),
          eq(userData.username, body.username)
        )
      );

      console.log(a);


    return apiResponse(200, [{ connKey: newKey }], "renewed the connection keys");
  } catch (error) {
    return apiResponse(500, [], "internal server error");
  }
});
