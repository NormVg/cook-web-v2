import { and, eq } from "drizzle-orm";
import { db } from ".";
import { feedback, fileBucket, templateData } from "./schema";




export const getAllBucket = async () => {
  return await db.select().from(fileBucket)
}




export const writeFeedback = async (data: any) => {
  await db.insert(feedback).values(data);
};

export const listFeedback = async () => {
  return await db.select().from(feedback)
}




export const writeTemplate = async (data: any) => {
  await db.insert(templateData).values(data);
};

export const getTemplateByUsername = async (username: any, template_id: any) => {
  const termplateInfo = await db
    .select()
    .from(templateData)
    .where(
      and(eq(templateData.id, template_id), eq(templateData.author, username))
    );

  return termplateInfo;
};
