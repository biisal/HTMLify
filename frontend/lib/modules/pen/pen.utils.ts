export function formatHtmlContent(
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
