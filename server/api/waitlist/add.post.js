import { db, waitListUser } from "~/db";
import { eq } from "drizzle-orm";
import { apiResponse } from "~/utils/apiResponse";

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    const { sendMail } = useNodeMailer();

    if (!body.email || !body.type) {
      return apiResponse({
        statusCode: 400,
        data: [],
        msg: "'email' and 'type' are required fields.",
      });
    }


    const validTypes = ["intermediate", "advance", "beginner"];
    if (!validTypes.includes(body.type)) {
      return apiResponse({
        statusCode: 400,
        data: [],
        msg: "Invalid 'type'. Allowed values: 'intermediate', 'advance', 'beginner'.",
      });
    }

    const user = await db.query.waitListUser.findFirst({
      where: eq(waitListUser.email, body.email),
    });

    if (user) {
      return apiResponse({
        statusCode: 409,
        data: [],
        msg: "User with this email already exists.",
      });
    }

    const newEntry = {
      id: `cook_waitlist_${crypto.randomUUID()}${new Date().toISOString()}`,
      email: body.email,
      type: body.type,
      datetime: new Date().toISOString(),
    };

    await db.insert(waitListUser).values(newEntry);

    const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head><meta charset="UTF-8" /><title>Welcome to Cook — TheAlphaOnes</title></head>
      <body style="font-family: 'Segoe UI'; background: #f9f9f9; color: #1a1a1a;">
        <table style="max-width:600px;margin:auto;background:#fff;border-radius:12px;box-shadow:0 8px 24px rgba(0,0,0,0.05);">
          <tr><td style="padding:32px;text-align:center;">
            <h1 style="margin:0;font-size:24px;color:#18171C;">👋 Welcome to Cook</h1>
            <p style="margin-top:8px;font-size:16px;color:#555;">By <strong>TheAlphaOnes</strong></p>
          </td></tr>
          <tr><td style="padding:0 32px 24px 32px;">
            <p style="font-size:16px;margin:0 0 16px;">You're officially on the waitlist for <strong>Cook</strong> — our upcoming tool designed to simplify the way you plan, explore, and experience food and lifestyle.</p>
            <p style="font-size:16px;margin:0 0 16px;">Built under <strong>TheAlphaOnes</strong>, Cook is part of our mission to create meaningful tools that people actually use — blending design, AI, and utility in one smooth experience.</p>
            <p style="font-size:16px;margin:0 0 24px;">We’ll keep you updated with early access and sneak peeks. In the meantime, feel free to follow our journey or say hello.</p>
            <div style="text-align:center;margin:32px 0;">
              <a href="https://taohq.org" style="background:#18171C;color:#fff;text-decoration:none;padding:12px 24px;border-radius:6px;font-size:16px;">Visit TheAlphaOnes</a>
            </div>
            <p style="font-size:14px;color:#999;text-align:center;">Thanks for being part of the journey.<br/>— Team TheAlphaOnes</p>
          </td></tr>
        </table>
      </body>
      </html>
    `;

    await sendMail({
      to: body.email,
      subject: "Cook Waitlist Confirmed — TheAlphaOnes Has You Locked In 🔒",
      html,
    });

    return apiResponse({
      statusCode: 200,
      data: [newEntry],
      msg: "Successfully added to waitlist and confirmation email sent.",
    });
  } catch (error) {
    console.error(error);
    return apiResponse({
      statusCode: 500,
      data: [],
      msg: "Something went wrong while adding to the waitlist.",
    });
  }
});
