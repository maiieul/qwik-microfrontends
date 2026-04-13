/**
 * This function is a hack to work around the fact that in dev mode the remote html is failing to prefix the base path.
 */
export const fixRemotePathsInDevMode = (
  rawHtml: string,
  base = '',
): { html: string; base: string } => {
  let html = rawHtml;
  if (import.meta.env.DEV) {
    html = html.replace(/q:base="\/(\w+)\/build\/"/gm, (match, child) => {
      base = '/' + child;
      return match;
    });
    html = html.replace(/from "\/src/gm, () => {
      return `from "/${base}/src`;
    });
    html = html.replace(/="(\/src\/([^"]+))"/gm, (_, path) => {
      return '="' + base + path + '"';
    });
    html = html.replace(/"\\u0002(\/src\/([^"]+))"/gm, (_, path) => {
      return '"\\u0002' + base + path + '"';
    });
  }
  html = fixErroredHostClash(html, base);
  html = fixImageWarningClash(html, base);
  return { html, base };
};

const fixErroredHostClash = (html: string, base: string) =>
  html
    .replace(/ErroredHost/gm, `ErroredHost${base.replace('/', '')}`)
    .replace(/errored-host/gm, `errored-host-${base.replace('/', '')}`);

const fixImageWarningClash = (html: string, base: string) =>
  html.replace(/image-warning/gm, `image-warning-${base.replace('/', '')}`);
