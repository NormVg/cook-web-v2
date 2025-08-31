import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler( async (event) => {
  try {
    return apiResponse(200,[], 'Success');
  } catch (error) {
    console.log(error);
    return apiResponse(500,[], 'Internal Server Error');

  }
})
