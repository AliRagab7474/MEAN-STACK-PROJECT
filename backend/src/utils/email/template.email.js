export const emailTemplate = ({ code, title }) => {
<<<<<<< HEAD
  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
  </head>
  <body style="margin:0; padding:0; background-color:#f4f4f7; font-family: Arial, Helvetica, sans-serif;">
    <table role="presentation" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#f4f4f7; padding:40px 0;">
      <tr>
        <td align="center">
          <table role="presentation" width="480" border="0" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:8px; overflow:hidden;">
            <tr>
              <td style="background-color:#4338CA; padding:24px; text-align:center;">
                <h1 style="margin:0; color:#ffffff; font-size:20px;">${title}</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 24px; text-align:center;">
                <p style="margin:0 0 16px 0; color:#374151; font-size:15px;">
                         </p>
                <p style="margin:0; display:inline-block; padding:16px 32px; background-color:#EEF2FF; color:#4338CA; font-size:32px; font-weight:bold; letter-spacing:6px; border-radius:6px;">
                  ${code}
                </p>
                <p style="margin:24px 0 0 0; color:#9CA3AF; font-size:12px;">
              
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
=======
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${title}</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f5f9ff;
          font-family: Arial, Helvetica, sans-serif;
          color: #0f1f3d;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="padding: 40px 16px;"
        >
          <tr>
            <td align="center">

              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 520px;
                  background: #ffffff;
                  border: 1px solid #dbeafe;
                  border-radius: 16px;
                  box-shadow: 0 6px 20px rgba(29, 79, 163, 0.08);
                  overflow: hidden;
                "
              >

                <!-- Header -->
                <tr>
                  <td
                    style="
                      padding: 26px 30px 18px;
                      text-align: center;
                      border-bottom: 1px solid #eff6ff;
                    "
                  >
                    <div
                      style="
                        font-size: 26px;
                        font-weight: 800;
                        color: #1d4fa3;
                        letter-spacing: -0.5px;
                      "
                    >
                      Sarhne
                    </div>

                    <div
                      style="
                        margin-top: 6px;
                        font-size: 13px;
                        color: #64748b;
                      "
                    >
                      Anonymous messages, made simple.
                    </div>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 32px 30px;">

                    <h1
                      style="
                        margin: 0 0 10px;
                        font-size: 24px;
                        font-weight: 800;
                        color: #0f1f3d;
                        text-align: center;
                      "
                    >
                      ${title}
                    </h1>

                    <p
                      style="
                        margin: 0 auto 24px;
                        max-width: 400px;
                        font-size: 14px;
                        line-height: 1.6;
                        color: #64748b;
                        text-align: center;
                      "
                    >
                      Use the verification code below to continue.
                    </p>

                    <!-- OTP -->
                    <div
                      style="
                        margin: 0 auto 24px;
                        width: fit-content;
                        padding: 16px 28px;
                        background: #eff6ff;
                        border: 1px solid #dbeafe;
                        border-radius: 12px;
                      "
                    >
                      <div
                        style="
                          font-size: 34px;
                          font-weight: 800;
                          letter-spacing: 8px;
                          color: #1d4fa3;
                          text-align: center;
                        "
                      >
                        ${code}
                      </div>
                    </div>

                    <p
                      style="
                        margin: 0;
                        font-size: 12.5px;
                        line-height: 1.6;
                        color: #94a3b8;
                        text-align: center;
                      "
                    >
                      If you didn't request this code, you can safely ignore
                      this email.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    style="
                      padding: 16px 24px;
                      background: #f8fbff;
                      border-top: 1px solid #eff6ff;
                      text-align: center;
                    "
                  >
                    <p
                      style="
                        margin: 0;
                        font-size: 11px;
                        color: #94a3b8;
                      "
                    >
                      © Sarhne
                    </p>
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
>>>>>>> 85def577b91571317590a1017f69c272374409a5
};