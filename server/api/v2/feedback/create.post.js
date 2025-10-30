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

    // Send confirmation email to user
    try {
      const nodemailer = useNodeMailer();

      await nodemailer.sendMail({
        to: body.email,
        subject: `Cook - ${body.type.charAt(0).toUpperCase() + body.type.slice(1)} Received`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
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
                margin: 0;
                font-size: 26px;
                font-weight: 600;
                letter-spacing: -0.5px;
              }
              .content {
                background: #0a0a0a;
                padding: 40px 30px;
                color: #e0e0e0;
              }
              .content p {
                margin-bottom: 16px;
                font-size: 15px;
                line-height: 1.7;
                color: #b0b0b0;
              }
              .content p:last-child {
                margin-bottom: 0;
              }
              .feedback-box {
                background: #151515;
                padding: 24px;
                border-left: 3px solid #00f5a0;
                margin: 24px 0;
                border-radius: 6px;
              }
              .feedback-box p {
                margin-bottom: 12px;
              }
              .feedback-box p:last-child {
                margin-bottom: 0;
              }
              .type-badge {
                display: inline-block;
                background: #ff006e;
                color: #ffffff;
                padding: 6px 14px;
                border-radius: 20px;
                font-size: 11px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                font-weight: 600;
              }
              .message-label {
                color: #ffffff;
                font-weight: 500;
                margin-bottom: 8px;
                display: block;
                font-size: 14px;
              }
              .message-content {
                color: #e0e0e0;
                padding: 16px;
                background: #0a0a0a;
                border-radius: 4px;
                border: 1px solid #1a1a1a;
                font-size: 14px;
                line-height: 1.6;
                white-space: pre-wrap;
                word-wrap: break-word;
              }
              .signature {
                margin-top: 32px;
                padding-top: 24px;
                border-top: 1px solid #1a1a1a;
              }
              .signature p {
                margin-bottom: 8px;
                color: #e0e0e0;
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
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>Thank You for Your ${body.type}!</h1>
              </div>
              <div class="content">
                <p>Hi there,</p>
                <p>We've received your ${body.type} and wanted to let you know that we appreciate you taking the time to share it with us.</p>

                <div class="feedback-box">
                  <p><span class="type-badge">${body.type}</span></p>
                  <span class="message-label">Your message:</span>
                  <div class="message-content">${body.msg}</div>
                </div>

                <p>Our team will review your ${body.type} and get back to you if needed. We're constantly working to improve Cook based on feedback from users like you.</p>

                <div class="signature">
                  <p>Best regards,</p>
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
        `,
      });

      console.log(`Confirmation email sent to ${body.email}`);
    } catch (emailError) {
      console.error('Failed to send confirmation email:', emailError);
      // Don't fail the request if email fails
    }

    return apiResponse(200,[newInput],"success")
  } catch (error) {
    console.error(error);
    return apiResponse(500,[],'Internal Server Error')
  }
})
