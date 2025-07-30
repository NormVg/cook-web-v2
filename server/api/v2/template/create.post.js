import { writeTemplate } from "~/db/callDB";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const data = await readBody(event);

    if (
      !data.id ||
      !data.name ||
      !data.category ||
      !data.date ||
      !data.author ||
      !data.stack ||
      !data.github ||
      !data.version ||
      !data.fileID
    ) {
      return apiResponse(400, {}, "invalid request");
    }

    const {
      id,
      name,
      category,
      date,
      author,
      stack,
      github,
      version,
      fileID,
      info,
    } = data;

    const fallbackInfo = `
    # Template: ${name}
    - **Category:** ${category}
    - **Date:** ${date}
    - **Author:** ${author}
    - **Stack:** ${stack}
    - **GitHub:** ${github}
    - **Version:** ${version}
    `;

    const templateInfo = info || fallbackInfo;

    const newValue = {
      id,
      name,
      category,
      date,
      author,
      stack,
      github,
      version,
      fileID,
      info: templateInfo.trim(),
    };

    await writeTemplate(newValue);

    return apiResponse(200, [data], "Template saved successfully");
  } catch (error) {
    console.error("Insert template error:", error);
    return apiResponse(500, [], "Internal Server Error");
  }
});
