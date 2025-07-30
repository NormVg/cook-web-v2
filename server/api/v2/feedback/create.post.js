import { writeFeedback } from "~/db/callDB";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {

    const body = await readBody(event)

    if (!body ||  !body.email || !body.type || !body.msg){
      return apiResponse(400,[],"invalid input")
    }

    const newInput = {
      id:`feedback_${crypto.randomUUID()}_${crypto.randomUUID()}`,
      email:body.email,
      type:body.type,
      msg:body.msg
    }

    await writeFeedback(newInput)

    return apiResponse(200,[newInput],"success")
  } catch (error) {
    console.error(error);
    return apiResponse(500,[],'Internal Server Error')
  }
})
