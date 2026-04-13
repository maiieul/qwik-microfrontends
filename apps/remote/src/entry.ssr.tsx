/**
 * WHAT IS THIS FILE?
 *
 * SSR entry point, in all cases the application is render outside the browser, this
 * entry point will be the common one.
 *
 * - Server (express, cloudflare...)
 * - npm run start
 * - npm run preview
 * - npm run build
 *
 */
import { renderToStream, RenderToStreamOptions } from '@builder.io/qwik/server';
import { manifest } from '@qwik-client-manifest';
import MfeRoot from './mfe-root';
import Root from './root';

export default function (opts: RenderToStreamOptions) {
  const requestUrl = opts.serverData?.url as string | undefined;
  const isMfe =
    !!requestUrl &&
    new URL(requestUrl).searchParams.get('loader') === 'false';

  if (isMfe) {
    return renderToStream(<MfeRoot />, {
      manifest,
      ...opts,
      containerTagName: 'div',
      containerAttributes: {
        ...opts.containerAttributes,
      },
      qwikLoader: 'never',
    });
  }

  return renderToStream(<Root />, {
    manifest,
    ...opts,
    // Use container attributes to set attributes on the html tag.
    containerAttributes: {
      lang: 'en-us',
      ...opts.containerAttributes,
    },
  });
}
