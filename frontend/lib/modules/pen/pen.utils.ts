function formatHtmlContent(
  html: string,
  head: string,
  css: string,
  js: string,
) {
  return `
      <html>
        <head>
          ${head}
          <style>${css}</style>
        </head>
        <body>
          ${html}
          <script>${js}</script>
        </body>
      </html>
    `;
}

function stringToBase64(str: string) {
  return Buffer.from(str).toString("base64");
}
function base64ToString(base64: string) {
  return Buffer.from(base64, "base64").toString("utf-8");
}

export { base64ToString, formatHtmlContent, stringToBase64 };
