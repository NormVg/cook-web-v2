import { listFeedback } from "~/db/callDB";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const dataBody = await listFeedback()
    return apiResponse(200,dataBody,'success')
  } catch (error) {
    console.error(error);
    return apiResponse(500,[],"internal server error")
  }
})
