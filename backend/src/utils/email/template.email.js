export const emailTemplate = ({ code, title }) => {
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
};