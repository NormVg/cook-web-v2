import { uploadFileToAppwrite } from "~/utils/appwrite";
import { createTempFile } from "~/utils/temple";
import { db, fileBucket } from "~/db";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  const query = getQuery(event);
  const fileType = query?.type || "template";

  const file = formData?.[0];

  if (!file || !file.data || !file.filename) {
    return apiResponse(false, [], "No valid file uploaded");
  }

  const runtimeConfig = useRuntimeConfig();

  try {
    const tempFilePath = await createTempFile(file.data, file.filename);
    const uploadResponse = await uploadFileToAppwrite(
      tempFilePath,
      file.filename,
      runtimeConfig.appWriteProject,
      runtimeConfig.appWriteBucket,
      runtimeConfig.appWriteKey
    );

    const fileUploadedID = uploadResponse.$id;
    const dbFileID = `cook_file_bucket_${crypto.randomUUID()}_${crypto.randomUUID()}`;

    await db.insert(fileBucket).values({
      id: dbFileID,
      pointer: fileUploadedID,
      datetime: new Date().toISOString(),
      type: fileType
    });

    return apiResponse(true, [{"file":dbFileID}], "File uploaded and saved to DB");
  } catch (error) {
    console.error("Upload error:", error);
    throw createError({ statusCode: 500, statusMessage: "Upload failed" });
  }
});
