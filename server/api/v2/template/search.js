import { apiResponse } from "~/utils/apiResponse";

import Fuse from 'fuse.js';
import { db, templateData } from "~/db";
import { eq } from "drizzle-orm";



export default defineEventHandler(async (event) => {
  try {
    const { q } = getQuery(event);

    const templates = await db
      .select()
      .from(templateData)
      .where(eq(templateData.public, true));

    if (templates.length === 0) {
      return apiResponse([], "No public templates found", 404);
    }

    if (q) {



      const fuse = new Fuse(templates, {
        keys: ['id', 'stack', "category", "name", "author"],
        includeScore: true,
        threshold: 0.3
      });

      const results = fuse.search(q);


      

      return apiResponse(200, results, 'Success');
    } else {
      return apiResponse(200, templates, 'Success');
    }

  } catch (error) {
    console.log(error);
    return apiResponse(500, [], 'Internal Server Error');

  }
})
