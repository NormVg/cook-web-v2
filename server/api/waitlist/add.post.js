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
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Cook — TheAlphaOnes</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #ffffff;
            background-color: #000000;
            padding: 20px;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #0a0a0a;
            border: 1px solid #1a1a1a;
            border-radius: 12px;
            overflow: hidden;
          }
          .header {
            background: linear-gradient(135deg, #ff006e, #00f5a0);
            padding: 40px 30px;
            text-align: center;
          }
          .header h1 {
            color: #000000;
            margin: 0 0 8px 0;
            font-size: 28px;
            font-weight: 600;
            letter-spacing: -0.5px;
          }
          .header .subtitle {
            color: #000000;
            font-size: 15px;
            opacity: 0.8;
            font-weight: 500;
          }
          .content {
            background: #0a0a0a;
            padding: 40px 30px;
            color: #e0e0e0;
          }
          .content p {
            margin-bottom: 20px;
            font-size: 15px;
            line-height: 1.7;
            color: #b0b0b0;
          }
          .content p:last-child {
            margin-bottom: 0;
          }
          .highlight-box {
            background: #151515;
            border-left: 3px solid #00f5a0;
            padding: 20px;
            margin: 24px 0;
            border-radius: 6px;
          }
          .highlight-box p {
            color: #e0e0e0;
            margin-bottom: 0;
          }
          .cta-container {
            text-align: center;
            margin: 32px 0;
          }
          .cta-button {
            display: inline-block;
            background: transparent;
            border: 1px solid #00f5a0;
            color: #00f5a0;
            text-decoration: none;
            padding: 14px 32px;
            border-radius: 8px;
            font-size: 15px;
            font-weight: 500;
            letter-spacing: 0.3px;
          }
          .signature {
            margin-top: 32px;
            padding-top: 24px;
            border-top: 1px solid #1a1a1a;
            text-align: center;
          }
          .signature p {
            color: #e0e0e0;
            font-size: 14px;
            margin-bottom: 4px;
          }
          .team-name {
            color: #00f5a0;
            font-weight: 600;
          }
          .footer {
            text-align: center;
            padding: 30px;
            background: #000000;
            border-top: 1px solid #1a1a1a;
          }
          .footer p {
            color: #666666;
            font-size: 12px;
            margin-bottom: 8px;
          }
          .footer a {
            color: #00f5a0;
            text-decoration: none;
            font-weight: 500;
          }
          .footer a:hover {
            text-decoration: underline;
          }
          .logo-text {
            font-size: 14px;
            color: #ffffff;
            font-weight: 600;
            letter-spacing: 1px;
            margin-bottom: 4px;
          }
          .emoji {
            font-size: 32px;
            display: block;
            margin-bottom: 4px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <span class="emoji">👋</span>
            <h1>Welcome to Cook!</h1>
            <p class="subtitle">By TheAlphaOnes</p>
          </div>
          <div class="content">
            <p>Hi there,</p>
            <p>You're officially on the waitlist for <strong>Cook</strong> — a powerful tool to organize and manage your code templates, streamlining your development workflow.</p>

            <div class="highlight-box">
              <p><strong>What's Cook?</strong> Built by TheAlphaOnes, Cook is designed to help developers save time by creating, storing, and sharing reusable code templates across projects.</p>
            </div>

            <p>We're working hard to bring you early access and exciting features. Stay tuned for updates, sneak peeks, and exclusive beta invitations.</p>

            <div class="cta-container">
              <a href="https://cook.taohq.org" class="cta-button">Visit Cook</a>
            </div>

            <p>In the meantime, feel free to explore more about TheAlphaOnes and the tools we're building to make development better.</p>

            <div class="signature">
              <p>Thanks for being part of the journey!</p>
              <p><span class="team-name">TheAlphaOnes Team</span></p>
            </div>
          </div>
          <div class="footer">
            <p class="logo-text">COOK by TheAlphaOnes</p>
            <p>This is an automated message from Cook.</p>
            <p>Cook: <a href="https://cook.taohq.org">cook.taohq.org</a> • TheAlphaOnes: <a href="https://taohq.org">taohq.org</a></p>
          </div>
        </div>
      </body>
      </html>
    `;

    await sendMail({
      to: body.email,
      subject: "Welcome to Cook Waitlist 🔒 — TheAlphaOnes",
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
